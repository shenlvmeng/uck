<template>
  <!--Carsousel Item-->
  <div :class="prefix" :style="style">
    <slot></slot>
  </div>
  <!--end Carousel Item-->
</template>

<script>
  const prefix = "uck-carousel-item";

  export default {
    name: "CarouselItem",
    data () {
      return {
        width: "100%",
        height: "auto"
      }
    },
    computed: {
      style () {
        return {
          width: `${this.width}`,
          height: `${this.height}`
        }
      }
    }
  }
</script>