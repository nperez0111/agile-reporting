const puppeteer = require("puppeteer")

const time = Date.now()

const takeScreenshot = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const options = {
		path: 'images/' + time + '.png',
		fullPage: true,
		omitBackground: false 
	}

	await page.goto('http://nickthesick.duckdns.org');
	await page.screenshot(options);

	await browser.close();
}

takeScreenshot();