/**
 * v-for 中的 Ref 数组
 * 3版本通过将 ref 绑定在一个函数上
 * 
 *  <template>
        <div v-for="item in list" :ref="setItemRef"></div>
    </template >
 * 
 */


import { onMounted, ref } from 'vue';

export default {
    setup(props, ctx) {
        let itemRefs = [];
        const setItemRef = el => el && itemRefs.push(el);

        onMounted(() => console.log('refs:', itemRefs));

        return {
            setItemRef
        }
    }
}
