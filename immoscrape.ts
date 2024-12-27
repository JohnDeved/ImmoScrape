import { chromium } from "npm:playwright";

async function visitImmobilienscout24() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.immobilienscout24.de/");

  // Simulate random mouse movements
  for (let i = 0; i < 10; i++) {
    const x = Math.floor(Math.random() * 800);
    const y = Math.floor(Math.random() * 600);
    await page.mouse.move(x, y);
    await page.waitForTimeout(500);
  }

  // Wait until the aws-waf-token cookie is set
  let awsWafToken = null;
  while (!awsWafToken) {
    const cookies = await context.cookies();
    awsWafToken = cookies.find(cookie => cookie.name === "aws-waf-token");
    if (!awsWafToken) {
      await page.waitForTimeout(1000);
    }
  }

  console.log("aws-waf-token cookie value:", awsWafToken.value);

  // Visit the specified URL and log the response
  const response = await page.goto("https://www.immobilienscout24.de/Suche/radius/wohnung-mit-einbaukueche-mieten?centerofsearchaddress=Anhalt-Bitterfeld%20(Kreis);;;;;K%C3%B6then%20(Anhalt);&numberofrooms=2.0-&price=-700.0&pricetype=calculatedtotalrent&geocoordinates=51.75572;11.97482;30.0&sorting=7&viewMode=HYBRID_VIEW");
  console.log("Response status:", response.status());
  console.log("Response URL:", response.url());
  console.log("Response headers:", response.headers());
  console.log("Response body:", await response.text());

  await browser.close();
}

visitImmobilienscout24();
