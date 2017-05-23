<script>
  const prefix = "uck-tabs";

  import TabsNav from "./TabsNav.vue";
  import TabsItem from "./TabsItem.vue";
  import { animateScrollTo } from "../../util"

  export default {
    name: "Tabs",
    props: {
      type: {
        type: String,
        default: "vertical",
        validator(val) {
          return ["vertical", "horizontal"].indexOf(val) !== -1;
        }
      },

      seq: {
        type: Number,
        default: 0,
        validator(val) {
          return val >= 0;
        }
      }
    },
    data() {
      return {
        prefix,
        // 当前活动的tab顺序
        currSeq: this.seq,
        // 按顺序存储当前tabs, 因为$children不保证顺序-_-
        tabs: [],
        // 按顺序存储当前tabs的scrollTop
        tops: [],
        // tabs占位符，放置id，用于在tabs完全挂载完成前计算出活动的tab ID
        ids: []
      }
    },
    computed: {
      // 当前活动的tab标识，与currSeq区分开
      currIndex() {
        return this.ids[this.currSeq];
      }
    },
    methods: {
      // 新增一个tab，并保存其内容区相对的offsetTop
      // 这么做是为了保证tabs有序
      addTab(item) {
        const index = this.$slots.default.indexOf(item.$vnode);
        const delta = item.$refs.item.offsetTop - this.$refs.content.offsetTop;
        // 显式触发更新
        this.tabs.splice(index, 0, item);
        this.tops.splice(index, 0, delta);
      },
      // 在tabs数据创建完成前插入id到this.ids中，方便TabsItem判断自身是否活动
      addId(id) {
        this.ids.push(id);
      },
      handleShift({ to }) {
        if (this.type === "vertical") {
          this.currSeq = parseInt(to);
          animateScrollTo(this.$refs.content, this.tops[to]);
        } else if (this.type === "horizontal") {
          this.currSeq = parseInt(to);
        }
      },
      handleScroll() {
        const top = this.$refs.content.scrollTop;
        const revert = this.tops.slice().reverse().findIndex(val => {
          return top >= val;
        });
        // 注意revert == -1的边界情况
        const seq = (revert === -1 ? 0 : this.tops.length - 1 - revert);
        this.currSeq = seq;
      }
    },
    mounted() {
      if (this.type === "horizontal") {
        return;
      }
      if (this.seq !== 0) {
        this.handleShift({
          to: this.seq
        });
      }
      this.$refs.content.addEventListener("scroll", this.handleScroll);
    },
    render() {
      const navData = {
        props:{
          tabs: this.tabs,
          index: this.currSeq
        },
        on:{
          shift: this.handleShift
        }
      };

      return (
        <div class="uck-tabs">
          <TabsNav { ...navData }></TabsNav>
          <div
            class="uck-tabs-content"
            ref="content"
          >
            {this.$slots.default}
          </div>
        </div>
      );
    }
  }
</script>
<style>
.uck-tabs {
  padding: 10px;
}
.uck-tabs-content {
  height: 60px;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  line-height: 2em;
  overflow: auto;
}
</style>