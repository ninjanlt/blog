/**
 * <HTML5 新增前端存储方案>
 * localStorage 是持久化的本地存储，永远不会过期，除非手动删除
 * sessionStorage 是临时性的本地存储，在会话结束时即关闭页面，存储的内容就被释放
 * sessionStorage 即便是相同域名下不同会话窗口下的信息也不会进行共享
 * 以此它们都受同源策略的影响
 * 
 * <优点>
 * 针对单个域名下根据浏览器的不同，最大存储量 5-10mb
 * 
 * <缺点>
 * 不安全，只能存储简单数据
 * 需要手动进行 JSON 序列化的转译
 * 
 */

sessionStorage.getItem();
sessionStorage.clear();
sessionStorage.setItem();
sessionStorage.removeItem();
sessionStorage.key(index);
sessionStorage.length;
