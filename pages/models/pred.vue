<template>
    <view class="main">
        <view class="titletext">
            <text>{{ model.selectedModel.name }}</text>
        </view>
        <view v-if="img.imgInfo.url" class="imgview">
            <image :src="img.imgInfo.url" mode="aspectFit"></image>
        </view>
        <view class="butview">
            <button size="mini" @tap="addImage" style="color: #ffffff; background-color: #3A42B9">
                {{ !img.imgInfo.url ? "Add image" : "Alter image" }}
            </button>
            <button v-if="img.imgInfo.url" size="mini" type="warn" @click="img.deleteImage"
                style="color: #ffffff; background-color: #b62924">Delete</button>
        </view>
        <view class="modelview">
            <view class="mv-select">
                <view class="mv-select-title">
                    Model Select:
                </view>
                <view class="mv-select-picker">
                    <picker @change="modelChange" :value="model.currentIndex" :range="model.modelList">
                        <view class="model-input">{{ model.modelList[model.currentIndex] }}</view>
                    </picker>
                </view>
            </view>
            <view v-if="isview" class="mv-pred">
                <button @click="predict">Predict</button>
            </view>
        </view>
        <view v-if="!isview" class="layerview">
            <view class="layer-title">
                <text>Layers</text>
                <text>Details</text>
                <text>Output shape</text>
                <text>Params</text>
            </view>
            <view class="layer-content">
                <view v-for="(layer, key) in model.modelInfo['layers']" :key="key" class="layer-item">
                    <text>{{ layer.name }} </text>
                    <text> {{ layer.layer_name }}</text>
                    <text>{{ layer.output_shape }}</text>
                    <text>{{ layer.num_params }}</text>
                </view>
            </view>
            <view class="layer-sum">
                <text>Total params: {{ model.modelInfo['total_params'] }}</text>
                <text>Trainable params: {{ model.modelInfo['trainable_params'] }}</text>
                <text>Non-trainable params: {{ model.modelInfo['non_trainable_params'] }}</text>
            </view>
        </view>
        <view v-if="isview" class="titleview">
            <text>Resule:</text>
        </view>
        <view v-if="isview" class="resultview">
            <text>class: {{ model.classList[model.predictResult.pred_class] }}</text>
            <text>confidence: {{ model.predictResult.confidence }}</text>
        </view>
        <view v-if="isview" class="titleview">
            <text>Feature Map:</text>
        </view>
        <view v-if="isview" class="featuremap">
            <image :src="'data:image/png;base64,' + model.predictResult.base64" mode="aspectFit" @click="previewImage">
            </image>
        </view>
    </view>
</template>


<script setup>
import { useImgStore } from '@/stores/img'
import { useModelStore } from '@/stores/model'
import { ref, computed } from 'vue'



const img = useImgStore()
const model = useModelStore()

const pickerColor = () => {
    uni.navigateTo({
        url: `/pages/tools/pickercolor`,
    });
}

const addImage = () => {
    uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
            const tempFilePaths = res.tempFilePaths;
            img.imgInfo.url = tempFilePaths[0];
            uni.getImageInfo({
                src: tempFilePaths[0],
                success: (res) => {
                    img.imgInfo.url = res.path;
                    img.imgInfo.width = res.width;
                    img.imgInfo.height = res.height;
                    img.imgInfo.ratio = img.imgInfo.width / img.imgInfo.height;
                    model.clearPredictResult()
                },
            });
        },
    });
};


const modelChange = (e) => {
    console.log(e);
    model.currentIndex = e.detail.value
    model.currentModel = model.modelList[model.currentIndex]
    model.getModelInfo()
}

const predict = async () => {
    if (!img.imgInfo.url) {
        uni.showToast({
            title: 'Please add image',
            icon: 'none',
            type: 'error',
        });
        return
    }
    // 显示加载提示
    uni.showLoading({
        title: 'Processing...',
        mask: true // 设置为 true 会阻止用户操作
    });

    try {
        await model.predImg(img.imgInfo.url);  // 执行异步操作
    } catch (err) {
        uni.hideLoading();
        uni.showToast({
            title: 'Prediction failed',
            icon: 'none',
            type: 'error',
            duration: 3000,
        });
    } finally {
        // 请求完成后，隐藏加载提示
        uni.hideLoading();
    }
}

