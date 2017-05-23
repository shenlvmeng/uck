<template>
  <div :class="`${prefix}-container`">
    <a
      href="javascript:;"
      :class="className"
      @click.stop="handleClick"
    >
      <slot name="trigger">
        Maybe you forget 'slot="trigger"'.
      </slot>
    </a>
    <div
      class="uck-popup"
      :class="{hidden: this.isHidden}"
      @click="handleClick"
    >
      <div
        :class="`${prefix}-box`"
        @click="stop($event)"
      >
        <slot name="close">
          <div
            :class="`${prefix}-close`"
            @click.stop="handleClick"
          >
            <Icon
              type="times"
              color="#eee"
            ></Icon>
          </div>
        </slot>
        <slot name="content">
          This is an example popup message.
          Maybe you forget 'slot="content"'
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  const prefix = "uck-popup";

  import Icon from '../icon';
  export default {
    name: "Popup",
    props: {
      className: {
        type: String
      },

      hidden: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        prefix,
        isHidden: this.hidden
      }
    },
    methods: {
      handleClick() {
        this.isHidden = !this.isHidden;
        this.$emit('click', {hidden: this.isHidden});
      },
      stop(e) {
        e.stopPropagation();
      }
    },
    watch: {
      hidden(val) {
        this.isHidden = val;
      }
    },
    components: {
      Icon
    }
  }
</script>
<style>
.uck-popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
}
.uck-popup-container .hidden {
  display: none;
}
.uck-popup-box {
  display: block;
  position: absolute;
  z-index: 100;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background-color: #fff;
}
.uck-popup-close {
  position: absolute;
  top: -20px;
  right: -20px;
  cursor: pointer;
}
</style>