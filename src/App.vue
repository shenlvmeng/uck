<template>
  <div>
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
      }
    },
    components: {
      Carousel: Carousel,
      Phoneform: Form,
      Carouselitem: CarouselItem,
      Alink: Link
    }
  }
</script>

<style>
</style>