const isview = computed(() => {
    return img.imgInfo.url && model.predictResult
})


const previewImage = () => {
    const currentImage = 'data:image/png;base64,' + model.predictResult.base64;
    uni.previewImage({
        urls: [currentImage],
        current: 0,
    });
}

</script>
<style lang="scss" scoped>
@import '@/static/deepfood.scss';

@mixin flexr($justify: stretch, $align: stretch) {
    display: flex;
    flex-direction: row;
    justify-content: $justify;
    align-items: $align;
}

@mixin flexc($justify: stretch, $align: stretch) {
    display: flex;
    flex-direction: column;
    justify-content: $justify; // 垂直
    align-items: $align; // 水平
}

.main {
    @include flexc(space-around, stretch);
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-image: url('https://cos.zxing.cc/deepfood/ncs.png');
    padding: 10px 0;
    /* 背景图 */
}


.titletext {
    @include flexc(center, center);
    height: 30px;
    font-size: 26px;
    font-weight: bold;
    color: $df-blue;
    width: 100%;

    text {
        @include flexc(center, center);
        width: 80%;
        height: 100%;
        // background-color: $df-gray3;
    }
}

.imgview {
    @include flexc(center, center);
    width: 100%;
    height: 250px;
    background-color: rgba($df-gray3, 0.7);
    border-radius: 10px;
    // padding: 20px;

    image {
        max-width: 100%;
        max-height: 100%;
    }
}

.butview {
    @include flexr(space-around, stretch);
    width: 100%;
    height: 30px;
}


.modelview {
    @include flexr(space-around, stretch);
    width: 100%;
    height: 60px;
    background-color: rgba($df-gray3, 0.8);
}

.mv-select {
    @include flexc(center, center);
    width: 50%;
    height: 90%;
}

.mv-select-title {
    font-size: 16px;
    font-weight: bold;
    color: $df-dark;
    padding-bottom: 4px;
}

.mv-select-picker {
    width: 90%;
    font-size: 12px;
    font-weight: bold;
    color: $df-gray3;
    background-color: $df-gray2;
    border-radius: 2px;
    text-align: center;
    padding: 2px;
}

.mv-pred {
    @include flexc(center, center);
    width: 50%;
    height: 100%;

    button {
        @include flexc(center, center);
        width: 70%;
        height: 80%;
        text-align: center;
        line-height: 80%;
        font-weight: bold;
        //字体间距
        font-size: 18px;
        color: $df-gray3;
        background-color: #3A42B9;
        border-radius: 5px;
    }
}

.resultview {
    @include flexr(space-around, center);
    width: 100%;
    height: 20px;

    text {
        font-size: 18px;
        color: $df-dark;
    }
}

.featuremap {
    @include flexc(center, center);
    width: 100%;
    height: 200px;
}

.layerview {
    @include flexc(stretch, center);
    width: 100%;
    height: 60vh;
}

.layer-title {
    @include flexr(space-around, center);
    width: 95%;
    height: 30px;
    background-color: $df-gray2;
    border-radius: 5px 5px 0 0;

    text {
        @include flexr(stretch, center);
        width: 20%;
        font-size: 11px;
        color: $df-gray3;
    }
}

.layer-content {
    @include flexc(center, center);
    width: 95%;
    // border-radius: 0 0 5px 5px;
    height: auto;
    background-color: $df-gray;
}

.layer-item {
    @include flexr(space-around, center);
    width: 100%;
    height: 30px;

    text {
        @include flexr(stretch, center);
        //左对齐
        width: 20%;
        text-align: left;
        font-size: 9px;
        color: $df-gray3;
        // background-color: aqua
    }
}

.layer-sum {
    @include flexc(space-around, stretch);
    width: 95%;
    height: 60px;
    background-color: $df-gray2;
    border-radius: 0 0 5px 5px;

    text {
        padding-left: 5px;
        font-size: 11px;
        color: $df-gray3;
    }
}

.titleview {
    @include flexr(stretch, center);
    height: 10px;
    font-size: 16px;
    font-weight: bold;
    color: $df-dark;
    padding-left: 10px;
}
</style>