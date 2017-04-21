# useful-components-kit

A collection of frequently used functional components kit realized by Vue.js.

List of components in this version:

- Carousel(轮播图)
- Slider(滑块)
- CAPTCHA(手机验证码)
- rlog - PV part
- rlog - action part

Some of the designs are inspired by [iView UI](https://github.com/iview/iview)

---

## Usage

This kit needs secondary development for deployment. By now, you can follow the steps below.

```bash
git clone https://gitlab.corp.youdao.com/webfront-xuetang/useful-components-kit.git
cd useful-components-kit
```

In the faraway future, maybe you can use the following command

```bash
npm install yuck --save
```

The resources are in `lib/`. You can start your work from `src/` and debug from

```bash
npm run dev
```

After your work, just `webpack` it.

```bash
npm run build
```

## Development Guide

- All the components lie in `lib/components/`. Use `index.js` to export it.
- Related CSS and resources files are in `lib/assets/`. When you need to update components' style, just modify `common.css` in `lib/assets`

### carousel

Carousel is the slideshow for cycling through a series of contents. This component leverages transform3D to make it.

**Please use carousel together with carousel-item.**

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

Carousel-item is used for the container of each content of carousel.

**Please use carousel-item together with carousel**

### Icon

Useful icon component for some situations, for example left arrow. This component should work together with FontAwesome CSS and font.

#### props

属性 | 说明 | 类型 | 默认值
----|-----|------|-----
type|图标类型(必填)，参考[Font Awesome](http://fontawesome.io/icons/)|String|无
color|图标颜色|String|`#000`
size|图标大小|Number\| String|使用场景的字体大小
aria|`aria-hidden`的属性值|Boolean|`true`
