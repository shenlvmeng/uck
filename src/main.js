import Vue from 'vue';
import VueResource from 'vue-resource';
import Icon from '../lib/components/icon/index'
import { Carousel, CarouselItem } from '../lib/components/carousel/index'

Vue.use(VueResource);

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