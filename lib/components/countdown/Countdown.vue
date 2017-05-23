<template>
  <div :class="prefix">
    <slot></slot>
  </div>
</template>
<script>
  const prefix = "uck-countdown";

  export default {
    name: "Countdown",
    props: {
      interval: {
        type: Number,
        default: 1,
        validator(val) {
          return val >= 0.5 && val < 60;
        }
      },

      length: {
        type: Number,
        required: true,
        validator(val) {
          return val > 0 && Number.isInteger(val);
        }
      },

      control: {
        type: Number,
        required: true,
        validator(val) {
          return [0, 1, 2, 3].indexOf(val) !== -1;
        }
      }
    },
    data() {
      return {
        prefix,
        // 是否暂停中
        isPaused: false,
        // 缓存倒计时长度
        len: this.length,
        // 剩余倒计时次数
        remain: this.length,
        // setInterval标识
        flag: false
      }
    },
    watch: {
      control(val) {
        if (val >= 2) { // start and restart
          this.isPaused = false;

          if (val === 3) { // restart
            this.remain = this.len;
          }

          this.$emit('start', { remain: this.remain });

          if (typeof this.flag === "boolean") {
            this.flag = window.setInterval(() => {
              this.remain--;
            }, this.interval * 1000);
          }

        } else { // pause and stop
          this.isPaused = true;

          if (typeof this.flag !== "boolean") {
            window.clearInterval(this.flag);
            this.flag = false;
          }

          if (val === 0) {
            this.remain = 0;
            this.$emit('stop');
          } else {
            this.$emit('pause', { remain: this.remain });
          }

        }
      },
      remain(val, oldVal) {
        if (oldVal - val !== 1) {
          return;
        }
        this.$emit('tick', { remain: this.remain });

        if (this.remain <= 0) {
          if (typeof this.flag !== "boolean") {
            window.clearInterval(this.flag);
            this.flag = false;
          }
          this.$emit('timeout');
        }
      }
    }
  }
</script>
<style>
.uck-countdown {
  font-size: 25px;
}
</style>