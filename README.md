# 小程序组件 navigation-bar

小程序自定义导航栏适配 完美解决内容上下不居中问题

## Navigation

Navigation 是小程序的顶部导航组件，当页面配置 navigationStyle 设置为 custom 的时候可以使用此组件替代原生导航栏

## 引入组件

在 page.json 中引入组件

```bash
{
  "usingComponents": {
    "navBar": "/components/navBar/navBar"
  }
}
```

## 示例代码

```bash
<!--WXML示例代码-->
 <navBar title='有返回和home' background='#fff' back="{{true}}" home="{{true}}" bindback="handlerGobackClick" bindhome="handlerGohomeClick"></navBar>
```

## 属性列表

| 属性       | 类型         | 默认值   | 必填 | 说明                                                                                      |
| ---------- | ------------ | -------- | ---- | ----------------------------------------------------------------------------------------- |
| ext-class  | string       |          | 否   | 添加在组件内部结构的 class，可用于修改组件内部的样式                                      |
| title / titleleft ||      | string       |          | 否   | 导航标题(居中或靠左)，如果不提供，则名为 center 的 slot 有效                                          |
| background | string       | #ffffff  | 否   | 导航背景色                                                                                |
| color      | string       | #000000  | 否   | 导航字体颜色                                                                              |
| iconTheme  | string       | black    | 否   | 主题图标和字体颜色,当背景色为深色时,可以设置'white'                                       |
| back       | boolean      | false    | 否   | 是否显示返回按钮，默认点击按钮会执行 navigateBack，如果为 false，则名为 left 的 slot 有效 |
| home       | boolean      | false    | 否   | 是否显示 home 按钮，执行方法自定义,或者看例子                                             |
| searchBar  | boolean      | false    | 否   | 是否显示搜索框，默认点击按钮会执行 bindsearch，如果为 false，则名为 center 的 slot 有效   |
| searchText | string       | 点我搜索 | 否   | 搜索框文字                                                                                |
| bindhome   | eventhandler |          | 否   | 在 home 为 true 时，点击 home 按钮触发此事件                                              |
| bindback   | venthandler  |          | 否   | 在 back 为 true 时，点击 back 按钮触发此事件，detail 包含 delta                           |
| bindsearch | eventhandler |          | 否   | 在 searchBar 为 true 时，点击 search 按钮触发此事件                                       |

## Slot

| 名称   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| left   | 左侧 slot，在 back 按钮位置显示，当 back 为 false 的时候有效 |
| center | 标题 slot，在标题位置显示，当 title 为空的时候有效           |
| right  | 在导航的右侧显示                                             |

## 注意

- iconTheme 设置为 white 的时候,一定要记得自己去 json 文件设置"navigationBarTextStyle": "white"
- 跳转搜索页面,在 Android 机子会出现文字被键盘弹起顶出 input 框,解决方案页面设置一个死的高度不要高于 windowHeight - navheight 例子中是设置 500px
- input 框文字抖动问题我是借鉴别人写的,可以最大限度减小文字抖动的大小,提升用户体验
- title searchBar slot="right" 如果全部有内容,是这样的先后显示顺序.
- 默认配置满足不了功能的,请使用 slot 功能,见例子 1 6 7

## 后续

- 其他功能,规划中,或者留言联系方式微信 zhijunxh
- 还需要其他样子的例子请留言,如果功能比较重要和主流的话,我会考虑第一时间添加




