let HOME_PAGE = require('../../wdio.mobile.conf.js').config.baseUrl;

if (process.env.IOS) {
    HOME_PAGE = require('../../wdio.ios.conf').config.baseUrl;
}

describe('Mobile page layout', () => {
    let originalTimeout = 10000;

    beforeEach(async () => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;

        await (async () => {
            await browser.url(`${HOME_PAGE}`);
        })();
    });

    it('should display navigation toggle button without scrolling', async () => {
        const navicon = await browser.$('#navbar-ham');

        expect(await navicon.isDisplayedInViewport()).toBeTrue();
    });

    it('should toggle nav bar when button is tapped', async () => {
        const navicon = await browser.$('#navbar-ham');
        const target = await browser.$('#navbar');

        await navicon.click();

        const searchBox = await browser.$('#search-box');

        expect(await searchBox.isDisplayedInViewport()).toBeTrue();

        await navicon.click();

        const classList = await target.getAttribute('class');

        expect(classList).not.toContain('expanded');
    });

    it('should hide nav bar on link navigation', async () => {
        const navicon = await browser.$('#navbar-ham');

        await navicon.click();
        let searchBox = await browser.$('#search-box-input');

        await searchBox.clearValue();
        await searchBox.setValue('cr');
        const foundMethod = await browser.$('[href="Tree.html#crop"]');

        await foundMethod.click();

        const title = await browser.getTitle();

        searchBox = await browser.$('#search-box');

        expect(title).toContain('Tree');
        expect(await searchBox.isDisplayedInViewport()).toBeTrue();
    });

    afterAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
