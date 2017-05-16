<script>
  const prefix = "uck-tabs-nav";

  export default {
    props: {
      tabs: Array,
      index: Number
    },
    data() {
      name: "TabsNav"
      return {
        prefix,
        // 当前活动选项卡id
        currIndex: this.index,
        // 当前tab的宽度
        itemWidth: 0
      }
    },
    methods: {
      handleClick(e) {
        // xxx: 这可能会是未来的坑。
        // 需要绑定点击事件到有id的DIV上
        const id = e.target.parentNode.id || e.target.id;
        this.$emit("shift", { to: id });
        this.currIndex = id;
      }
    },
    watch: {
      index(val) {
        this.currIndex = val;
      }
    },
    render() {
      const tabContent = this.tabs.map((tab, index) => {
        return (
          <div
            id={index}
            key={index}
            class={{"uck-tabs-nav-tab": true, active: this.index === index}}
            onClick={this.handleClick}
          >
            {tab.$slots.tab}
          </div>
        );
      });

      return (
        <div
          class={prefix}
        >
          {tabContent}
        </div>
      );
    }
  }
</script>