<template>
  <div
    class="uck-slider"
    :class="{disabled: disabled}"
    @click="handleClick($event)"
    ref="slider"
  >
    <div
      class="uck-slider-track"
      :class="{disabled: disabled}"
      :style="trackStyle">
    </div>
    <SliderButton
      :value="value"
      :len="length"
      :start="start"
      :width="width"
      :disabled="disabled"
      @change="handleChange"
      @release="handleRelease"
    >
      <div
        v-if="hasHint"
        :class="`${prefix}-hint`"
      >
        {{message}}
      </div>
      <slot></slot>
    </SliderButton>
  </div>
</template>
<script>
  const prefix = "uck-slider";

  import SliderButton from "./SliderButton.vue";
  export default {
    name: "Slider",
    props: {
      start: {
        type: Number,
        default: 0
      },
      end: {
        type: Number,
        default: 100
      },
      min: {
        type: [Number, Boolean],
        default: false
      },
      max: {
        type: [Number, Boolean],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      step: {
        type: Number,
        default: 1,
        validator(val) {
          return val > 0;
        }
      },
      hasHint: {
        type: Boolean,
        default: true
      },
      hinter: {
        type: Function
      }
    },
    data() {
      return {
        prefix,
        // 滑块可达到的下界
        sliderMin: typeof this.min === "boolean" ? this.start : this.min,
        // 滑块可达到的上界
        sliderMax: typeof this.max === "boolean" ? this.end : this.max,
        value: 0,
        width: 0
      }
    },
    computed: {
      length() {
        return this.end - this.start;
      },
      message() {
        return (typeof this.hinter === "function" ?
            this.hinter(this.value) : this.value);
      },
      trackStyle() {
        return {
          width: ((this.value - this.start) / this.length * 100) + "%"
        }
      }
    },
    methods: {
      handleClick(e) {
        if (this.disabled) {
          return;
        }
        this.handleChange({
          lastVal: this.value,
          delta: e.clientX / this.width * this.length - this.value
        });
      },
      handleChange({ lastVal, delta }) {
        if (lastVal + delta > this.sliderMin) {
          const stepVal = Math.round(delta / this.step) * this.step;
          const currVal = Math.min(lastVal + stepVal, this.sliderMax);
          this.value = currVal;
        }
      },
      handleRelease() {
        this.$emit('change', {value: this.value});
      }
    },
    created() {
      if (this.start >= this.end) {
        throw new Error(`${this.start} >= ${this.end}. Prop start shuold be less than prop end.`);
      }
      this.value = this.sliderMin;
    },
    mounted() {
      this.width = this.$refs.slider.offsetWidth;
    },
    components: {
      SliderButton
    }
  }
</script>