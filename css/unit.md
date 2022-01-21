### 相对单位

> 相对单位就是相对于一个参照物的长宽，CSS相对单位主要分为两大类。

- 字体相对单位（em、rem、ex、ch），它们是根据 `font-size` 来计算的。
- 视口相对单位（vw、vh、vmax、vmin），它们是根据视口大小来决定的。

1. em
    - em 是相对于父级的字体大小来计算的，要求自身没有设置 `font-size`。
    - 父元素 `font-size: 20px` 子元素 1em 就相当于 `20px`。
    - 同时如果 dom 元素嵌套较深同时又都设置了 em 计算量较大，复杂度较高。

2. rem
    - rem 是依据根元素 `html` 的字体大小计算。
    - 通常根据浏览器设置缩放时，使用 rem 计算。

3. ex 和 ch
    - 它们的大小取决于元素的 `font-size` 和 `font-family` 属性。
    - ex 是指所用字体中小写字母的高度。
    - ch 是基于数字 0 的宽度计算的，在设置容器的宽度时很有用，比如一个容器想要显示指定个数的字符串时，就可以使用这个单位。

4. vw、vh、vmax、vmin
    - vw 视口宽度百分比。
    - vh 视口高度百分比。
    - vmax 1 相当于视口的百分之1，如果视口高度是 1200px，那么 1vmax 就等于 12px。
    - vmin 最小值。

---

### 绝对单位

> 绝对单位是一个固定的物理值，它的大小取决于屏幕的 DPI

1. px
    - Pixels 通常被称为 css 像素。

2. pt 和 pc
    - Point 输出印刷产品，可以考虑使用 pt。
    - Picas 派卡也属于印刷术语，1派卡 = 16px。

3. cm
    - Centimeters 表示厘米，它和 px 换算关系 1cm = 37.8px。

4. mm
    - Millimeters 表示毫米，它和 px 换算关系 1mm = 3.78px。

5. in
    - Inches 表示英寸，它和 px 的换算关系 1in = 96px。

---

### 时间单位

> 分为两种秒 s 和毫秒 ms，主要应用于过渡和动画中，定义持续时间和延迟时间

```css
a[href] {
 transition-duration: 2.5s;
}

a[href] {
 transition-delay: 2500s;
}
```

---

### 分辨率单位

> 有三种 dpi、dpcm、dppx，主要用来做媒体查询

```
1dppx = 96dpi
1dpi ≈ 0.39dpcm
1dpcm ≈ 2.54dpi
```

1. dpi
    - dots per inch 表示每英寸包含的点的数量，普通屏幕通常包含 72 或 96 个点，大于 192dpi 的屏幕被称为高分屏。

2. dpcm
    - dots per centimeter，表示每厘米包含的点的数量。

3. dppx
    - dots per pixel，表示每像素（px）包含点的数量。

---

### 角度单位

> 有四种 deg、grad、rad、turn，应用于元素的旋转，依赖 transform 属性中的 rotate() 、rotate3d、 skew() 等方法。

```
90deg = 100grad = 0.25turn ≈ 1.570796326794897rad
```

1. deg
    - Degress 表示度，一个圆总共360度。

```css
transform: rotate(2deg);
```

2. grad
    - Gradians 表示梯度，一个圆总共400梯度。

```css
transform: rotate(2grad);
```

3. rad
    - Radians 表示弧度，一个圆总共2π弧度。

```css
transform: rotate(2rad);
```

4. turn
    - Turns 表示圈（转），一个圆总共一圈（转）。

```css
transform:rotate(.5turn);
```

---

### 百分比单位

1. 盒模型中的百分比单位
    - width、max-width、min-width，相对于包含块的 width 进行计算。
    - height、max-height、min-height，相对于包含块的 height 进行计算。
    - padding、margin，水平方向相对于包含块的 width，垂直方向相对于包含块 height。

2. 文本中的百分比单位
    - font-size，根据父元素的 font-size 进行计算。
    - line-height，根据font-size进行计算。
    - vertical-align，根据line-height进行计算。
    - text-indent，如果是水平的按照 width 计算，垂直则按 height。

3. 定位中的百分比单位
    - static、relative，包含块一般是父级容器。
    - absolute，包含块则是离它最近的 position 为 absolute、relative、fixed 的祖先元素。
    - fixed，包含块是视口。

4. 变换中的百分比
    - translateX() 根据容器的 width 计算。
    - translateY() 根据容器的 height 计算。
    - translateZ() 不支持百分比单位。

---