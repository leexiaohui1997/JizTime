import upyun from 'upyun';

let clientInstance: any = null;

function getClient() {
  if (clientInstance) return clientInstance;

  const serviceName = process.env.UPYUN_SERVICE_NAME;
  const operatorName = process.env.UPYUN_OPERATOR_NAME;
  const operatorPassword = process.env.UPYUN_OPERATOR_PASSWORD;

  if (!serviceName || !operatorName || !operatorPassword) {
    console.warn('[UpYun] Missing environment variables (UPYUN_SERVICE_NAME, UPYUN_OPERATOR_NAME, UPYUN_OPERATOR_PASSWORD), storage disabled.');
    return null;
  }

  const service = new upyun.Service(serviceName, operatorName, operatorPassword);
  clientInstance = new upyun.Client(service);
  return clientInstance;
}

/**
 * 从又拍云读取缓存
 * @param key 缓存键 (文件路径)
 */
export async function getCache<T>(key: string): Promise<T | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const content = await client.getFile(key);
    if (!content) return null;

    // content 通常是 string 或 Buffer，尝试解析 JSON
    // 如果 SDK 返回对象（已解析的 JSON），直接返回
    if (typeof content === 'object' && !Buffer.isBuffer(content)) {
      return content as T;
    }

    let str: string;
    if (Buffer.isBuffer(content)) {
      str = content.toString('utf8');
    } else {
      str = String(content);
    }

    return JSON.parse(str) as T;
  } catch (error: any) {
    // 404 表示未命中缓存
    if (error?.code === 404 || error?.response?.status === 404 || error?.message?.includes('404')) {
      return null;
    }
    console.error(`[UpYun] Error reading cache for ${key}:`, error);
    return null;
  }
}

/**
 * 写入缓存到又拍云
 * @param key 缓存键 (文件路径)
 * @param data 要缓存的数据 (将被 JSON.stringify)
 */
export async function setCache(key: string, data: any): Promise<void> {
  const client = getClient();
  if (!client) return;

  try {
    const jsonStr = JSON.stringify(data);
    await client.putFile(key, jsonStr);
    console.log(`[UpYun] Cache saved for ${key}`);
  } catch (error) {
    console.error(`[UpYun] Error writing cache for ${key}:`, error);
  }
}
