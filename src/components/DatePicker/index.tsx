import { Text, View } from '@tarojs/components'
import './index.scss'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { TriangleDown } from '@nutui/icons-react-taro'

interface DatePickerProps {
  value: Date
  onChange: (date: Date) => void
}

export default function DatePicker({ value }: DatePickerProps) {
  const d = useMemo(() => dayjs(value), [value])

  return (
    <View className='date-picker'>
      <View className="bar">
        <View className="bar-item">
          <Text>{d.get('year')}</Text>
          <View className="bar-icon">
            <TriangleDown size={10} color='#fff' />
          </View>
        </View>

        <View className="bar-item">
          <Text>{d.get('month') + 1}月</Text>
          <View className="bar-icon">
            <TriangleDown size={10} color='#fff' />
          </View>
        </View>
      </View>

      <View className="p">
        <Text>{d.get('date')}</Text>
      </View>
    </View>
  )
}
