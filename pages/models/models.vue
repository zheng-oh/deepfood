<template>
    <view class="main">
        <view class="title">
            <text class="titletext">Deep learning models in food inspection</text>
        </view>
        <view class="modelslist">
            <view v-for="onemodel in models" :key="onemodel.id" class="modelone" hover-class="toolcard-hover" @click="goToModel(onemodel)">
                <view class="modeltop">
                    <text>{{ onemodel.name }}</text>
                </view>
                <view class="modelmain">
                    <view class="modelcardimg">
                    <image :src="onemodel.imgurl" alt="rgb" mode="scaleToFill" />
                </view>
                <view class="modelinfo">
                    <text>Model info</text>
                </view>
    </view> 
            </view>
        </view>
    </view>
</template>


<script setup>
import {
    watch,
    computed,
} from 'vue'
// import {
// 	store
// } from '@/api/store.js'
// import AddImg from '@/components/AddImg.vue'
import { onReady } from '@dcloudio/uni-app'
// import { drawImg } from '@/api/drawimg.js'

import { useModelStore } from '@/stores/model'

const model = useModelStore()

const models = [
    {
        id: 'chanpi',
        name: 'Chenpi aging',
        imgurl: 'https://cos.zxing.cc/deepfood/chenpi.png',
        class:['1 year','3 years','5 years','10 years']
    },
    {
        id: 'inflamma',
        name: 'Inflammation detection',
        imgurl: 'https://cos.zxing.cc/deepfood/inflam.png',
        class:['normal','less normal','slightly inflamma','inflamma']
    },
    {
        id: 'duck',
        name: 'Duck freshness',
        imgurl: 'https://cos.zxing.cc/deepfood/duck.png',
        class:['fresh','less fresh','slightly spolit','spolit']
    },
    {
        id: 'clam',
        name: 'Clam freshness',
        imgurl: 'https://cos.zxing.cc/deepfood/clam.png',
        class:['fresh','less fresh','slightly spolit','spolit']
    },


]

const goToModel = async (onemodel) => {
    model.classList = onemodel.class
    uni.navigateTo({
        url: `/pages/models/pred`,
    })
    await model.getModelList(onemodel.id)
    model.selectedModel = onemodel
    await model.getModelInfo()
}

onReady(() => {
    console.log("onready");
});



// watch([() => store.imgInfo.re_plot], (newcover) => {
// 	if (!store.cursorInfo.cover) {
// 		store.ctxCursor.clearRect(0, 0, store.canvasInfo.width * store.drp, store.canvasInfo.height * store.drp);
// 	}
// 	store.drawCursor()
// })

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
    @include flexc();
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-image: url('https://cos.zxing.cc/deepfood/ncs.png');
    /* 背景图 */
}

.title {
    @include flexc(center, center);
    width: 100%;
    height: 10vh;
    margin: 20px 0;
}

.titletext {
    //居中
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: $df-blue;
}

.modelslist {
    @include flexr(space-around, stretch);
    flex-wrap: wrap;
    width: 100%;
}

.modelone {
    @include flexc(space-around, center);
    // padding: 5px;
    width: 45%;
    height: 100px;
    border-radius: 5px;
    background-color: $df-gray2;
    margin: 5px;
}

.modelcard-hover {
    background-color: rgba(119, 119, 119, 0.1);
    transform: scale(0.98);
    transition: all 0.2s ease;
}

.modeltop {
    @include flexc(center, center);
    width: 100%;
    height: 20%;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
}

.modelmain {
    @include flexr(space-around, center);
    width: 100%;
    height: 80%;
}


.modelcardimg {
    @include flexc(center, center);
    width: 40%;
    height: 80%;
    padding: 5px;
    image {
        width: 100%;
        height: 100%;
        box-shadow: 10px 2px 10px 0 rgba(0, 0, 0, 0.3);

    }
}

.toolcard-hover {
  background-color: rgba(67, 68, 70, 0.8);
  transform: scale(0.98);
  transition: all 0.1s ease;
}

.modelinfo {
    @include flexc(center, center);
    width: 50%;
    height: 100%;
}


</style>