# vue-picker-mobile
一款操作简单的移动端列表选择器，支持单列、多列，联动、非联动，配有详细的Demo

## Demo
### 单列.gif
<img src='./src/assets/s1.gif' width="200px"/>

### 两列
#### 非联动&&&&联动
<img src='./src/assets/d1.gif' width="200px" hspace="20"/><img src='./src/assets/d2.gif' width="200px"/>


### 多列
#### 多列非联动&&&&联动&&时间列表
<img src='./src/assets/m1.gif' width="200px" hspace="20"/> <img src='./src/assets/m2.gif' width="200px"/><img src='./src/assets/d.gif' width="200px" hspace="20"/>

## Installation

#### NPM
Install the package

`npm install vue-picker-mobile --save`

```javascript
import VuePickerMobile from 'vue-picker-mobile'

export default {
  components: {
    VuePickerMobile,
  },
}
```
`<VuePickerMobile/>`


## Props/Options

### list

- Type: `Array`
- Default: `[]`

列表的数据源,不同类型的数据操作略有差别，使用时请参考github
  + [单列](https://github.com/xml00007/vue-picker-mobile/blob/master/src/data/single.js)
  + [两列非联动](https://github.com/xml00007/vue-picker-mobile/blob/master/src/data/double1.js)
  + [两列联动](https://github.com/xml00007/vue-picker-mobile/blob/master/src/data/double2.js)
  + [多列非联动](https://github.com/xml00007/vue-picker-mobile/blob/master/src/data/multiple1.js)
  + [多列联动](https://github.com/xml00007/vue-picker-mobile/blob/master/src/data/multiple2.js)
  + [日期](https://github.com/xml00007/vue-picker-mobile/blob/master/src/data/date.js)

### isShow

- Type: `Boolean` 
- Default: `false`

是否展示下拉列表

### defaultValue

- Type: `Array` 
- Default: `[]`

列表的默认滚动位置

### isMulti

- Type: `Boolean` 
- Default: `false`

列表是单列还是多列

### isRelate

- Type: `Boolean` 
- Default: `false`

列表是否联动

## Events
    
### onChange(res) 
当数据有变动时，均会触发该事件，res为[{}...{}],可根据自身需要获取展示结果，本demo中展示位
```javascript
onChange(res){
    let r = [];
    res.map(i => {r.push(i.label)});
    this.result = r.join('-');
    console.log('app-----res-----:', r.join('-'));
    }
```
  
  





