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
    components: {
      Icon
    }
  }
</script>