<template>
    <div class="group" @touchstart.stop.passive="_start($event)" @touchmove.stop.passive="_move($event)"
         @touchend.stop.passive="_end($event)"
         ref="group">
        <div class="group-mask"></div>
        <div class="group-indicator"></div>
        <div class="group-content" :style="styleObject" ref="content">
            <div v-for="(item,index) in items" :key="index" class="group-item"
                 :class="{'group-item_disabled':item.disabled}">
                {{ item.label}}
            </div>
        </div>
    </div>
</template>
<script>
    import * as util from './util';

    export default {
        name: 'group',
        props: {
            items: {
                type: Array,
            },
            defaultValue: {
                type: Number | String,
                default: null,
            },
        },
        data() {
            return {
                offset: 3,
                rowHeight: 34,
                bodyHeight: 7 * 34,
                $scrollable: null,
                translate: 0,
                time: .3,
                // 绑定滚动事件
                start: null,                                                  // 保存开始按下的位置
                end: null,                                               // 保存结束时的位置
                startTime: null,                                             // 开始触摸的时间
                points: [],                                        // 记录移动点
                col: 1,
                styleObject: {
                    transform: '',
                    transition: '',
                },
            };
        },
        mounted() {
            this.$scrollable = this.$refs['content'];
            this.col = parseInt(this.$refs['group'].dataset.col || 1);
            // 首次触发选中事件
            // 如果有缓存的选项，则用缓存的选项，否则使用中间值。
            let index = 0;
            const defaultValue = this.defaultValue;
            if (defaultValue !== null) {
                const values = this.items.map((item) => {
                    return item.value;
                });
                index = values.findIndex(i => i === this.defaultValue);
                index = index >= 0 ? index : util.getDefaultIndex(this.items);
                this.translate = (this.offset - index) * this.rowHeight;
            } else {
                index = util.getDefaultIndex(this.items);
                this.translate = util.getDefaultTranslate(this.offset, this.rowHeight,
                    this.items);
            }
            this.emitChange(this.items[index], index);
            this.setTranslate(this.translate);

            util.eventBus.$on('changeDefaultItem', (res) => {
                if (res.includes(this.col)) {
                    this.translate = this.offset * this.rowHeight;
                    this.setTranslate(this.translate);
                    this.$nextTick(() => {
                        this.emitChange(this.items[0], 0);
                    });
                }
            });
        },
        methods: {
            emitChange(arg1, arg2, arg3 = true) {
                this.$emit('onChange', this.col, arg1, arg2, arg3);
            },
            setTranslate(translate) {
                this.styleObject.transform = `translate3d(0, ${translate}px, 0)`;
            },
            setTransition(time) {
                this.styleObject.transition = `all ${time}s`;
            },
            stop(diff) {
                this.translate += diff;

                // 移动到最接近的那一行
                this.translate = Math.round(this.translate / this.rowHeight) * this.rowHeight;
                const max = util.getMax(this.offset, this.rowHeight);
                const min = util.getMin(this.offset, this.rowHeight,
                    this.items.length);
                // 不要超过最大值或者最小值
                if (this.translate > max) {
                    this.translate = max;
                }
                if (this.translate < min) {
                    this.translate = min;
                }

                // 如果是 disabled 的就跳过
                let index = this.offset - this.translate / this.rowHeight;
                while (!!this.items[index] && this.items[index].disabled) {
                    diff > 0 ? ++index : --index;
                }
                this.translate = (this.offset - index) * this.rowHeight;
                this.setTransition(.3);
                this.setTranslate(this.translate);

                // 触发选择事件
                this.emitChange(this.items[index], index, false);
            },
            _end(evt) {
                if (!this.start) return;
                /**
                 * 思路:
                 * 0. touchstart 记录按下的点和时间
                 * 1. touchmove 移动时记录前 40个经过的点和时间
                 * 2. touchend 松开手时, 记录该点和时间. 如果松开手时的时间, 距离上一次 move时的时间超过 100ms, 那么认为停止了, 不执行惯性滑动
                 *    如果间隔时间在 100ms 内, 查找 100ms 内最近的那个点, 和松开手时的那个点, 计算距离和时间差, 算出速度
                 *    速度乘以惯性滑动的时间, 例如 300ms, 计算出应该滑动的距离
                 */
                const endTime = new Date().getTime();
                const windowHeight = window.innerHeight;                    // 屏幕的高度
                const relativeY = windowHeight - (this.bodyHeight / 2);
                this.end = evt.changedTouches[0].pageY;

                // 如果上次时间距离松开手的时间超过 100ms, 则停止了, 没有惯性滑动
                if (endTime - this.startTime > 100) {
                    //如果end和start相差小于10，则视为
                    if (Math.abs(this.end - this.start) > 10) {
                        this.stop(this.end - this.start);
                    } else {
                        this.stop(relativeY - this.end);
                    }
                } else {
                    if (Math.abs(this.end - this.start) > 10) {
                        const endPos = this.points.length - 1;
                        let startPos = endPos;
                        for (let i = endPos; i > 0 && this.startTime - this.points[i].time < 100; i--) {
                            startPos = i;
                        }

                        if (startPos !== endPos) {
                            const ep = this.points[endPos];
                            const sp = this.points[startPos];
                            const t = ep.time - sp.time;
                            const s = ep.y - sp.y;
                            const v = s / t; // 出手时的速度
                            const diff = v * 150 + (this.end - this.start); // 滑行 150ms,这里直接影响“灵敏度”
                            this.stop(diff);
                        } else {
                            this.stop(0);
                        }
                    } else {
                        this.stop(relativeY - this.end);
                    }
                }

                this.start = null;
            },
            _start(evt) {
                this.start = evt.changedTouches[0].pageY;
                this.startTime = +new Date();
            },

            _move(evt) {
                this.end = evt.changedTouches[0].pageY;
                const diff = this.end - this.start;
                this.setTransition(0);
                this.setTranslate(this.translate + diff);
                this.startTime = +new Date();
                this.points.push({time: this.startTime, y: this.end});
                if (this.points.length > 40) {
                    this.points.shift();
                }
            },
        },
    };
</script>
<style scoped>
    .group {
        flex: 1;
        position: relative;
        height: 100%
    }

    .group-mask {
        top: 0;
        height: 100%;
        margin: 0 auto;
        background: linear-gradient(180deg, hsla(0, 0%, 100%, .95), hsla(0, 0%, 100%, .5)), linear-gradient(0deg, hsla(0, 0%, 100%, .95), hsla(0, 0%, 100%, .5));
        background-position: top, bottom;
        background-size: 100% 102px;
        background-repeat: no-repeat;
        transform: translateZ(0)
    }

    .group-indicator, .group-mask {
        position: absolute;
        left: 0;
        width: 100%;
        z-index: 3
    }

    .group-indicator {
        height: 34px;
        top: 102px
    }

    .group-indicator:before {
        top: 0;
        border-top: 1px solid #e5e5e5;
        transform-origin: 0 0;
        transform: scaleY(.5)
    }

    .group-indicator:after, .group-indicator:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        color: #e5e5e5
    }

    .group-indicator:after {
        bottom: 0;
        border-bottom: 1px solid #e5e5e5;
        transform-origin: 0 100%;
        transform: scaleY(.5)
    }

    .group-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%
    }

    .group-item {
        padding: 0;
        height: 34px;
        line-height: 34px;
        text-align: center;
        color: #000;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden
    }

    .group-item_disabled {
        color: #999
    }
</style>