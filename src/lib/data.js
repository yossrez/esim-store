import fs from "fs";

// --env-file=.env.local
const token = process.env.KTOKEN;
const origin = process.env.KORIGIN;

const apis = {
  destinations: `${origin}/api/user/products?token=${token}`,
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
    console.error(`getData: !!! ${filepath} - ${error.message} !!!`);
    console.error("--- RETRY IN ---");
    await randomWait(30_000, 60_000);
  }
}

// eslint-disable-next-line
async function getProductPlans(plan, dir) {
  try {
    const data = JSON.parse(
      fs.readFileSync("src/seed/destinations.json", "utf8"),
    );
    const total = data.data[plan].length;
    const plans = data.data[plan];
    while (success < total) {
      const v = plans[success];
      await getData(apis.plans(v.slug), `${dir}/${v.slug}.json`);
      console.log(`Success --- ${success}/${total}`);
      console.log(`Retried --- ${retried}/${total}`);
      await randomWait(3_000, 10_000);
    }
  } catch (error) {
    console.error(`getProductPlans: ${filepath} - ${error.message}`);
  }
}

const randomWait = (min, max) => {
  const duration = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(`Waiting ${duration}ms before next request...\n\n`);
  return new Promise((resolve) => setTimeout(resolve, duration));
};

async function main() {
  // await getData(api.destinations, "src/seed/destinations.json");
  // await getProductPlans("countries", "src/seed/plans/local");
  // await getProductPlans("regionals", "src/seed/plans/region");
}

main();
