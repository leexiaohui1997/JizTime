# 接口名称：黄历
#### 描述：支持1901年1月1日至当前年的查询。
请求地址 url：https://api.shumaidata.com/v10/almanac/calendar
请求方式 method：get/post
参数：

|  名称 |  类型 |是否必填   | 说明  |
| ------------ | ------------ | ------------ | ------------ |
| appid  |  varchar |  是 | 服务商分配的唯一标识  |
| timestamp |  number | 是  | 当前时间的毫秒数  |
| sign  | varchar  | 是  | 签名，<a href='#sign'>签名算法说明</a>  |
| ymd | varchar  | 否  | 格式为yyyyMMdd |


<a name="sign">

#### 签名算法说明：
######  服务商分配的appid、当前时间毫秒数timestamp、商户分配的app_security、 三者通过&符号拼接成字符串进行md5加密得到。
     如：appid=xyzxyzxyz，timestamp=1555378976238，app_security=efcefcefcefcefc ;
	 拼接后的字符串格式：str = appid的值&amptimestamp的值&app_security的值;
     拼接后的字符串：str = xyzxyzxyz&1555378976238&efcefcefcefcefc ;
     加密后得到sign = md5(str) = 4e7e1974b79f3656aeaf03f1158f5d5d ;
</a>


#### 正确返回：
```
{
    "msg": "成功",
    "success": true,
    "code": 200,
    "data": {
        "orderNo": "2ic7wcnn3cyh56bvxr",  //订单号
        "ret_code": 0,  //0为成功，扣除次数；其余为失败，不扣除次数
        "dizhi": "今日与虎、马半合，与兔六合，较为吉祥；与龙相冲，与鸡相害，与牛、羊相刑。",  //地支
        "pzbj": "庚不经络织机虚张 戌不吃犬作怪上床",   //彭祖百忌
        "nongli": "二零二二年九月(小)廿九",    //农历
        "msg": "查询成功",
        "zhiri": "建执位(凶)",     //值日
        "zhishen": "白虎(黑道日)",  //值神
        "jieqi24": "10月8日寒露 10月23日霜降",  //当前月包含的24节气
        "gongli": "公元 2022年10月24日 星期一",  //
        "nayin": "[年]金箔金 [月]钗钏金 [日]钗钏金",  //纳音
        "tszf": "碓磨栖外东北",    //胎神占方
        "shengxiao": "属虎",   //生肖
        "rulueli": "2459876.5",   //儒略历
        "jsyq": "天恩 大明 七圣 神在 守日 月恩 天马 母仓",  //吉神宜趋
        "jieri": "联合国日 世界发展信息日",  //节日
        "xsyj": "牢日 月建 小时 土府 白虎 大会",   //凶神宜忌
        "ji": "动土 修造 装修 结婚 订婚 开仓 掘井 乘船 提车 新船下水",   //忌
        "qixiang": null,  //气象
        "xingzuo": "天蝎座",  //星座
        "chongsha": "冲龙煞北 正冲甲辰(1964 2024)",  //冲煞
        "ganzhi": "壬寅年 庚戌月 庚戌日",  //干支
        "yi": "上任 出行 入学 考试 求职 求财 签约 交易 谈判 求人 拜访 求嗣 置业 上梁 祈福 破土 安葬"  //宜
    }
}
```

#### 错误返回：
```
{
    "msg": "参数错误", 
    "success": false, 
    "code": 400, 
    "data": { }
}
```
#### 返回字段说明：

|  字段名 | 说明  |  
| ------------ | ------------ |
| success  | 接口请求成功标识，true为成功，false为失败，失败情况下，会有对应描述和状态码  |   
| code  |成功为200，其它为失败状态码   | 
| msg  | code对应的说明描述   | 
| data  | 验证结果详细信息|  




#### code错误码说明
|  code |  说明 |
| ------------ | ------------ |
| 200  | 成功  |
| 400  | 参数错误   |
| 404  | 请求资源不存在   |
| 500  | 系统内部错误，请联系服务商   |
| 501  |第三方服务异常
| 601  | 服务商未开通接口权限 |
| 602  | 账号停用 |
| 603  | 余额不足请充值 |
| 604  | 接口停用 |
|606 | 调用超限，请联系服务商
| 1001 | 其他，以实际返回为准


---

# 接口名称：吉神凶煞
#### 描述：支持1901年1月1日至2021年的查询。
请求地址 url：https://api.shumaidata.com/v10/almanac/godness
请求方式 method：get/post
参数：

|  名称 |  类型 |是否必填   | 说明  |
| ------------ | ------------ | ------------ | ------------ |
| appid  |  varchar |  是 | 服务商分配的唯一标识  |
| timestamp |  number | 是  | 当前时间的毫秒数  |
| sign  | varchar  | 是  | 签名，<a href='#sign'>签名算法说明</a>  |
| ymd | varchar  | 否  | 格式为yyyyMMdd |


<a name="sign">

