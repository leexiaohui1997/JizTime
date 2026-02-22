import { View, Text, Button, Input } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import { formatGreeting } from '@shared/utils'
import type { ShumaiResponse, AlmanacData, GodnessData, TimeData } from '@shared/shumai-types'
import './index.scss'

export default function Index() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [localMessage, setLocalMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Shumai API State
  const [ymd, setYmd] = useState('')
  const [almanacResult, setAlmanacResult] = useState<ShumaiResponse<AlmanacData> | null>(null)
  const [godnessResult, setGodnessResult] = useState<ShumaiResponse<GodnessData> | null>(null)
  const [timeResult, setTimeResult] = useState<ShumaiResponse<TimeData> | null>(null)
  const [apiLoading, setApiLoading] = useState({ almanac: false, godness: false, time: false })

  useLoad(() => {
    console.log('Page loaded.')
    // 设置默认日期为今天 (yyyyMMdd)
    const today = new Date()
    const y = today.getFullYear()
    const m = String(today.getMonth() + 1).padStart(2, '0')
    const d = String(today.getDate()).padStart(2, '0')
    setYmd(`${y}${m}${d}`)
  })

  // 本地调用共享逻辑
  const handleLocalGreet = () => {
    if (!name) return
    // 直接在前端使用共享函数，无需网络请求
    setLocalMessage(formatGreeting(name))
  }

  // 调用 Netlify Function
  const callHelloFunction = async () => {
    if (!name) {
      Taro.showToast({ title: '请输入名字', icon: 'none' })
      return
    }

    setLoading(true)
    setMessage('')
    handleLocalGreet()

    try {
      // 拼接完整的请求 URL
      const url = `${API_BASE_URL}/.netlify/functions/hello?name=${encodeURIComponent(name)}`
      console.log('Request URL:', url)

      const response = await Taro.request({
        url,
        method: 'GET',
        // 微信小程序必须配置
        header: {
          'content-type': 'application/json'
        }
      })

      if (response.statusCode === 200) {
        // 后端返回的数据中包含了后端调用的结果
        const result = response.data
        setMessage(`服务端返回: ${result.message}\n${result.secretInfo}`)
      } else {
        setMessage(`Error: ${response.statusCode}`)
      }
    } catch (error) {
      console.error('Request failed:', error)
      setMessage('请求失败，请检查网络或配置')
    } finally {
      setLoading(false)
    }
  }

  // 通用 API 调用函数
  const callShumaiApi = async <T,>(endpoint: string, stateKey: 'almanac' | 'godness' | 'time', setResult: (data: ShumaiResponse<T>) => void) => {
    setApiLoading(prev => ({ ...prev, [stateKey]: true }))
    try {
      const url = `${API_BASE_URL}/.netlify/functions/${endpoint}?ymd=${ymd}`
      console.log(`Calling ${endpoint}:`, url)

      const response = await Taro.request({
        url,
        method: 'GET',
        header: { 'content-type': 'application/json' }
      })

      if (response.statusCode === 200) {
        setResult(response.data as ShumaiResponse<T>)
      } else {
        Taro.showToast({ title: `${endpoint} Error: ${response.statusCode}`, icon: 'none' })
      }
    } catch (error) {
      console.error(`Call ${endpoint} failed:`, error)
      Taro.showToast({ title: '请求失败', icon: 'none' })
    } finally {
      setApiLoading(prev => ({ ...prev, [stateKey]: false }))
    }
  }

  return (
    <View className='index'>
      <View className='header'>
        <Text>Netlify Function 测试</Text>
      </View>

      {/* Hello Function Section */}
      <View className='section'>
        <Text className='section-title'>基础测试</Text>
        <View className='form-group'>
          <Input
            className='input'
            type='text'
            placeholder='请输入名字'
            value={name}
            onInput={(e) => setName(e.detail.value)}
          />
          <Button
            className='btn'
            onClick={callHelloFunction}
            loading={loading}
            disabled={loading}
          >
            调用 Hello
          </Button>
        </View>

        {localMessage && (
          <View className='result success'>
            <Text>前端本地计算: {localMessage}</Text>
          </View>
        )}

        {message && (
          <View className='result'>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{message}</Text>
          </View>
        )}
      </View>

      {/* Shumai API Section */}
      <View className='section'>
        <Text className='section-title'>Shumai API 测试</Text>
        <View className='form-group'>
          <Input
            className='input'
            type='number'
            placeholder='日期 yyyyMMdd'
            value={ymd}
            onInput={(e) => setYmd(e.detail.value)}
          />
        </View>
        
        <View className='btn-group'>
          <Button 
            className='btn sm' 
            loading={apiLoading.almanac} 
            onClick={() => callShumaiApi<AlmanacData>('almanac', 'almanac', setAlmanacResult)}
          >
            查黄历
          </Button>
          <Button 
            className='btn sm' 
            loading={apiLoading.godness} 
            onClick={() => callShumaiApi<GodnessData>('godness', 'godness', setGodnessResult)}
          >
            查吉神
          </Button>
          <Button 
            className='btn sm' 
            loading={apiLoading.time} 
            onClick={() => callShumaiApi<TimeData>('time', 'time', setTimeResult)}
          >
            查吉时
          </Button>
        </View>

        {almanacResult && (
          <View className='result json-box'>
            <Text className='label'>黄历结果:</Text>
            <Text className='code'>{JSON.stringify(almanacResult, null, 2)}</Text>
          </View>
        )}

        {godnessResult && (
          <View className='result json-box'>
            <Text className='label'>吉神结果:</Text>
            <Text className='code'>{JSON.stringify(godnessResult, null, 2)}</Text>
          </View>
        )}

        {timeResult && (
          <View className='result json-box'>
            <Text className='label'>吉时结果:</Text>
            <Text className='code'>{JSON.stringify(timeResult, null, 2)}</Text>
          </View>
        )}
      </View>

      <View className='debug-info'>
        <Text className='tip'>当前环境: {process.env.TARO_ENV}</Text>
        <Text className='tip'>API Base: {API_BASE_URL}</Text>
      </View>
    </View>
  )
}
