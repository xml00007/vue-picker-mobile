<template>
    <div id="app">
        <div class="bg">
            <p>vue-picker-mobile</p>
        </div>
        <div class="btnList">
            <input type="button" value="单列" :class="{choose:show1}" @click="onClick(1)">
            <input type="button" value="双列非联动" :class="{choose:show2}" @click="onClick(2)">
            <input type="button" value="双列联动" :class="{choose:show3}" @click="onClick(3)">
        </div>
        <div class="btnList">
            <input type="button" value="年月日联动" :class="{choose:show4}" @click="onClick(4)">
            <input type="button" value="多列非联动" :class="{choose:show5}" @click="onClick(5)">
            <input type="button" value="多列联动" :class="{choose:show6}" @click="onClick(6)">
        </div>

        <Picker @onChange="onChange" :height="40" :className="'redColor'" :defaultValue="defaultValue1"  :isMulti="isMulti1" :list="list1" :show.sync="show1"></Picker>
        <Picker @onChange="onChange" :isMulti="isMulti2" :list="list2" :defaultValue="defaultValue2" :show.sync="show2"></Picker>
        <Picker @onChange="onChange" :isMulti="isMulti3" :isRelate="isRelate3" :list="list3" :defaultValue="defaultValue3"  :show.sync="show3"></Picker>
        <Picker @onChange="onChange" :isMulti="isMulti4" :isRelate="isRelate4" :list="list4" :defaultValue="defaultValue4" :show.sync="show4"></Picker>
        <Picker @onChange="onChange" :isMulti="isMulti5" :list="list5" :defaultValue="defaultValue5" :show.sync="show5"></Picker>
        <Picker @onChange="onChange" :isMulti="isMulti6" :isRelate="isRelate6" :list="list6" :defaultValue="defaultValue6" :show.sync="show6"></Picker>

        <div class="tips">
            <p>默认值: {{defaultValue}}</p>
            <p>当前选中值:{{result}}</p>
        </div>
    </div>
</template>

<script>
    import Picker from '../publish';
    import single from './data/single';
    import double1 from './data/double1';
    import double2 from './data/double2';
    import date from './data/date';
    import multiple1 from './data/multiple1';
    import multiple2 from './data/multiple2';

    export default {
        name: 'app',
        data() {
            return {
                show1: false,
                show2: false,
                show3: false,
                show4: false,
                show5: false,
                show6: false,

                list1: single,
                defaultValue1: '3',
                isMulti1: false,

                list2: double1,
                defaultValue2: ['3', 'A'],
                isMulti2: true,

                list3: double2,
                isRelate3: true,
                defaultValue3: 'grade2',
                isMulti3: true,

                list4: date,
                defaultValue4: [2000, 5, 7],
                isMulti4: true,
                isRelate4: true,

                list5: multiple1,
                defaultValue5: '2',
                isMulti5: true,
                isRelate5: true,

                list6: multiple2,
                defaultValue6: [1,0,1],
                isMulti6: true,
                isRelate6: true,

                result: '',
                defaultValue: null
            };
        },
        methods: {
            onChange(res) {
                let r = [];
                res.map(i => {
                    r.push(i.label);
                });
                this.result = r.join('-');
                console.log('app-----res-----:', r.join('-'));
            },
            onClick(num) {
                this.defaultValue = this['defaultValue' + num];
                const prop = 'show' + num;
                this[prop] = !this[prop];
            },
        },
        components: {
            Picker:Picker,
        },
    };
</script>

<style>
    @import "./assets/reset.css";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .bg {
        width: 100%;
        height: 100px;
        line-height: 100px;
        background: black;
        color: #228DFF;
        font-family: Iceland;
        font-size: 2em;
    }

    .bg > p {
        /*animation: blue 1.5s ease-in-out infinite alternate;*/
        text-shadow: 0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #fff,
        0 0 20px #228DFF,
        0 0 35px #228DFF,
        0 0 40px #228DFF,
        0 0 50px #228DFF,
        0 0 75px #228DFF;
    }

    .btnList {
        display: inline-flex;
        flex: 1;
        justify-content: space-around;
        margin-top: 20px;
    }

    .btnList input {
        height: 30px;
        /*border: 1px;*/
        border: none;
        outline: none;
        flex: 1;
        font-size: 16px;
        border-radius: 2px;
        box-shadow: none;
        margin-right: 15px;
    }

    .btnList input.choose {
        color: #228DFF;
        box-shadow: 5px 5px 5px #228DFF;
    }

    .btnList input:last-child {
        margin-right: 0;
    }

    .tips {
        margin-top: 16px;
    }

    .tips p {
        margin-bottom: 16px;
    }

    @keyframes blue {
        from {
            text-shadow: 0 0 10px #fff,
            0 0 20px #fff,
            0 0 30px #fff,
            0 0 40px #228DFF,
            0 0 70px #228DFF,
            0 0 80px #228DFF,
            0 0 100px #228DFF,
            0 0 150px #228DFF;
        }
        to {
            text-shadow: 0 0 5px #fff,
            0 0 10px #fff,
            0 0 15px #fff,
            0 0 20px #228DFF,
            0 0 35px #228DFF,
            0 0 40px #228DFF,
            0 0 50px #228DFF,
            0 0 75px #228DFF;
        }
    }

    .redColor {
        color: red;
        font-family: "PingFang SC";
        font-weight: normal;
        /*font-size:18px;*/
        /*line-height: 40px;*/
        /*height: 40px;*/
    }
</style>
