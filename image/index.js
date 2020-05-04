const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');
// Documentation at: https://github.com/puppeteer/puppeteer

function getTimeStamp() {
  const now = new Date();

  return dayjs(now).format('DD-MM-YYYY')
}

/**
 * We will use this sort of as our `public static void main` from java.
 * JavaScript is a very loose language so you kind of have to come up with your own patterns for things
 *
 * This function will be what the other guys call to get the image for the template.
 * notice that I'm using an async function because we will be doing a lot of asynchronous actions
 */
async function getImage() {
  console.log('Generating the image...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/');
  await page.waitFor(1500)

  const dataUrl = await page.evaluate(() => {
    const graph = document.querySelector('#graph');

    return graph.toDataURL();
  });
  const filePath = path.join('.', 'images', `${getTimeStamp()}.png`);

  try {
    const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);

    if (matches.length !== 3) {
      throw new Error('Could not parse data URL.');
    }

    fs.writeFileSync(filePath, Buffer.from(matches[2], 'base64'), 'base64');
  } catch (error) {
    console.log(error);
  }

  console.log(`Image saved to: ${filePath}`);

  await browser.close();

  return filePath;
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
 * */
module.exports = getImage;
