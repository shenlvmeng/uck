<template>
  <i
    :class="classes"
    :style="style"
    :aria-hidden="aria"></i>
</template>

<script>
  export default {
    name: "Icon",
    props: {
      type: {
        type: String,
        required: true
      },
      color: String,
      size: Number,
      aria: Boolean
    },
    computed: {
      classes () {
        return `fa fa-${this.type}`
      },
      style () {
        let styles = {};

        if (this.size) {
          styles['font-size'] = `${this.size}px`;
        }

        if (this.color) {
          styles.color = this.color;
        }
      }
    }
  }
</script>