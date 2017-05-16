<template>
  <div
    :class="prefix"
    v-show="show"
    ref="item"
  >
    <slot></slot>
  </div>
</template>
<script>
  const prefix = "uck-tabs-item";

  export default {
    name: "TabsItem",
    props: {
      index: {
        type: [Number, String],
        required: true
      }
    },
    data() {
      return {
        prefix,
        // 用于初始化show状态
        isInit: true
      }
    },
    computed: {
      show() {
        if (this.isInit) {
          this.$parent.addId(this.index); // 该行仅在创建此组件过程调用
          this.isInit = false;
        }
        return this.$parent.type === "vertical" || this.$parent.currIndex === this.index;
      }
    },
    mounted() {
      this.$parent.addTab(this);
    }
  }
</script>
