import Vue from 'vue';
import Icon from '../lib/components/icon/index'
import { Carousel, CarouselItem } from '../lib/components/carousel/index'

new Vue({
  el: "#app",
  data: {

  },
  components: {
    icon: Icon,
    carousel: Carousel,
    "carousel-item": CarouselItem
  }
});