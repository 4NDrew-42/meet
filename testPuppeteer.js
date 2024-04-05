const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({ headless: false }); // Launch non-headless mode to see the browser
	const page = await browser.newPage();
	await page.goto('http://localhost:3000'); // Replace with your local server URL
	await page.screenshot({ path: 'localhostTest.png' }); // Save a screenshot to the current directory
	await browser.close();
})();
