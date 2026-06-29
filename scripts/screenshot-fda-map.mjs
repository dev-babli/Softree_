import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 90000 });
await page.evaluate(() => {
  document.querySelector(".fda-maps")?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 2500));
const el = await page.$(".fda-location");
if (el) {
  await el.screenshot({ path: ".playwright-mcp/fda-map-calibrated.png" });
  console.log("saved");
}
await browser.close();