#### 签名算法说明：
######  服务商分配的appid、当前时间毫秒数timestamp、商户分配的app_security、 三者通过&符号拼接成字符串进行md5加密得到。
     如：appid=xyzxyzxyz，timestamp=1555378976238，app_security=efcefcefcefcefc ;
	 拼接后的字符串格式：str = appid的值&amptimestamp的值&app_security的值;
     拼接后的字符串：str = xyzxyzxyz&1555378976238&efcefcefcefcefc ;
     加密后得到sign = md5(str) = 4e7e1974b79f3656aeaf03f1158f5d5d ;
</a>




#### 正确返回：
```
{
    "msg": "成功",
    "success": true,
    "code": 200,
    "data": {
        "orderNo": "xw5lkkgtg4rrg0yzpi",  //订单号
        "yuezhi": "戌土",   //月支
        "yueqisha": "辰",   //月七煞
        "fantaisui": "虎、猴、蛇",  //犯太岁
        "esbx": "东方心宿心月狐(凶)",  //二十八宿
        "caishen": "正东",   //财神
        "yuesansha": "北 三煞亥子丑 壬癸坐煞",    //月三煞
        "niansansha": "北 三煞亥子丑 壬癸坐煞",   //年三煞
        "jiuxing": "二�\\摄提土星(凶)",   //九星
        "nianqisha": "申",    //年七煞
        "wuhou": "豺乃祭兽",   //物候
        "ret_code": "0",   //0为成功，扣除次数；其余为失败，不扣除次数
        "rilu": "申命互禄",  //日禄
        "rikongwang": "寅卯",   //日空亡
        "zhongdong": "季秋", //仲冬
        "niankongwang": "辰巳",   //年空亡
        "suipowei": "西南",  //岁破位
        "risansha": "北 三煞亥子丑 壬癸坐煞",   //日三煞
        "niantaisui": "贺谔星君",  //年太岁
        "zhishen12": "白虎 ― 凶：俗称“大黑道日”。古籍云：天杀星，宜出师畋猎祭祀，皆吉，其余都不利。",  //十二值神
        "zhiri12": "建执位 ― 凶：俗称“小黑道日”。凶。依古籍观点，此日一般主吉，但修造动土之事不宜做。此日与月令合二为一，至高无上，非大富大贵者不能受用，故对于平常百姓来说，当属黑道日。 诗云： 建日相逢造葬凶，癫狂乱舞破家风；行嫁上任出行吉，教牛教马可以通。 建日可谋本为事，若行葬为再莫富；总计建除平收日，出兵斩破大有功。",  //十二值日
        "tjjs": "巳,申,亥",   //推荐吉时
        "yueling": "庚戌",   //月令
        "msg": "查询成功",
        "riqisha": "辰",  //日七煞
        "xishen": "西北",  //喜神
        "yinguishen": "西南",  //阴贵神
        "fushen": "西南",  //福神   
        "yuexiang": "晓月",  //月相
        "yuekongwang": "寅卯",   //月空亡
        "yangguishen": "东北",   //阳贵神
        "yjgx": "天地否",  //易经卦象
        "liuyao": "先� ― 平(早晚吉，白天凶)：依古籍观点，寓意上午凶，下午吉。与先胜相反，此日不宜轻举妄动，做事要慢半拍。 六曜，又称孔明六曜星、小六壬，是中国传统历法中的一种注文。后来传至日本，并于当地流行，而在中国影响日渐式微。",   //六曜
        "taisuiwei": "东北"   //太岁位
    }
}
```

#### 错误返回：
```
{
    "msg": "参数错误", 
    "success": false, 
    "code": 400, 
    "data": { }
}
```
#### 返回字段说明：

|  字段名 | 说明  |  
| ------------ | ------------ |
| success  | 接口请求成功标识，true为成功，false为失败，失败情况下，会有对应描述和状态码  |   
| code  |成功为200，其它为失败状态码   | 
| msg  | code对应的说明描述   | 
| data  | 验证结果详细信息|  




#### code错误码说明
|  code |  说明 |
| ------------ | ------------ |
| 200  | 成功  |
| 400  | 参数错误   |
| 404  | 请求资源不存在   |
| 500  | 系统内部错误，请联系服务商   |
| 501  |第三方服务异常
| 601  | 服务商未开通接口权限 |
| 602  | 账号停用 |
| 603  | 余额不足请充值 |
| 604  | 接口停用 |
|606 | 调用超限，请联系服务商
| 1001 | 其他，以实际返回为准


---

# 接口名称：吉时查询
#### 描述：支持1901年1月1日至2021年的查询。
请求地址 url：https://api.shumaidata.com/v10/almanac/time
请求方式 method：get/post
参数：

|  名称 |  类型 |是否必填   | 说明  |
| ------------ | ------------ | ------------ | ------------ |
| appid  |  varchar |  是 | 服务商分配的唯一标识  |
| timestamp |  number | 是  | 当前时间的毫秒数  |
| sign  | varchar  | 是  | 签名，<a href='#sign'>签名算法说明</a>  |
| ymd | varchar  | 否  | 格式为yyyyMMdd |

