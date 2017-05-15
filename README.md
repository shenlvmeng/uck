# useful-components-kit

基于Vue.js的对已有常用活动页功能的抽象封装。

当前已有的组件:

- Carousel 轮播图
- Countdown 倒计时
- Form 表单
- Icon 图标
- Link 链接标签
- Popup 弹窗
- Slider 滑块

部分设计参考于[iView UI](https://github.com/iview/iview)和[Element UI](http://element.eleme.io/#/zh-CN)

---

## 用法

功能抽象组件用于完成逻辑或交互复杂的活动页面甚至业务页面，需要基于已有组件二次开发。

```bash
npm install
npm run dev
```

### 使用者

```bash
git clone https://gitlab.corp.youdao.com/webfront-xuetang/useful-components-kit.git
cd useful-components-kit
```

组件资源位于`lib/components`路径下。示范用法在`src/App.vue`中。

- 在`src/`下开始工作，书写自己的组件，路由等功能
- 在`src/main.js`中完成组织工作
- 在`lib/assets/common.css`中修改组件默认样式，注意命名格式
- 在`index.html`根据需要添加外部js等资源文件

```bash
npm install
npm run dev
```

完成工作后执行`npm run build`打包。

### 开发者

开发新组件时，

- 在`lib/components`目录下新建文件夹添加新组件
- 在`lib/assets/common.css`中添加附属的样式。
- 在`src/App.vue`中书写测试样例
- 更新此文档

---

## 组件

### Carousel

轮播图，通过`transform`实现。

**配合`carousel-item`使用**

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|-----
autoplay|是否自动播放|Boolean|true
speed|自动播放速度，500到10000之间|Number|3000
navi|下方导航条显示位置，可选值`inside` `outside` `none`|String|`inside`
trigger|导航条触发方式，可选值`hover` `click`|String|`hover`
arrow|切换箭头显示时机，可选值`hover` `always` `never`|String|`hover`

#### events

事件名|说明|回调参数
-----|----|----
shift|幻灯片切换时触发|oldVal: 改变前的索引, val:改变后的索引

### Carousel-item

轮播图中的每张幻灯片，幻灯片内容内容放在标签内。

**配合`carousel`使用**

#### slot

幻灯片内容插槽，插入实际内容。

### Icon

借助FontAwesome实现的icon font.

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|-----
type|图标类型**(必填)**，参考[Font Awesome](http://fontawesome.io/icons/)|String|无
color|图标颜色|String|`#000`
size|图标大小|Number, String|使用场景的字体大小
aria|`aria-hidden`的属性值|Boolean|`true`

### Form

提交到后台表单系统的form表单。包含手机号，验证码，姓名（可选），地址（可选）。

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|-----
pvkey|后台标志字段**（必填）**|String|无
hasName|是否带姓名字段**（必填）**|Boolean|`false`
hasAddr|是否带地址字段**（必填）**|Boolean|`false`
countKey|计数功能标志字段|String|无需计数时留空

#### events

事件名|说明|回调参数
-----|---|-----
type|输入框focus时触发，用于避免软键盘遮挡内容|type: 当前输入框类型
success|提交成功|num: 手机号, code: 验证码, name: 姓名, addr: 住址

### Link

带有rlog动作、vendor信息或前端路由的`<a>`标签。

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|-----
to|跳转链接**（必填）**|String|无
router|前端路由|Object|`null`
onClick|点击事件处理函数|Function|
rlog|rlog动作信息|String|
_blank|是否在新页面打开|Boolean|`true`

值得注意的是
1. `to`填写的路由根据Vue-router的工作模式决定（hash或history）
2. `onClick`在传入时需要注意`this`指向的问题。

#### slot

链接内容插槽，插入实际内容，如文本，图片等。

### Slider

滑动条和滑块。通过拖动滑动条在一个事先指定的区间内进行选择。

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|-----
start|滑动区间下界|Number|0
end|滑动区间上界|Number|100
min|允许区间下界(未指定时等同于start)|Number/Boolean|`false`
max|允许区间上界(未指定时等同于end)|Number/Boolean|`false`
disabled|是否不可交互|Boolean|`false`
step|步长(建议设置成区间长度的因数，需要>0)|Number|1
hasHint|是否显示Tooltip|Boolean|`true`
hinter|格式化Tooltip显示内容|Function(value)|

#### events

事件名|说明|回调参数
-----|----|----
change|值改变时触发（仅在鼠标释放和touch结束时触发）|value: 改变后的值

#### slot

滑块内容插槽。用于实现更复杂的滑块样式。

### Popup

弹窗。点击页面元素出现的提示信息和额外内容。

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|-----
className|包裹触发弹窗的元素的类名，用于修饰整体样式|String|
hidden|是否显示弹窗内容，用于手动控制|Boolean|`true`

#### events

事件名|说明|回调参数
-----|----|----
click|处理弹窗内的点击事件，用于通知外部父组件当前弹窗情况|hidden: 当前是否显示弹窗内容

#### slot

插槽名|说明|默认值
-----|---|-----
trigger|触发弹窗的元素内容|见示例效果
close|弹窗内的关闭按钮内容|见示例效果
content|弹窗内容体|见示例效果

### Countdown

倒计时。承载倒计时功能。

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|-----
interval|倒计时的间隔，单位：秒。需要大于0.5小于60|Number|1
length|倒计时的次数**（必填）**，需要是大于0的整数|Number|无
control|当前倒计时状态控制开关**（必填）**|Number，0: stop，1: pause，2: play，3: replay|无

#### events

事件名|说明|回调参数
-----|----|----
start|倒计时开始|remain: 当前剩余倒计时次数
pause|倒计时暂停|同上
stop|倒计时停止|无
tick|每次倒计时完成|remain: 当前剩余倒计时次数
timeout|倒计时自然结束|无

#### slot

倒计时界面内容插槽，用于填充主体内容
