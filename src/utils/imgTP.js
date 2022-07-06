import config from './config'

// export function uploadPicToImgTP(pic){
//     const callback = (res: any) => {
//         // 由于图床上传响应非常慢 所以只能够先用图片 uri 在用户界面显示
//         // 随后等待上传完毕之后再存储 url
//         // 注意 TODO url 与 uri（photomarker） 的一一对应可能存在异步问题！！！
//         // 此处为实现简单 直接新增一个数组 将 url 存入，默认 url 一一对应 photomarker
//         // 默认短时间内不会一下传多张图片！！！
//         console.log("imgTP upload SUCCESS, url: ", res.data.url);
//         const img_urls = this.state.img_urls;
//         this.setState({img_urls:[...img_urls, res.data.url]});
//     }
//
//     // 上传到图床
//     // TODO: 传多张
//     ImgTP(pic.assets[0].uri, callback);
// }

export function ImgTP(url,callback) {
    console.log("ImgTP get uri: ", url);
    let name = url.substring(url.length - 10);
    console.log(url);
    fetch(
        'POST',
        config.imageUploadUrl,
        {
            token: config.imageUploadToken,
            'Content-Type': 'multipart/form-data',
        },
        [{name: 'image', filename: name.toString(), data: url}],
    )
        .then(result => {
            console.log("ImgTP res", result);
            callback(result.json());
        })
        .catch(error => {
            console.log(error);
            console.log('parse error');
        });
}