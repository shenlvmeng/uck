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
- Tabs 选项卡

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

组件相关文档参见`lib/docs/`。
