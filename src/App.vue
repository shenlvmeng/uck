<template>
  <div>
    <Popup></Popup>
    <Popup
      :hidden="popup"
      @click="handlePopup"
    >
      <span slot="trigger">Click me</span>
      <Phoneform
        pvkey="test"
        slot="content">
      </Phoneform>
      <span slot="content">
        You can aslo close this popup by click <a href="javascript:;" @click="closepopup">this</a>.
      </span>
    </Popup>
    <div class="slider">
      <Slider
        :start="0"
        :end="150"
        :min="50"
        :max="100"
        :disabled="false"
        :hasHint="true"
        :hinter="hinter"
        :step="5"
        @change="sliderChange"
      >
      </Slider>
    </div>
    <Alink
      to="http://youdao.com"
      :_blank="true"
      :onClick="print().bind(this)"
      rlog="test"
    >
      Youdao
    </Alink>
    <Phoneform pvkey="test" ></Phoneform>
    <Carousel :autoplay="true" :speed="1500" navi="inside" trigger="hover" arrow="hover">
      <Carouselitem>
        <div class="demo-carousel">1</div>
      </Carouselitem>
      <Carouselitem>
        <div class="demo-carousel">2</div>
      </Carouselitem>
      <Carouselitem>
        <div class="demo-carousel">3</div>
      </Carouselitem>
      <Carouselitem>
        <div class="demo-carousel">4</div>
      </Carouselitem>
    </Carousel>
  </div>
</template>

<script>
  import Form from '../lib/components/form/'
  import Link from '../lib/components/link/'
  import Slider from '../lib/components/slider/'
  import Popup from '../lib/components/popup';
  import { Carousel, CarouselItem } from '../lib/components/carousel'

  export default {
    name: "app",
    data() {
      return {
        count: 0,
        popup: true
      }
    },
    methods: {
      print() {
        return (e) => {
          this.count++;
          console.log(`接收到点击事件。count: ${this.count}`);
        };
      },
      hinter(val) {
        return `Value:${val}`;
      },
      sliderChange({ value }) {
        console.log(value);
      },
      closepopup() {
        this.popup = true;
      },
      handlePopup({ hidden }) {
        this.popup = hidden;
      }
    },
    components: {
      Carousel,
      Phoneform: Form,
      Carouselitem: CarouselItem,
      Alink: Link,
      Slider,
      Popup
    }
  }
</script>
<style scoped>
  .slider {
    width: 500px;
    padding: 10px 0;
  }
</style>