# useful-components-kit

基于Vue.js的对已有常用功能的抽象封装。

当前计划中的抽象功能:

- Carousel(轮播图)
- Slider(滑块)
- captcha(手机验证码)
- rlog - PV部分
- rlog - 动作部分

部分设计参考于[iView UI](https://github.com/iview/iview)和[Element UI](http://element.eleme.io/#/zh-CN)

---

## 用法

功能抽象组件用于完成逻辑或交互复杂的活动页面甚至业务页面，需要基于组件二次开发。

### 使用者

```bash
git clone https://gitlab.corp.youdao.com/webfront-xuetang/useful-components-kit.git
cd useful-components-kit
```

组件资源位于`lib/components`路径下。

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

有新组件出现时，在`lib/components`目录下新建文件夹添加新组件。在`lib/assets/common.css`中添加附属的样式。

## 组件

### carousel

轮播图，通过`transform`实现。（*日后可能会改成更自然的方式*）

**请配合carousel-item使用**

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|-----
autoplay|是否自动播放|Boolean|true
speed|自动播放速度，500到10000之间|Number|3000
navi|下方导航条显示位置，可选值`inside` `outside` `none`|String|`inside`
trigger|导航条触发方式，可选值`hover` `click`|String|`hover`
arrow|切换箭头显示时机，可选值`hover` `always` `never`|String|`hover`

#### events

事件名|说明|返回值
-----|----|----
shift|幻灯片切换时触发|oldVal, val

#### carousel-item

轮播图中的每张幻灯片

**请配合carousel使用**

### Icon

借助FontAwesome实现的icon font.

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|-----
type|图标类型(必填)，参考[Font Awesome](http://fontawesome.io/icons/)|String|无
color|图标颜色|String|`#000`
size|图标大小|Number, String|使用场景的字体大小
aria|`aria-hidden`的属性值|Boolean|`true`
