<template>
  <a
    :href="href"
    :class="prefix"
    :target="_blank ? '_blank' : ''"
    :data-rlog="rlog"
    @click="handleClick"
  >
    <slot></slot>
  </a>
</template>
<script>
  const prefix = "uck-link";

  export default {
    name: "Link",
    props: {
      to: {
        type: String,
        required: true
      },
      router: {
        type: Object,
        default: null
      },
      onClick: {
        type: Function
      },
      rlog: {
        type: String
      },
      _blank: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        prefix
      }
    },
    methods: {
      handleClick(e) {
        if (typeof this.onClick === "function") {
          this.onClick(e);
        }
        if (!this.isLeftClick(e) || this.isCombined(e)) {
          return;
        }
        if (e.defaultPrevented) {
          return;
        }

        if (this.router && typeof this.router.push === "function") {
          e.preventDefault();
          this.router.push(this.to);
        }

      },
      // 是否左键点击
      isLeftClick(e) {
        return e.button === 0;
      },
      // 是否结合了功能键
      isCombined(e) {
        return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
      },

      // vendor相关
      getParameter(name) {
        const r = new RegExp(`(\\?|#|&)${name}=([^&#]*)(&|#|$)`);
        const m = window.location.href.match(r);
        return decodeURIComponent(!m ? '' : m[2]);
      },
      // vendor相关
      transferLink(link) {
        if (link.indexOf('vendor') === -1) {
          if (link.indexOf('?') === -1) {
            return `${link}?vendor=${this.getParameter('vendor')}`;
            // eslint-disable-next-line
          } else {
            return `${link}&vendor=${this.getParameter('vendor')}`;
          }
        }
        return link;
      }
    },
    computed: {
      href() {
        return this.getParameter('vendor') === '' ?
            this.to : this.transferLink(this.to);
      }
    }
  }
</script>