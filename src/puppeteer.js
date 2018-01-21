const puppeteer = require('puppeteer');
const { imgUrl } = require('../config/index');


(async () => {
  const browser = await puppeteer.launch({
        headless: true,
        executablePath:'/private/var/folders/0c/r32jpgps1q31hmn8r4lb_r080000gn/T/AppTranslocation/29EDBD81-8EA8-4A77-83EA-7D86A7ADE9E7/d/Chromium.app/Contents/MacOS/Chromium'
  });
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  await page.screenshot({path: imgUrl+'/'+'example2.png'}),
  await browser.close();
})();
