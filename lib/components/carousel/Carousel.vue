<template>
  <!--Carousel-->
  <div :class="prefix">
    <button
      :class="arrowClasses" class="left"
      @click="handleArrow(-1)"
    >
      <Icon
        type="angle-left"
        :aria="false"
      >
    </button>
    <div :class="prefix + '-list'">
      <div
        :class="prefix + '-track'"
        :style="trackStyle"
      >
        <slot></slot>
      </div>
    </div>
    <button
      :class="arrowClasses" class="right"
      @click="handleArrow(1)"
    >
      <Icon
        type="angle-right"
        :aria="false"
      >
    </button>
    <ul :class="naviClasses">
      <li
        v-for="(s, i) in slides"
        :class="i == currentIndex ? prefix + '-active' : ''"
        @click="handleNavi('click', i)"
        @mouseover="handleNavi('hover', i)"
      >
        <button></button>
      </li>
    </ul>
  </div>
  <!--end Carousel-->
</template>

<script>
  import Icon from '../../icon/index.js';

  const prefix = "uck-carousel";

  export default {
    name: "Carousel",
    props: {
      autoplay: {
        type: Boolean,
        default: true
      },

      speed: {
        type: Number,
        default: 2000,
        validator (value) {
          return value > 500 && value < 10000;
        }
      }

      arrow: {
        type: String,
        default: "hover",
        validator (value) {
          return ["hover", "always", "never"].indexOf(value) != -1;
        }
      },

      navi: {
        type: String,
        default: "inline",
        validator (value) {
          return ["inside", "outside", "none"].indexOf(value) != -1;
        }
      }

      trigger: {
        type: String,
        default: "hover",
        validator (value) {
          return ["hover", "click"].indexOf(value) != -1;
        }
      }

    },
    data () {
      return {
        // length of children slides
        length: 0,
        // current slide index
        currentIndex: 0,
        // current slide offset
        currentOffset: 0,
        // setInterval timer
        timer: null
        // width of each item
        itemWidth: null
      }
    },
    methods: {

      handleArrow (step) {
        this.step(step);
        // restart autoplay for better experience
        this.setAutoplay();
      },

      handleNavi (type, to) {
        if (type === this.trigger && to !== this.currentIndex) {
          this.currentIndex = to;
          this.setAutoplay();
        }
      },

      // set or reset autoplay
      setAutoplay () {
        window.clearInterval(this.timer);

        if (true === this.autoplay) {
          this.timer = window.setInterval(() => {
            this.step(1);
          }, this.speed);
        }
      },

      refreshOffset () {
        this.$nextTick(() => {
          this.currentOffset = this.currentIndex * this.itemWidth;
        });
      }
      step (step) {
        this.currentIndex = (this.currentIndex + step) % this.length;
      }

    },
    computed: {
      arrowClasses () {
        return `${this.prefix}-arrow ${this.prefix}-arrow-${this.arrow}`;
      },
      naviClasses () {
        return `${this.prefix}-navi ${this.prefix}-navi-${this.navi}`;
      },
      trackStyle () {
        return {
          transform: `translateX(-${this.currentOffset}px)`,
          transition: `transform 500ms`
        }
      }
    },
    watch: {
      currentIndex (val, oldVal) {
        this.$emit('shift', val, oldVal);
        this.refreshOffset();
      },
      autoplay () {
        this.setAutoplay();
      },
      speed () {
        this.setAutoplay();
      }
    },
    mounted () {
      this.length = this.$children.length;
      this.itemWidth = this.$el.clientWidth;
      this.setAutoplay();
    },
    beforeDestroy () {
      window.clearInterval(this.timer);
    }
  }
</script>