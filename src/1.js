const browser = await puppeteer.launch({
    headless: false,
    executablePath:'/private/var/folders/0c/r32jpgps1q31hmn8r4lb_r080000gn/T/AppTranslocation/29EDBD81-8EA8-4A77-83EA-7D86A7ADE9E7/d/Chromium.app/Contents/MacOS/Chromium'
});
const page = await browser.newPage();
// 让page跳转到百度图片首页
await page.goto('https://image.baidu.com/');
console.log('go to https://image.baidu.com/')
// 改变浏览器窗口大小
await page.setViewport({
    width:1920,
    height:1080
})
console.log('reset viewport')
// 找到输入框 焦点在输入框上
await page.focus('#kw')
// 输入内容
await keyboard.sendCharacter('rosi写真')
// 触发点击
await page.click('.s_btn')
console.log('go to search list')
// 等待网页加载完成
page.on('load', async () => {
    console.log('page loading done, start fetch...')
    // 获取页面上所有图片的src
    const srcs = await page.evaluate(() => {
        const images = document.querySelectorAll('img.main_img')  // 获取所有的图片的dom元素
        return Array.prototype.map.call(images, img => img,src)  // 拿到的images其实不是数组,所以需要用这种方法
    });
    console.log(`获取到的图片的数量${srcs.length}`)
    // 保存每张图片
    srcs.forEach(src => {
        // 定义一个保存图片的函数 传入 图片url 传入想保存的地址
        srcToImg(src, rosiImgUrl)
    });

    // 执行完成 关闭browser
    await browser.close()
})