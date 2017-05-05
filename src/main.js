import Vue from 'vue';
import VueResource from 'vue-resource';
import Icon from '../lib/components/icon/'
import Form from '../lib/components/form/'
import { Carousel, CarouselItem } from '../lib/components/carousel'

Vue.use(VueResource);

new Vue({
  el: "#app",
  data: {

  },
  components: {
    icon: Icon,
    carousel: Carousel,
    phoneform: Form,
    "carousel-item": CarouselItem
  }
});