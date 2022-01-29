### flex

> 弹性盒子布局，常用属性 flex、inline-flex。

1. 容器属性
    - `flex-direction` 设置主轴交叉轴方向。
        - `row*` 主轴在水平方向，从左到右排列。
        - `row-reverse` 主轴在水平方向，起点在右边。
        - `column` 主轴在垂直方向，起点在上。
        - `column-reverse` 主轴在垂直方向，起点在下。
    - `flex-wrap` 项目是否换行
        - `nowrap*` 不换行。
        - `wrap` 换行，第一行在上面。
        - `wrap-reverse` 换行，第一行在下面。
    - `flex-flow` 简写
        - `flex-direction` | `flex-wrap`
    - `justify-content` 项目在主轴上的对齐方式
        - `flex-start*` 与主轴起点对齐
        - `flex-end` 与主轴终点对齐
        - `center` 项目居中
        - `space-between` 两端对齐，项目之间距离相等
        - `space-around` 两侧间隔相等，空间包含元素
    - `align-item` 项目在交叉轴上的对齐方式
        - `stretch*` 项目未设置高度或者 `auto` 默认撑开整个容器高度
        - `baseline` 项目第一行文字基线对齐
        - `center` 居中对齐
        - `flex-end` 与交叉轴终点对齐
        - `flex-start` 与交叉轴的起点对齐
    - `align-content` 设置项目在交叉轴上的整体项目的垂直对齐方式
        - 属性与 `justify-content` 一致

2. 项目属性
    - `order`
        - 项目排列顺序，默认为0，按顺序排列。
    - `flex-grow`
        - 项目放大比例，默认为0，如果所有项目都为1平分空间，按比例划分。
    - `flex-shrink`
        - 项目缩放比例，默认为1，当空间不足时，项目自动按比例缩小。
    - `flex-basis`
        - 项目占据主轴空间大小，默认为`auto`，和设置宽高一样。
    - `flex`
        - 简写属性 `auto | none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
    - `align-self`
        - 单个项目覆盖 `align-items` 属性，属性值一样多加一个 `auto`。

---
