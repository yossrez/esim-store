import fs from "fs";

const token = process.env.KTOKEN;
const origin = process.env.KORIGIN;
const apis = {
  products: `${origin}/api/user/products?token=${token}`,
  plans: (slug) => `${origin}/api/user/products/${slug}?token=${token}`,
};

let success = 0;
let retried = 0;

async function getData(url, filepath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`Country: ${filepath}`);
    console.log(`Fetch success`);
    fs.writeFileSync(filepath, JSON.stringify(result, null, 4), (err) => {
      if (err) {
        console.log(`Err Saving File!`);
        throw err;
      }
      console.log(`File has been saved!`);
    });
    success++;
  } catch (error) {
    retried++;
    console.error(`!!! ${filepath} - ${error.message} !!!`);
    console.error("--- RETRY IN ---");
    await randomWait(30_000, 60_000);
  }
}

// eslint-disable-next-line
async function getProductPlans() {
  const data = JSON.parse(fs.readFileSync("src/seed/products.json", "utf8"));
  const total = data.data.countries.length;
  const countries = data.data.countries;
  while (success < total) {
    const v = countries[success];
    await getData(apis.plans(v.slug), `src/seed/plans/${v.slug}.json`);
    console.log(`Success --- ${success}/${total}`);
    console.log(`Retried --- ${retried}/${total}`);
    await randomWait(3_000, 10_000);
  }
}

const randomWait = (min, max) => {
  const duration = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(`Waiting ${duration}ms before next request...\n\n`);
  return new Promise((resolve) => setTimeout(resolve, duration));
};

async function main() {
  // await getData(api.products, "./products.json");
  // await getProductPlans();
}

main();
