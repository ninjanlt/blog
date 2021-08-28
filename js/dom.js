/**
 * 所有节点都具备
 * parentNode，
 * childNodes，
 * firstChild，
 * lastChild，
 * previousSibling，
 * nextSibling，
 * nodeValue
 * 
 * 元素节点具备的属性
 * parentElement，
 * children，
 * firstElementChild，
 * lastElementChild，
 * previousElementSibling，
 * nextElementSibling
 * 
 */

// 通过 dom 元素获取节点的方法
document.querySelectAll('*');
document.getElementById('id');
document.getElementsByName('name')
document.getElementsByTagName('tag or *'); // 返回的是一个数组
document.getElementsByClassName('class'); // 数组
document.querySelector('CSS-selector');
document.querySelectorAll('CSS-selector'); // 返回的是一个数组

/**
 * dom 特性
 * 元素节点 nodeType 1
 * 属性节点 nodeType 2
 * 文本节点 nodeType 3
 * 注释节点 nodeType 8
 * 文档节点 nodeType 9
 */

// dom 节点操作属性方法
elem.hasAttribute(name) // 检查是否存在这个特性
elem.getAttribute(name) // 获取这个特性值
elem.setAttribute(name, value) // 设置这个特性值
elem.removeAttribute(name) // 移除这个特性
elem.attributes // 所有特性的集合

// 点语法无法操作元素的自定义属性，只能操作原有属性
<div data-widget-name="menu"></div>
let elem = document.querrySelector('[data-widget-name]')
console.log(elem.dataset.widgetName)

// dom 节点的创建
const el = document.createElement('div'); // 创建元素节点
const txt = document.createTextNode('i am student'); // 创建文本节点
const attr = document.createAttribute('title'); // 创建属性节点
attr.value = "content";

// dom 添加删除节点的方法
ulNode.appendChild(liNode) // 追加节点，且不支持字符串
ulNode.insertBefore(liNew,liOld) // 插入节点
ulNode.replaceChild(liNew,liOld) // 替换节点
ulNode.remove(liOld) // 删除节点（pc端，ie不支持）
// 新生代方式
el.append
el.prepend
el.before
el.after
el.replaceWith

// 样式类名 className替换单个类名，classList添加和删除类名
elem.classList.add('class')
elem.classList.remove('class')
elem.classList.toggle('class') // 如果类名不存在就添加类，反之删除
elem.classList.contains('class') // 检查类名是否存在，返回 boolean


// 文档碎片，批量一次性添加 dom 节点
function getListContent() {
    let result = [];
    for(let i=1; i<=3; i++) {
      let li = document.createElement('li');
      li.append(i);
      result.push(li);
    }
    return result;
  }
  
ul.append(...getListContent()); // append + "..." operator = friends!

