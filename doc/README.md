## 小程序视频自定义控制组件

###使用示例
`<baby-viode mediaInfo="{{mediaInfo}}" bind:addMedieObj="addMedieObj"/>`

### 参数 mediaInfo

字段名 | 解释 | 是否必填 | 默认
-- | -- | -- | --
id | 视频组件唯一id | 是
videoUrl | 视频地址 | 是
coverUrl | 视频封面 | 否 | null
mediaTime | 视频时长 | 否 | 120s

### 方法 addMedieObj({id, mediaObj})
返回参数  
id: 视频组件唯一id  
mediaObj: 视频对象  