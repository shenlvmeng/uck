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
type|图标类型(**必填**)，参考[Font Awesome](http://fontawesome.io/icons/)|String|无
color|图标颜色|String|`#000`
size|图标大小|Number, String|使用场景的字体大小
aria|`aria-hidden`的属性值|Boolean|`true`

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

属性 | 说明 | 类型 | 可选值 | 默认值
----|-----|------|------|------
interval|倒计时的间隔，单位：秒。需要大于0.5小于60|Number|-|1
length|倒计时的次数（**必填**），需要是大于0的整数|Number|-|无
control|当前倒计时状态控制开关（**必填**）|Number|0: stop，1: pause，2: play，3: replay|无

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

### Tabs

选项卡，用于展示多个内容关联，共同组成一个整体的部分内容。

**配合`Tabs-item`使用**

#### props

属性 | 说明 | 类型 | 可选值 | 默认值
----|-----|------|------|------
type|选项卡是水平切换还是落地页类型|String|vertical: 落地页，horizontal: 水平切换|vertical
seq|默认展示的选项卡是第几位，需要不小于零|Number|-|0

### Tabs-item

选项卡的各子项。包括选项卡的标题和对应的内容体。其中，标题对应slot属性为"tab"的标签，内容体插入在组件默认slot内即可。像下面这样：

```HTML
<tabs-item>
  <span slot="tab">选项卡标题</span>
  <div>
    选项卡内容
  </div>
</tabs-item>
```

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|------|------
index|Tabs-item的唯一标识，用于识别Tabs-item|Number/String|无

#### slot

插槽名|说明|默认值
-----|---|-----
默认|选项卡对应内容体|无
tab|选项卡标题内容|无
