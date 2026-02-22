import { View } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../config/api'
import type { ShumaiResponse, AlmanacData, GodnessData, TimeData } from '@shared/shumai-types'
import './index.scss'

/**
 * 获取当前日期 yyyyMMdd
 */
function getTodayYmd(): string {
  const today = new Date()
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

export default function Home() {
  const router = useRouter()

  // 核心状态
  const [ymd, setYmd] = useState<string>('')

  // 数据状态
  const [almanacData, setAlmanacData] = useState<AlmanacData | null>(null)
  const [godnessData, setGodnessData] = useState<GodnessData | null>(null)
  const [timeData, setTimeData] = useState<TimeData | null>(null)

  // 加载状态
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // 初始化 ymd
  useLoad(() => {
    // 优先读取路由参数，否则使用今日
    const queryYmd = router.params.ymd
    const initialYmd = queryYmd || getTodayYmd()
    console.log('[Home] Initial YMD:', initialYmd)
    setYmd(initialYmd)
  })

  // 监听 ymd 变化并获取数据
  useEffect(() => {
    // 确保 ymd 有值才发起请求
    if (!ymd) return

    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        console.log('[Home] Fetching data for ymd:', ymd)

        // 并发请求三个接口
        const results = await Promise.all([
          fetchApi<AlmanacData>('almanac', ymd),
          fetchApi<GodnessData>('godness', ymd),
          fetchApi<TimeData>('time', ymd)
        ])

        const [almanacRes, godnessRes, timeRes] = results

        // 批量更新状态
        if (almanacRes?.success) setAlmanacData(almanacRes.data)
        if (godnessRes?.success) setGodnessData(godnessRes.data)
        if (timeRes?.success) setTimeData(timeRes.data)

      } catch (err: any) {
        console.error('[Home] Fetch Error:', err)
        setError(err.message || '数据加载失败')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [ymd])

  // 通用 API 请求封装
  async function fetchApi<T>(endpoint: string, queryYmd: string): Promise<ShumaiResponse<T>> {
    const url = `${API_BASE_URL}/.netlify/functions/${endpoint}?ymd=${queryYmd}`
    console.log(`[Home] Request: ${url}`)
    try {
      const res = await Taro.request({
        url,
        method: 'GET',
        header: { 'content-type': 'application/json' }
      })

      if (res.statusCode !== 200) {
        throw new Error(`${endpoint} request failed: ${res.statusCode}`)
      }
      return res.data as ShumaiResponse<T>
    } catch (e) {
      console.error(`[Home] ${endpoint} fetch failed`, e)
      throw e
    }
  }

  // --- UI 渲染逻辑 (此处仅为占位，请在此处开始编写您的 UI) ---
  return (
    <View className='home'>
      <View>当前日期: {ymd}</View>

      {loading && <View>加载数据中...</View>}
      {error && <View style={{ color: 'red' }}>错误: {error}</View>}

      {!loading && !error && (
        <View>
          <View>数据已就绪，请开始编写 UI</View>
          {/*
            可用数据变量:
            - almanacData (黄历)
            - godnessData (吉神)
            - timeData (吉时)
          */}
          <View style={{ marginTop: 20, fontSize: 12, color: '#666' }}>
            <View>Almanac: {almanacData ? '已获取' : '无'}</View>
            <View>Godness: {godnessData ? '已获取' : '无'}</View>
            <View>Time: {timeData ? '已获取' : '无'}</View>
          </View>
        </View>
      )}
    </View>
  )
}
