<template>
  <div :class="prefix" :style="style">
    <slot></slot>
  </div>
</template>

<script>
  const prefix = "uck-carousel-item";

  export default {
    name: "CarouselItem",
    data () {
      return {
        prefix,
        width: "0",
        height: "auto"
      }
    },
    methods: {
      adjust(width) {
        this.width = `${width}px`;
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