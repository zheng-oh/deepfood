import { useImgStore } from '../stores/img';

// const ctx = ref(null);
// const drp = uni.getSystemInfoSync().pixelRatio

const drawImg = () => {
    const store = useImgStore();
    // console.log("canvaswidth, canvasheight:", store.canvasInfo.width, store.canvasInfo.height);
    // const ctx = ref(null);
    const query = uni.createSelectorQuery();
    query
        .select('#myCanvas')
        .fields({
            node: true,
            size: true,
        })
        .exec((res) => {
            // console.log("res:", res);
            const canvas = res[0].node;

            if (canvas) {
                // console.log("<canvas> size:", res[0].width, res[0].height);
                store.ctxImg = canvas.getContext("2d");
                // console.log(canvaswidth.value, canvasheight.value);
                canvas.width = store.canvasInfo.width * store.drp;
                canvas.height = store.canvasInfo.height * store.drp;
                // console.log("canvas w;h:", canvas.width, canvas.height);

                const img = canvas.createImage();
                img.src = store.imgInfo.url;

                img.onload = () => {
                    store.ctxImg.drawImage(
                        img,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    const imageData = store.ctxImg.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );
                    store.imgInfo.data = imageData;
                    // console.log("imageData:", imageData);
                    // console.log('kkk:', canvas.height, Math.max(res[0].height, res[0].width));
                    // console.log("store.imgInfo.data:", store.imgInfo.data);
                    if (!store.imgInfo.is_kuan) {
                        store.touchInfo.y_ratio =
                            canvas.height / res[0].height;
                        store.touchInfo.x_ratio = store.touchInfo.y_ratio;
                    } else {
                        store.touchInfo.x_ratio = canvas.width / res[0].width;

                        store.touchInfo.y_ratio = canvas.height / res[0].height;
                    }
                    store.pickerColor.hexColor = "";
                    const query2 = uni.createSelectorQuery();
                    query2
                        .select('#myCursor')
                        .fields({
                            node: true,
                            size: true,
                        })
                        .exec((res) => {
                            // console.log("res:", res);
                            const canvas2 = res[0].node;

                            if (canvas2) {
                                // console.log("<canvas> size:", res[0].width, res[0].height);
                                store.ctxCursor = canvas2.getContext("2d");
                                canvas2.width = store.canvasInfo.width * store.drp;
                                canvas2.height = store.canvasInfo.height * store.drp;
                                // console.log("获取ctx cursor");
                            }
                        });
                    // store.drawCursor()


                };
            } else {
                console.error('Canvas element not found.');
            }
        });
}

export {
    drawImg
}