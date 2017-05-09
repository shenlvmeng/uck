<template>
  <div>
    <div class="slider">
      <Slider
        :start="0"
        :end="150"
        :min="50"
        :max="100"
        :disabled="false"
        :hasHint="true"
        :hinter="hinter"
        :step="2"
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
  import { Carousel, CarouselItem } from '../lib/components/carousel'

  export default {
    name: "app",
    data() {
      return {
        count: 0
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
      }
    },
    components: {
      Carousel,
      Phoneform: Form,
      Carouselitem: CarouselItem,
      Alink: Link,
      Slider
    }
  }
</script>
<style scoped>
  .slider {
    width: 500px;
    padding: 10px 0;
  }
</style>