slider 滑桿功能
=========================
### 演示
[線上觀看](http://virtools.github.io/reactjs_slider/v1/index.html)
### 設置
|設置|默認值|描述|
|---|---|---|
|rate|`0`|滑動的比例，範圍(0 ~ 1)|
|length|`200`|滑桿長度|
|outRadius|`20`|滑桿按鈕半徑大小及外線半徑大小|
|inRadius|`10`|滑桿內線半徑大小|
|enable|`true`|啟動,值(true或false)|
### 默認風格
該組件會自動嵌入了一些必要的風格。
```css
.Slider{
    float: left;
    position: relative;
    display: block;
    -webkit-user-select:none;
}
.Slider > .Button{
    position: absolute;    
    display:block;
    background-color: rgb(90, 192, 255);
    transition: left .5s ease-out,background-color .3s ease-out;
}
.Slider > .Button:hover,.Slider > .Button.active{
    background-color: rgb(114, 201, 255);
}
.Slider > .RateBg{
    position: absolute; 
    display: block;
    background-color: #e8e8e8;
    transition: width .5s ease-out,background-color .5s ease-out;
}
.Slider > .Rate{
    position: absolute; 
    display: block;
    background-color: #06588b;
    transition: width .5s ease-out,background-color .5s ease-out;
}
.Slider.disable > .Button{
    background-color: #717171;
}
.Slider.disable > .Rate{
    background-color: #3b3b3b;
}
.Slider.disable > .RateBg{
    background-color: #3b3b3b;
}
```
### 設定參考
```javascript
<Slider rate = {0} length = {400} outRadius = {15} inRadius = {5} enable = {ture}/>
```
### 許可

MIT
