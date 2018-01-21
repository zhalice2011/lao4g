const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile);  // fs.writeFile是一个异步函数,用promisify包裹起来之后就可以用await 进行调用


// 定义一个保存图片的函数 传入 图片url 传入想保存的地址

module.exports = async (src, dir) => {
    // 判断是普通图片格式还是base64
    if (/\.(jpg|png|gif)$/.test(src)) {  // 以这三个扩展名结尾的进行匹配
        await urlToImg(src, dir)
    } else {
        await base64ToImg(src, dir)        
    }
}

// url => image

const urlToImg = promisify((url, dir, callback) => {
    const mod = /^https:/.test(url) ? https : http; // 获取扩展名判断是不是https
    const ext = path.extname(url)  // 获取文件扩展名
    const file = path.join(dir, `${Date.now()}${ext}`) // 重新定义一个文件名
    // 有了url就通过http获取图片 会返回一个res
    mod.get(url, res => {
        // 保存到磁盘
        res.pipe(fs.createWriteStream(file))
            .on('finish', () => {  // 监听完成事件
                callback();
                console.log(file);
            })
    });
})

// base => image

const base64ToImg = async function(base64Str, dir) {
    // base64的src格式是===> data:image/jpeg;base64,sdfadsfasfasdf
    const matches = base64Str.match(/^data:(.+?);base64,(.+)$/); // 以data:开头 往后面匹配(?表示非贪婪模式,遇到第一个分号就停止,匹配到分号为止,否则尽可能往后匹配)                
    try {
        const ext = matches[1].split('/')[1].replace('jpeg', 'jpg')   // matches[1]表示上面第一个括号内的 就是image/jpeg
        
        const file = path.join(dir, `${Date.now()}.${ext}`); //定义文件名
        const content = matches[2] // base64字符串
        // 
        await writeFile(file, content, 'base64') // 写入文件
        console.log(file)
    } catch(ex) {
        console.log(ex)
    }

}