<a name="sign">

#### 签名算法说明：
######  服务商分配的appid、当前时间毫秒数timestamp、商户分配的app_security、 三者通过&符号拼接成字符串进行md5加密得到。
     如：appid=xyzxyzxyz，timestamp=1555378976238，app_security=efcefcefcefcefc ;
	 拼接后的字符串格式：str = appid的值&amptimestamp的值&app_security的值;
     拼接后的字符串：str = xyzxyzxyz&1555378976238&efcefcefcefcefc ;
     加密后得到sign = md5(str) = 4e7e1974b79f3656aeaf03f1158f5d5d ;
</a>


#### 正确返回：
```
{
    "msg": "成功",
    "success": true,
    "code": 200,
    "data": {
        "orderNo": "coxsnczh2khxj23317",
        "ret_code": "0",
        "msg": "查询成功",
        "zi": {
            "jixiong": "天牢(凶)",   //吉凶
            "jishen": "无",    //吉神
            "shijian": "23:00:00-0:59:59",  //时间
            "xiongshen": "天牢",  //凶神
            "shichong": "冲马",  //时冲
            "shizhu": "丙子"   //时柱
        },
        "hai": {
            "jixiong": "玉堂(吉)",
            "jishen": "玉堂文昌贵人",
            "shijian": "21:00:00-22:59:59",
            "xiongshen": "无",
            "shichong": "冲蛇",
            "shizhu": "丁亥"
        },
        "wei": {
            "jixiong": "朱雀(凶)",
            "jishen": "天乙贵人",
            "shijian": "13:00:00-14:59:59",
            "xiongshen": "朱雀日刑",
            "shichong": "冲牛",
            "shizhu": "癸未"
        },
        "cheng": {
            "jixiong": "青龙(吉)",
            "jishen": "青龙",
            "shijian": "7:00:00-8:59:59",
            "xiongshen": "日破",
            "shichong": "冲狗",
            "shizhu": "庚辰"
        },
        "you": {
            "jixiong": "天德(吉)",
            "jishen": "天德",
            "shijian": "17:00:00-18:59:59",
            "xiongshen": "日害",
            "shichong": "冲兔",
            "shizhu": "乙酉"
        },
        "wu": {
            "jixiong": "天刑(凶)",
            "jishen": "天官贵人福星贵人",
            "shijian": "11:00:00-12:59:59",
            "xiongshen": "天刑",
            "shichong": "冲鼠",
            "shizhu": "壬午"
        },
        "si": {
            "jixiong": "明堂(吉)",
            "jishen": "明堂",
            "shijian": "9:00:00-10:59:59",
            "xiongshen": "无",
            "shichong": "冲猪",
            "shizhu": "辛巳"
        },
        "xu": {
            "jixiong": "白虎(凶)",
            "jishen": "喜神",
            "shijian": "19:00:00-20:59:59",
            "xiongshen": "白虎",
            "shichong": "冲龙",
            "shizhu": "丙戌"
        },
        "chou": {
            "jixiong": "玄武(凶)",
            "jishen": "天乙贵人",
            "shijian": "1:00:00-2:59:59",
            "xiongshen": "玄武",
            "shichong": "冲羊",
            "shizhu": "丁丑"
        },
        "yin": {
            "jixiong": "司命(吉)",
            "jishen": "司命",
            "shijian": "3:00:00-4:59:59",
            "xiongshen": "无",
            "shichong": "冲猴",
            "shizhu": "戊寅"
        },
        "shen": {
            "jixiong": "金匮(吉)",
            "jishen": "金匮日禄日马",
            "shijian": "15:00:00-16:59:59",
            "xiongshen": "无",
            "shichong": "冲虎",
            "shizhu": "甲申"
        },
        "mao": {
            "jixiong": "勾陈(凶)",
            "jishen": "日合",
            "shijian": "5:00:00-6:59:59",
            "xiongshen": "勾陈",
            "shichong": "冲鸡",
            "shizhu": "己卯"
        }
    }
}
```

#### 错误返回：
```
{
    "msg": "参数错误", 
    "success": false, 
    "code": 400, 
    "data": { }
}
```
#### 返回字段说明：

|  字段名 | 说明  |  
| ------------ | ------------ |
| success  | 接口请求成功标识，true为成功，false为失败，失败情况下，会有对应描述和状态码  |   
| code  |成功为200，其它为失败状态码   | 
| msg  | code对应的说明描述   | 
| data  | 验证结果详细信息|  




#### code错误码说明
|  code |  说明 |
| ------------ | ------------ |
| 200  | 成功  |
| 400  | 参数错误   |
| 404  | 请求资源不存在   |
| 500  | 系统内部错误，请联系服务商   |
| 501  |第三方服务异常
| 601  | 服务商未开通接口权限 |
| 602  | 账号停用 |
| 603  | 余额不足请充值 |
| 604  | 接口停用 |
|606 | 调用超限，请联系服务商
| 1001 | 其他，以实际返回为准
