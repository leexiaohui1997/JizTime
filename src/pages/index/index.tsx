import { View, Text, Button, Input } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { API_BASE_URL } from '../../config/api'
import './index.scss'

export default function Index() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useLoad(() => {
    console.log('Page loaded.')
  })

  // 调用 Netlify Function
  const callHelloFunction = async () => {
    if (!name) {
      Taro.showToast({ title: '请输入名字', icon: 'none' })
      return
    }

    setLoading(true)
    setMessage('')

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
        setMessage(response.data.message)
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

  return (
    <View className='index'>
      <View className='header'>
        <Text>Netlify Function 测试</Text>
      </View>

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
          调用 Hello Function
        </Button>
      </View>

      {message && (
        <View className='result'>
          <Text>返回结果: {message}</Text>
        </View>
      )}

      <View className='debug-info'>
        <Text className='tip'>当前环境: {process.env.TARO_ENV}</Text>
        <Text className='tip'>API Base: {API_BASE_URL}</Text>
      </View>
    </View>
  )
}
