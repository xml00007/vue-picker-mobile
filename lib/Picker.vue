<script src="./picker.js"></script>
<template>
    <div>
        <transition name="fade-mask">
            <div v-if="show" class="mask"></div>
        </transition>
        <transition name="fade">
            <div v-if="show" class="picker" :class="slide">
                <div class="picker-title">
                    <label class="action" @click="onClick('cancel')">取消</label>
                    <label class="action" @click="onClick('confirm')">确定</label>
                </div>
                <div class="picker-list">
                    <group :defaultValue="defaultValue[index]" @onChange="onChange" v-for="(items,index) in listData"
                           :data-col="index" :items="items"
                           :key="index"></group>
                </div>
            </div>
        </transition>
    </div>
</template>

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
        height: 238px;
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