/**
 * Shumai API 响应通用结构
 */
export interface ShumaiResponse<T> {
  /** 接口请求成功标识，true为成功，false为失败 */
  success: boolean;
  /** 成功为200，其它为失败状态码 */
  code: number | string; // 文档中 code 有时是 200 (number) 有时是 "0" (string) in data, but outer code is number usually. Let's be safe. Wait, example shows 200.
  /** code对应的说明描述 */
  msg: string;
  /** 验证结果详细信息 */
  data: T;
}

/**
 * 黄历接口返回数据
 * https://api.shumaidata.com/v10/almanac/calendar
 */
export interface AlmanacData {
  /** 订单号 */
  orderNo: string;
  /** 0为成功，扣除次数；其余为失败，不扣除次数 */
  ret_code: number | string;
  /** 地支 */
  dizhi: string;
  /** 彭祖百忌 */
  pzbj: string;
  /** 农历 */
  nongli: string;
  /** 查询成功 */
  msg: string;
  /** 值日 */
  zhiri: string;
  /** 值神 */
  zhishen: string;
  /** 当前月包含的24节气 */
  jieqi24: string;
  /** 公历信息 */
  gongli: string;
  /** 纳音 */
  nayin: string;
  /** 胎神占方 */
  tszf: string;
  /** 生肖 */
  shengxiao: string;
  /** 儒略历 */
  rulueli: string;
  /** 吉神宜趋 */
  jsyq: string;
  /** 节日 */
  jieri: string;
  /** 凶神宜忌 */
  xsyj: string;
  /** 忌 */
  ji: string;
  /** 气象 */
  qixiang: string | null;
  /** 星座 */
  xingzuo: string;
  /** 冲煞 */
  chongsha: string;
  /** 干支 */
  ganzhi: string;
  /** 宜 */
  yi: string;
}

/**
 * 吉神凶煞接口返回数据
 * https://api.shumaidata.com/v10/almanac/godness
 */
export interface GodnessData {
  /** 订单号 */
  orderNo: string;
  /** 月支 */
  yuezhi: string;
  /** 月七煞 */
  yueqisha: string;
  /** 犯太岁 */
  fantaisui: string;
  /** 二十八宿 */
  esbx: string;
  /** 财神 */
  caishen: string;
  /** 月三煞 */
  yuesansha: string;
  /** 年三煞 */
  niansansha: string;
  /** 九星 */
  jiuxing: string;
  /** 年七煞 */
  nianqisha: string;
  /** 物候 */
  wuhou: string;
  /** 0为成功，扣除次数；其余为失败，不扣除次数 */
  ret_code: string | number;
  /** 日禄 */
  rilu: string;
  /** 日空亡 */
  rikongwang: string;
  /** 仲冬 */
  zhongdong: string;
  /** 年空亡 */
  niankongwang: string;
  /** 岁破位 */
  suipowei: string;
  /** 日三煞 */
  risansha: string;
  /** 年太岁 */
  niantaisui: string;
  /** 十二值神 */
  zhishen12: string;
  /** 十二值日 */
  zhiri12: string;
  /** 推荐吉时 */
  tjjs: string;
  /** 月令 */
  yueling: string;
  /** 查询成功 */
  msg: string;
  /** 日七煞 */
  riqisha: string;
  /** 喜神 */
  xishen: string;
  /** 阴贵神 */
  yinguishen: string;
  /** 福神 */
  fushen: string;
  /** 月相 */
  yuexiang: string;
  /** 月空亡 */
  yuekongwang: string;
  /** 阳贵神 */
  yangguishen: string;
  /** 易经卦象 */
  yjgx: string;
  /** 六曜 */
  liuyao: string;
  /** 太岁位 */
  taisuiwei: string;
}

/**
 * 吉时详情
 */
export interface TimeDetail {
  /** 吉凶 */
  jixiong: string;
  /** 吉神 */
  jishen: string;
  /** 时间 */
  shijian: string;
  /** 凶神 */
  xiongshen: string;
  /** 时冲 */
  shichong: string;
  /** 时柱 */
  shizhu: string;
}

/**
 * 吉时查询接口返回数据
 * https://api.shumaidata.com/v10/almanac/time
 * 包含12个时辰的详细信息
 */
export interface TimeData {
  orderNo: string;
  ret_code: string | number;
  msg: string;
  /** 子时 23:00-01:00 */
  zi: TimeDetail;
  /** 丑时 01:00-03:00 */
  chou: TimeDetail;
  /** 寅时 03:00-05:00 */
  yin: TimeDetail;
  /** 卯时 05:00-07:00 */
  mao: TimeDetail;
  /** 辰时 07:00-09:00 */
  cheng: TimeDetail; // 注意：文档中拼写为 cheng，通常拼音是 chen，需确认。文档示例为 "cheng"
  /** 巳时 09:00-11:00 */
  si: TimeDetail;
  /** 午时 11:00-13:00 */
  wu: TimeDetail;
  /** 未时 13:00-15:00 */
  wei: TimeDetail;
  /** 申时 15:00-17:00 */
  shen: TimeDetail;
  /** 酉时 17:00-19:00 */
  you: TimeDetail;
  /** 戌时 19:00-21:00 */
  xu: TimeDetail;
  /** 亥时 21:00-23:00 */
  hai: TimeDetail;
}
