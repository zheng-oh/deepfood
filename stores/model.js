import {
    defineStore
} from 'pinia';
import {
    ref,
} from 'vue';
import config from '../config.json'

export const useModelStore = defineStore('model', {
    state: () => {
        const selectedModel = ref({
            name: '',
            id: ''
        })
        const modelList = ref(['model1', 'model2', 'model3'])
        const currentIndex = ref(0)
        const predictResult = ref({
            pred_class: '',
            confidence: 0
        })
        const classList = ref([])
        const modelInfo = ref({})
        return {
            selectedModel,
            modelList,
            currentIndex,
            predictResult,
            classList,
            modelInfo
        };
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    getters: {

    },

    actions: {
        clearPredictResult() {
            this.predictResult = {
                pred_class: '',
                confidence: 0
            };
        },
        async getModelList(name) {
            return new Promise((resolve, reject) => {
                uni.request({
                    url: config.apiUrl + '/models',
                    method: 'GET',
                    data: {
                        name: name
                    },
                    success: (res) => {
                        this.modelList = res.data.models;
                        resolve(res.data);
                    },
                    fail: (err) => {
                        reject(err);
                    }
                });
            });
        },

        async getModelInfo() {
            return new Promise((resolve, reject) => {
                uni.request({
                    url: config.apiUrl + '/modelinfo/' + this.modelList[this.currentIndex],
                    method: 'GET',
                    success: (res) => {
                        this.modelInfo = res.data;
                        resolve(res.data);
                    },
                    fail: (err) => {
                        reject(err);
                    }
                });
            });
        },

        async predImg(imgurl) {
            return new Promise((resolve, reject) => {
                // Create a timeout promise that rejects after 3 seconds
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Request timeout')), 3000);
                });

                // Create the upload promise
                const uploadPromise = new Promise((resolve, reject) => {
                    uni.uploadFile({
                        url: config.apiUrl + '/predict',
                        filePath: imgurl,
                        name: 'file', 
                        formData: {
                            'modelname': this.modelList[this.currentIndex]
                        },
                        success: (res) => {
                            const result = JSON.parse(res.data);
                            this.predictResult = result;
                            resolve(result);
                        },
                        fail: (err) => reject(err)
                    });
                });

                // Race between timeout and upload
                return Promise.race([uploadPromise, timeoutPromise])
                    .then(resolve)
                    .catch(reject);
            });
        },

    },
});