import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
	let browser;
	let page;

	beforeAll(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.Event');
	});

	afterAll(async () => {
		await browser.close();
	});

	test('An event element is collapsed by default', async () => {
		const detailsVisible = await page.$('.Event__Details');
		expect(detailsVisible).toBeNull();
	});

	test('User can expand an event to see details', async () => {
		await page.click('.Event__Overview--Button');
		const detailsVisible = await page.waitForSelector('.Event__Details', { visible: true });
		expect(detailsVisible).toBeDefined();
	});

	test('User can collapse an event to hide details', async () => {
		await page.click('.Event__Overview--Button');
		const isDetailsHidden = await page.evaluate(() => {
			const button = document.querySelector('.Event__Overview--Button');
			return button && button.textContent.includes('Show details');
		});
		expect(isDetailsHidden).toBe(true);
	});
});
