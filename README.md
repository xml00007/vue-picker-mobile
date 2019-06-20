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

列表的数据源

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

### isShow

- Type: `Boolean` 
- Default: `false`

是否展示下拉列表




