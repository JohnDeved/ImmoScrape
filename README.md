# ImmoScrape

## Setup

1. Install Deno by following the instructions at https://deno.land/#installation
2. Install Playwright by running the following command:
   ```sh
   deno run -A https://deno.land/x/playwright/install.ts
   ```

## Usage

1. Clone the repository:
   ```sh
   git clone https://github.com/JohnDeved/ImmoScrape.git
   cd ImmoScrape
   ```

2. Run the `immoscrape.ts` script:
   ```sh
   deno run --allow-net --allow-env immoscrape.ts
   ```

The script will visit https://www.immobilienscout24.de/, create random mouse movements on the site, and wait until the `aws-waf-token` cookie is set. Once the cookie is set, its value will be logged to the console.
