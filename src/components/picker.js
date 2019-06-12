import group from './group';
import * as util from './util';

export default {
  name: 'picker',
  props: {
    defaultValue: {
      type: Array,
    },
    isRelate: {
      type: Boolean,
      default: false,
    },
    isMulti: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: [],
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mask: false,
      slide: false,
      lineTemp: {},
      listData: [],
      res: [],
      def: [],
    };
  },
  mounted() {
    // 判断是单列
    if (!this.isMulti) {
      this.listData = [this.list];
    }
    // 判断是多列非联动
    else if (this.isMulti && !this.isRelate) {
      this.listData = this.list;
    }
    // 判断多列且联动
    else {
      const def = this.defaultValue.slice();
      this.listData = [this.list].concat(
          util.getDefault(this.list, def));
    }
  },
  methods: {
    onChange(col, item, index, isInit) {
      this.res[col] = {
        label: item.label,
        value: item.value,
      };
      // 联动数据并且是非首次渲染的数据
      if (this.isMulti && this.isRelate && !isInit) {
        const emit = [];
        const def = this.defaultValue.map((i, index) => {
          if (index > col) {
            emit.push(index);
          }
          return index > col ? 0 : i;
        });
        // 获取数组的前半部分
        const listBefore = this.listData.slice(0, col + 1);

        // 获取数组的后半部分
        let listAfter = [];
        if (item.children && col + 1 < this.listData.length) {
          listAfter = [item.children].concat(
              util.getDefault(item.children, def));
        }

        this.listData = listBefore.concat(listAfter);
        util.eventBus.$emit('changeDefaultItem', emit);
      }
      // 最后一列change 或者是通过滑动的  则触发onChange事件
      if (this.isRelate) {
        if ((this.listData.length === col + 1)) {
          this.$emit('onChange', this.res);
        }
      } else {
        if ((this.listData.length === col + 1) || !isInit) {
          this.$emit('onChange', this.res);
        }
      }
    },
    onClick(type) {
      if(type==='confirm'){
        this.$emit('onChange', this.res);
      }
      this.$emit('update:show', false);
    },
  },
  components: {
    group,
  },
};
