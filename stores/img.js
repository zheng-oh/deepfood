import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useImgStore = defineStore('img', {
    state: () => {
        const imgInfo = ref({
            width: 0,
            height: 0,
            url: '',
            data: [],
            ratio: 1,
            is_kuan: false,
        });

        return { count: 0, imgInfo };
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
        increment() {
            this.count++;
        },
    },
});