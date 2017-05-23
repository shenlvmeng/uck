<template>
  <div
    class="uck-slider-btn"
    :class="classes"
    :style="style"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @mousedown="handleDown($event)"
    @touchstart="handleTouch($event)"
    ref="button"
  >
    <slot></slot>
  </div>
</template>

<script>
  const prefix = "uck-slider-btn";

  export default {
    name: "SliderButton",
    props:{
      value: {
        type: Number,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      start: {
        type: Number,
        required: true
      },
      len: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        prefix,
        btn: null,
        down: false,
        hover: false,
        lastX: (this.value - this.start) / this.len * this.width,
        lastVal: this.value
      }
    },
    methods: {
      handleEnter() {
        if (this.disabled) {
          return false;
        }
        this.hover = true;
      },
      handleLeave() {
        this.hover = false;
      },
      handleDown(e) {
        if (this.disabled) {
          return false;
        }
        this.down = true;
        this.lastVal = this.value;
        this.lastX = e.screenX;
        document.body.addEventListener('mousemove', this.handleDrag);

      },
      handleTouch(e) {
        if (this.disabled) {
          return false;
        }
        this.down = true;
        this.lastVal = this.value;
        this.lastX = e.targetTouches[0].screenX;
        document.body.addEventListener('touchmove', this.handleDrag);

      },
      handleDrag(e) {
        if (this.disabled) {
          return false;
        }
        const x = e.screenX || e.changedTouches[0].screenX;
        const delta = this.len * (x - this.lastX) / this.width;
        this.$emit('change', {
          lastVal: this.lastVal,
          delta
        });
      },
      clear() {
        this.down = false;
        document.body.removeEventListener('mousemove', this.handleDrag);
        document.body.removeEventListener('touchmove', this.handleDrag);
        this.$emit('release');
      }
    },
    computed: {
      classes() {
        return {
          hover: this.hover,
          down: this.down,
          disabled: this.disabled
        }
      },
      style() {
        return {
          left: (this.value - this.start) / this.len * 100 + "%"
        }
      }
    },
    mounted() {
      this.btn = this.$refs.button;
      this.btn.addEventListener('mouseup', this.clear);
      this.btn.addEventListener('touchend', this.clear);
    }
  }
</script>
<style>
.uck-slider-btn {
  position: absolute;
  top: -3px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #1cc16d;
  transition: all .2s;
}
.uck-slider-btn.hover,
.uck-slider-btn.down {
  background-color: #0aa05b;
  top: -5px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
}
.uck-slider-btn.hover {
  cursor: -webkit-grab;
}
.uck-slider-btn.down {
  cursor: -webkit-grabbing;
}
.uck-slider-btn.disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
.uck-slider-btn:hover .uck-slider-hint{
  display: block;
}
</style>