### display

> 用来表示元素的展示形式，常见的属性值：block、inline、inline-block、flex、grid、none、inherit。

1. 块级元素
    - 独占一行，前后具有换行符。
    - 没有设置宽度情况下，默认由内容撑开。
    - 可通过设置宽高、内外边距等盒模型属性改变。
    - 块级元素可以包含块级元素和行内元素。
    - 常见的块级元素有：`div h1~h6 p ul ol dl table form address section footer header nav` 等。

2. 行内元素
    - 不会独占一行，设置宽高不起作用，默认由内容撑开
    - 设置内外边距只对左右起作用。
    - 行内元素通常情况下不可以包含块级元素。
    - 常见的行内元素有：`a b strong label input span img i em`

3. 可替换元素
    - 可以设置宽高，具有内在尺寸。
    - 常见的内在元素有：`iframe video img input button textarea select`

---

### position

> 定位属性，决定元素在文档流中的位置展示

1. relative
    - 相对于元素自身正常位置。

2. absolute
    - 相对于除 `static` 以外的最近的包含块进行定位，如果是子绝父不相则是初始包含块。
    - 脱离文档流，使行内元素设置宽高起作用

3. fixed
    - 相对于屏幕的视口。
    - 脱离文档流，使行内元素设置宽高起作用

4. sticky
    - 依赖于用户的滚动行为，最初已 `relative` 占位，当页面超出目标区域以 `fixed` 进行定位。

5. static
    - 以正常文档流在页面中展示。

6. inherit
    - 继承父元素的 `position` 值。

---

### float

> 浮动属性，标识元素向左向右贴靠

1. left、right
    - 脱离文档流。
    - 块级元素会忽略浮动元素，行内元素和文本对它进行环绕。
    - 父元素不设置宽高，父元素默认会由子元素撑开，当子元素设置浮动，子元素会溢出父元素外，造成高度塌陷。

---
