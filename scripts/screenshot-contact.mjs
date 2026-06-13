import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle2", timeout: 90000 });
await new Promise((r) => setTimeout(r, 2000));
await page.screenshot({ path: ".playwright-mcp/contact-page-fixed.png", fullPage: true });
console.log("saved contact-page-fixed.png");
await browser.close();
