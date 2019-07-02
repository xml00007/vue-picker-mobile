<template>
    <div>
        <transition name="fade-mask">
            <div v-if="show" class="mask"></div>
        </transition>
        <transition name="fade">
            <div v-if="show" class="picker">
                <div class="picker-title">
                    <label class="action" @click="onClick('cancel')">取消</label>
                    <label class="action" @click="onClick('confirm')">确定</label>
                </div>
                <div class="picker-list">
                    <group :defaultValue="defaultVal[index]" @onChange="onChange" v-for="(items,index) in listData"
                           :data-col="index" :items="items"
                           :key="index"></group>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import group from './Group';
    import * as util from './util';

    export default {
        name: 'Picker',
        provide() {
            return {
                height: this.height,
                row: 7,  // 暂时不对外暴露，修改项较多
                className: this.className
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false,
            },
            list: {
                type: Array,
                default: [],
            },
            defaultValue: {
                type: [String,Number, Array],
            },
            isMulti: {
                type: Boolean,
                default: false,
            },
            isRelate: {
                type: Boolean,
                default: false,
            },
            height: {
                type: Number,
                default: 34,
            },
            className: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                lineTemp: {},
                listData: [],
                res: [],
                def: [],
                defaultVal: []
            };
        },
        created() {
            // 计算真正的length
            let length = 1;
            if (!this.isMulti) {

            } else if (this.isMulti && !this.isRelate) {
                length = this.list.length;
            } else {
                length = util.getDepth(this.list[0])
            }
            if (this.defaultValue && Array.isArray(this.defaultValue) && this.defaultValue.length === length) {
                this.defaultVal = this.defaultValue;
            } else if (!this.defaultValue) {
                // 默认都是一项
                this.defaultVal = new Array(length).fill(0)
            } else if (!Array.isArray(this.defaultValue)) {
                const def = new Array(length).fill(0);
                def.splice(0, 1, this.defaultValue);
                this.defaultVal = def
            } else if (this.defaultValue.length < length) {
                this.defaultVal = [].concat(this.defaultValue, new Array(length - this.defaultValue.length).fill(0))
            }
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
                const def = this.defaultVal.slice();
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
                    const def = this.defaultVal.map((i, index) => {
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
                if (type === 'confirm') {
                    this.$emit('onChange', this.res, true);
                }
                this.$emit('update:show', false);
            },
        },
        computed: {},
        components: {
            group,
        },
    };

</script>

<style scoped>
    .mask {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .3);
    }

    .picker {
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        z-index: 5000;
    }

    .picker-title {
        display: flex;
        padding: 9px 15px;
        background-color: #fff;
        position: relative;
        text-align: center;
        align-items: stretch;
        font-size: 17px;
    }

    .picker-title:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #e5e5e5;
        color: #e5e5e5;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5)
    }

    .picker-title .action {
        flex: 1;
        color: #1aad19;
    }

    .action:first-child {
        text-align: left;
        color: #888
    }

    .action:last-child {
        text-align: right
    }

    .picker-list {
        display: flex;
        position: relative;
        background-color: #fff;
        overflow: hidden
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }

    .fade-enter, .fade-leave-to {
        transform: translateY(100%);
        opacity: 0;
    }

    .fade-mask-enter-active, .fade-mask-leave-active {
        transition: all .5s;
    }

    .fade-mask-enter, .fade-mask-leave-to {
        background: rgba(0, 0, 0, 0);
    }
</style>