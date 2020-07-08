# 小程序视频自定义控制组件

## 使用示例
<baby-viode mediaInfo="{{mediaInfo}}" bind:addMedieObj="addMedieObj"/>

## 参数 mediaInfo
id: 视频组件唯一id      必填
videoUrl: 视频地址      必填
coverUrl: 视频封面      非必填 默认 null
mediaTime: 视频时长     非必填 默认 120s

## 方法 addMedieObj({id, mediaObj})
返回参数 
id: 视频组件唯一id
mediaObj: 视频对象