import { createHash } from 'node:crypto';
import type { ShumaiResponse, AlmanacData, GodnessData, TimeData } from '../../shared/shumai-types';
import { getCache, setCache } from './upyun';

// 接口定义参考 docs/shumai-api.md
const API_BASE = 'https://api.shumaidata.com/v10/almanac';

/**
 * 计算 Shumai API 签名
 * 算法：MD5(appid + "&" + timestamp + "&" + app_security)
 */
function getSignature(appid: string, timestamp: number, security: string): string {
  const str = `${appid}&${timestamp}&${security}`;
  const hash = createHash('md5').update(str).digest('hex');
  return hash;
}

/**
 * 格式化日期为 yyyyMMdd
 */
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

/**
 * 通用 Shumai API 请求函数
 * @param endpoint API 端点，例如 '/calendar'
 * @param ymd 可选，格式 yyyyMMdd
 */
async function fetchShumaiApi<T>(endpoint: string, ymd?: string): Promise<ShumaiResponse<T>> {
  // 如果未提供 ymd，默认为当天
  const queryYmd = ymd || formatDate(new Date());

  // 构建缓存 Key: shumai/calendar/20231027.json
  const cacheKey = `shumai/${endpoint.replace(/^\//, '')}/${queryYmd}.json`;

  // 1. 尝试从又拍云缓存读取
  const cachedData = await getCache<ShumaiResponse<T>>(cacheKey);
  if (cachedData) {
    console.log(`[ShumaiAPI] Cache hit for ${cacheKey}`);
    return cachedData;
  }

  const appid = process.env.SHUMAI_APPID;
  const security = process.env.SHUMAI_APP_SECURITY;

  if (!appid || !security) {
    throw new Error('Missing SHUMAI_APPID or SHUMAI_APP_SECURITY environment variables');
  }

  const timestamp = Date.now();
  const sign = getSignature(appid, timestamp, security);

  const params = new URLSearchParams({
    appid,
    timestamp: timestamp.toString(),
    sign,
    ymd: queryYmd,
  });

  const url = `${API_BASE}${endpoint}`;

  // 使用 POST 方法，content-type: application/x-www-form-urlencoded
  console.log(`[ShumaiAPI] Fetching ${endpoint}: ${url} (appid=${appid}, timestamp=${timestamp}, ymd=${queryYmd})`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json() as ShumaiResponse<T>;

    // 2. 写入缓存到又拍云
    await setCache(cacheKey, data);

    return data;
  } catch (error) {
    console.error(`[ShumaiAPI] Error fetching ${endpoint}:`, error);
    throw error;
  }
}

/**
 * 获取黄历数据
 * @param ymd 可选，格式 yyyyMMdd。如果不传，默认为当天。
 */
export async function fetchAlmanac(ymd?: string): Promise<ShumaiResponse<AlmanacData>> {
  return fetchShumaiApi<AlmanacData>('/calendar', ymd);
}

/**
 * 获取吉神凶煞数据
 * @param ymd 可选，格式 yyyyMMdd。如果不传，默认为当天。
 */
export async function fetchGodness(ymd?: string): Promise<ShumaiResponse<GodnessData>> {
  return fetchShumaiApi<GodnessData>('/godness', ymd);
}

/**
 * 获取吉时查询数据
 * @param ymd 可选，格式 yyyyMMdd。如果不传，默认为当天。
 */
export async function fetchTime(ymd?: string): Promise<ShumaiResponse<TimeData>> {
  return fetchShumaiApi<TimeData>('/time', ymd);
}
