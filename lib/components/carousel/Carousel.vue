<template>
  <!--Carousel-->
  <div
    :class="prefix"
  >
    <button
      :class="arrowClasses" class="left"
      @click="handleArrow(-1)"
    >
      <Icon
        type="angle-left"
        :aria="false"
      ></Icon>
    </button>
    <div
      :class="prefix + '-list'"
    >
      <div
        :class="prefix + '-track'"
        :style="trackStyle"
      >
        <slot></slot>
      </div>
    </div>
    <button
      :class="arrowClasses"
      class="right"
      @click="handleArrow(1)"
    >
      <Icon
        type="angle-right"
        :aria="false"
      ></Icon>
    </button>
    <ul
      :class="naviClasses"
    >
      <li
        v-for="(s, i) in slides"
        :class="i == currentIndex ? prefix + '-navi-active' : ''"
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
  import Icon from '../icon/index.js';

  const prefix = "uck-carousel";

  export default {
    name: "Carousel",
    props: {
      autoplay: {
        type: Boolean,
        default: false
      },

      speed: {
        type: Number,
        default: 2000,
        validator (value) {
          return value > 500 && value < 10000;
        }
      },

      arrow: {
        type: String,
        default: "hover",
        validator (value) {
          return ["hover", "always", "never"].indexOf(value) != -1;
        }
      },

      navi: {
        type: String,
        default: "inside",
        validator (value) {
          return ["inside", "outside", "none"].indexOf(value) != -1;
        }
      },

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
        prefix: prefix,
        // length of children slides
        length: 0,
        // current slide index
        currentIndex: 0,
        // current slide offset
        currentOffset: 0,
        // setInterval timer
        timer: null,
        // width of each item
        itemWidth: 0,
        // total width of carousel width
        totalWidth: 0
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

      // set children's width
      setChildWidth () {
        this.$children.forEach((child) => {
          if (typeof child.adjust == "function") {
            child.adjust(this.itemWidth);
          }
        });
      },

      refreshOffset () {
        this.$nextTick(() => {
          this.currentOffset = this.currentIndex * this.itemWidth;
        });
      },

      step (step) {
        // be careful for the negative trap
        this.currentIndex = (this.currentIndex + step + this.length) % this.length;
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
          width: `${this.totalWidth}px`,
          transform: `translateX(-${this.currentOffset}px)`,
          transition: `transform 500ms`
        }
      },
      slides () {
        return Array.from(Array(this.length));
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
      this.length = this.$el.children.length;
      this.itemWidth = this.$el.clientWidth;
      this.totalWidth = this.itemWidth * this.length;
      this.setChildWidth();
      this.setAutoplay();
    },
    beforeDestroy () {
      window.clearInterval(this.timer);
    },
    components: {
      Icon: Icon
    }
  }
</script>