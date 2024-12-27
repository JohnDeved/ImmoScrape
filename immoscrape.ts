import { chromium } from "npm:playwright";

async function visitImmobilienscout24() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 50
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
      'accept': 'application/json',
      'accept-language': 'en-GB,en;q=0.9',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'upgrade-insecure-requests': '1',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  });

  // Set initial cookies
  await context.addCookies([
    {
      name: 'ABNTEST',
      value: '1735299994',
      domain: '.immobilienscout24.de',
      path: '/'
    },
    {
      name: 'aws-waf-token',
      value: '5b8fc079-aff5-4c9f-93b5-e5a1b51c005f:HAoAprZTIlLPAgAA:Ngmq06vBE5YrTV49BLM7fKRh/dP8plO0eq2/vfXauzi2ovPbb5QC1HVTagj8XioJTLIXxH/QCu20gVQ3gXQnLmoaaytH4/58UrioEJOUZ2u7BwpcwClE0vnBqtS+udh9n4zT74VmGTRCciGl7cjfO78cVo2JqbHRfRrsQ1/FIVIYwfv8rIyWatEfalDmrrDvMOZDADJsRojSE1P91xSr5DOl2GJiMi7CpAmZGXXf6es0be5lA60tbLLItVbXiZ3c16wnKySB+tzAWLC2xTEJ',
      domain: '.immobilienscout24.de',
      path: '/'
    }
  ]);

  const page = await context.newPage();

  await page.goto("https://www.immobilienscout24.de/Suche/radius/wohnung-mit-einbaukueche-mieten?centerofsearchaddress=Anhalt-Bitterfeld%20(Kreis);;;;;K%C3%B6then%20(Anhalt);&numberofrooms=2.0-&price=-700.0&pricetype=calculatedtotalrent&geocoordinates=51.75572;11.97482;30.0&sorting=7&viewMode=HYBRID_VIEW")

  const response = await page.evaluate(async () => {
    const res = await fetch(
      "https://www.immobilienscout24.de/Suche/radius/wohnung-mit-einbaukueche-mieten?centerofsearchaddress=Anhalt-Bitterfeld%20(Kreis);;;;;K%C3%B6then%20(Anhalt);&numberofrooms=2.0-&price=-700.0&pricetype=calculatedtotalrent&geocoordinates=51.75572;11.97482;30.0&sorting=7",
    );
    return await res.json();
  });

  Deno.writeTextFile("response.json", JSON.stringify(response, null, 2));

  await browser.close();
}

visitImmobilienscout24();
