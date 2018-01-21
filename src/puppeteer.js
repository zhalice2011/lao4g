const puppeteer = require('puppeteer');
const { screenshot } = require('../config/index');


(async () => {
  const browser = await puppeteer.launch({
        headless: false,
        executablePath:'/private/var/folders/0c/r32jpgps1q31hmn8r4lb_r080000gn/T/AppTranslocation/29EDBD81-8EA8-4A77-83EA-7D86A7ADE9E7/d/Chromium.app/Contents/MacOS/Chromium'
  });
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  await page.screenshot({path: 'example2.png'});

  await browser.close();
})();