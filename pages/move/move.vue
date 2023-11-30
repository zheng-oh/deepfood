<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
    <view class="page-body">
        <view class="uni-padding-wrap uni-common-mt">
            <view class="uni-title uni-common-mt">
                示例 1
                <text>\nmovable-view 区域小于 movable-area</text>
            </view>
            <movable-area>
                <movable-view :x="x" :y="y" direction="all" @change="onChange">text</movable-view>
            </movable-area>
            <view @tap="tap" class="uni-link uni-center uni-common-mt">
                点击这里移动至 (30px, 30px)
            </view>
            <view class="uni-title uni-common-mt">
                示例 2
                <text>\nmovable-view区域大于movable-area</text>
            </view>
            <movable-area class="custom-movable-area">
                <movable-view class="max" direction="all">text</movable-view>
            </movable-area>
        </view>
    </view>
</template>


<script>
export default {
    data() {
        return {
            x: 0,
            y: 0,
            old: {
                x: 0,
                y: 0
            }
        }
    },
    methods: {
        tap: function (e) {
            this.x = this.old.x
            this.y = this.old.y
            this.$nextTick(function () {
                this.x = 30
                this.y = 30
            })
        },
        onChange: function (e) {
            this.old.x = e.detail.x
            this.old.y = e.detail.y
        }
    }
}
</script>


<style>
.custom-movable-area {
    width: 200px;
    /* 设置 movable-area 的宽度 */
    height: 200px;
    /* 设置 movable-area 的高度 */
    background-color: #f0f0f0;
    /* 设置 movable-area 的背景颜色 */
}

.max {
    width: 100px;
    height: 100px;
    background-color: lightblue;
    text-align: center;
    line-height: 100px;
    color: white;
}
</style>
