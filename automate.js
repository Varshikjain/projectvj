const puppeteer = require('puppeteer');
(async () => {

  // Launch headful browser and go to swap.defillama.com
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 980, height: 655 });
  await page.goto('https://swap.defillama.com');

  // // Arbitrum One

  await page.click('div.css-b62m3t-container'); //Click on the chain dropdown
  await page.waitForSelector('.css-ern9ru input'); //Wait for the chain input field to appear

  // // // Enter "Arbitrum One" in the chain input field
  await page.type('.css-ern9ru input', 'Arbitrum One');
  // Pressing Enter to select "Arbitrum One" as the chain
  await page.keyboard.press('Enter');

  //you sell count
  const input = await page.$('input[class="chakra-input css-lv0ed5"]');
  await input.click({ clickCount: 3 });
  await input.type("12");

  //function to select the tokens
  async function selectToken(page, buttonSelector, searchInputSelector, tokenName) {
    await page.click(buttonSelector);
    await page.waitForSelector('.List');
    const searchInput = await page.$(searchInputSelector);
    await searchInput.type(tokenName);
    await page.waitForTimeout(1000);
    await page.waitForSelector('.List');
    const firstOption = await page.$('.List > div > div > div');
    await firstOption.click();
    await page.waitForTimeout(1000);
  }
  //Sell token
  await selectToken(page, 'button.chakra-button.css-qjhap', '.chakra-input.css-s1d1f4', 'Wrapped BTC');
  // Buy Token
  await selectToken(page, 'div.css-q4vstg:nth-child(3) > div.css-1k491an > button.chakra-button.css-qjhap', '.chakra-input.css-s1d1f4', 'USD Coin');

  //Selects 2nd option
  await page.waitForTimeout(1000);
  const option = await page.$$(".RouteWrapper");
  option[1].click()

})();
