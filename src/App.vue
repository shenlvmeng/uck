<template>
  <div>
    <Tabs
      :seq="1"
    >
      <tabs-item
        v-for="(item, index) in [1,2,3]"
        :index="index"
        :key="index"
      >
        <span slot="tab">选项卡{{index}}</span>
        Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}, Item{{index}}
      </tabs-item>
    </Tabs>
    <Countdown
      :interval="0.5"
      :length="10"
      :control="flag"
      @tick="handleTick"
      @timeout="handleTimeout"
    >
      {{ timer }}
      <button
        @click="handleCountdownStart"
      >
        {{ status === 2 ? "Pause" :
            ( status === 0 ? "Restart" : "Start")}}
      </button>
      <button
        @click="handleCountdownStop"
      >
        Stop
      </button>
    </Countdown>
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
    <Carousel :autoplay="true" :speed="1500" navi="inside" trigger="hover" arrow="hover">
      <carousel-item>
        <div class="demo-carousel">1</div>
      </carousel-item>
      <carousel-item>
        <div class="demo-carousel">2</div>
      </carousel-item>
      <carousel-item>
        <div class="demo-carousel">3</div>
      </carousel-item>
      <carousel-item>
        <div class="demo-carousel">4</div>
      </carousel-item>
    </Carousel>
  </div>
</template>

<script>
  import Form from '../lib/components/form/';
  import Link from '../lib/components/link/';
  import Slider from '../lib/components/slider/';
  import Popup from '../lib/components/popup';
  import Countdown from '../lib/components/countdown/';
  import { Carousel, CarouselItem } from '../lib/components/carousel';
  import { Tabs, TabsItem } from '../lib/components/tabs/';

  export default {
    name: "app",
    data() {
      return {
        popup: true,
        timer: 10,
        flag: 0,
        status: 1
      }
    },
    methods: {
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
      },
      handleTick({ remain }) {
        this.timer = remain;
      },
      handleTimeout() {
        this.flag = 0;
        this.status = 0;
        alert("答题时间到");
      },
      handleCountdownStop() {
        this.flag = 0;
        this.status = 0;
        this.timer = 10;
      },
      handleCountdownStart() {
        if (this.status === 2) {
          this.flag = this.status = 1;
        } else if (this.status === 1) {
          this.flag = this.status = 2;
        } else {
          this.flag = 3;
          this.status = 2;
        }
      }
    },
    components: {
      Carousel,
      CarouselItem,
      Slider,
      Popup,
      Countdown,
      Tabs,
      TabsItem
    }
  }
</script>
<style scoped>
  .slider {
    width: 500px;
    padding: 10px 0;
  }
  .demo-carousel {
    height: 250px;
    line-height: 250px;
    background-color: steelblue;
    font-size: 20px;
    text-align: center;
  }
</style>
