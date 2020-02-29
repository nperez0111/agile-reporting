const puppeteer = require('puppeteer');
// Documentation at: https://github.com/puppeteer/puppeteer

/**
 * We will use this sort of as our `public static void main` from java.
 * JavaScript is a very loose language so you kind of have to come up with your own patterns for things
 * 
 * This function will be what the other guys call to get the image for the template.
 * notice that I'm using an async function because we will be doing a lot of asynchronous actions 
 */
async function getImage() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.chartjs.org/');
    /**
     * This is just an example, we are not just going to take a screenshot of the page
     * You will need to look into: https://www.chartjs.org/docs/latest/developers/api.html#tobase64image
     * 
     * We don't want to overwrite the same image over and over so maybe use the current timestamp as the filename
     **/
    await page.screenshot({ path: 'example.png' });

    await browser.close();
}

/**
 * These next few lines allow you to run this as it's own program for testing using
 * `node index.js` it will automatically call this function and execute it
 */
if (!module.parent) {
    getImage();
}

/**
 * This line is so that when the other guys need to use your function
 * they can just `require` it and be able to use this function
 * _So make sure to always return to them the right data_
 * 
 * For the other guys: @returns Promise<String>
 * where String is the path of the image
 **/
module.exports = getImage;