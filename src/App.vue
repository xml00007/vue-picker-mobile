<template>
    <div id="app">
        <div class="btnList">
            <input type="button" value="单列" @click="onClick(1)">
            <input type="button" value="双列非联动" @click="onClick(2)">
            <input type="button" value="双列联动" @click="onClick(3)">
        </div>
        <div class="btnList">
            <input type="button" value="年月日联动" @click="onClick(4)">
            <input type="button" value="多列非联动" @click="onClick(5)">
            <input type="button" value="多列联动" @click="onClick(6)">
        </div>

        <Picker @onChange="onChange" :isMulti="isMulti1" :list="list1"
                :defaultValue="defaultValue1" :show.sync="show1"></Picker>
        <Picker @onChange="onChange" :isMulti="isMulti2" :list="list2"
                :defaultValue="defaultValue2" :show.sync="show2"></Picker>
        <Picker @onChange="onChange" :isMulti="isMulti3" :isRelate="isRelate3" :list="list3"
                :defaultValue="defaultValue3" :show.sync="show3"></Picker>
        <Picker @onChange="onChange" :isMulti="isMulti4" :isRelate="isRelate4" :list="list4"
                :defaultValue="defaultValue4" :show.sync="show4"></Picker>
        <Picker @onChange="onChange" :isMulti="isMulti5" :list="list5"
                :defaultValue="defaultValue5" :show.sync="show5"></Picker>
        <Picker @onChange="onChange" :isMulti="isMulti6" :isRelate="isRelate6" :list="list6"
                :defaultValue="defaultValue6" :show.sync="show6"></Picker>
    </div>
</template>

<script>
  import Picker from './components/Picker.vue';

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
        defaultValue1: [3],
        isMulti1: false,

        list2: double1,
        defaultValue2: ['3', 'A'],
        isMulti2: true,

        list3: double2,
        isRelate3: true,
        defaultValue3: ['grade2', 'class2'],
        isMulti3: true,

        list4: date,
        defaultValue4: [2000, 5, 7],
        isMulti4: true,
        isRelate4:true,

        list5: multiple1,
        defaultValue5: ['3', 'C', 'B', 'A'],
        isMulti5: true,
        isRelate5: true,

        list6: multiple2,
        defaultValue6: [0, 1, 1, 0],
        isMulti6: true,
        isRelate6: true,
      };
    },
    mounted() {
    },
    methods: {
      onChange(res) {
        let r = [];
        res.map(i => {
          r.push(i.label);
        });
        console.log('app-----res-----:', r.join('-'));
      },
      onClick(num) {
        const prop = 'show' + num;
        this[prop] = !this[prop];
      },
    },
    components: {
      Picker,
    },
  };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .btnList {
        display: flex;
        flex: 1;
        justify-content: center;
        font-size: 40px;
        margin-top: 20px;
    }

    .btnList input {
        height: 20px;
        border: 1px;
        border-radius: 2px;
        margin-right: 30px;
    }

    .btnList input:last-child {
        margin-right: 0;
    }
</style>
