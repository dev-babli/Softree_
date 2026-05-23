import { createWriteStream, mkdirSync, existsSync } from "fs";
import { get } from "https";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_BASE = join(__dirname, "..", "public", "pdf");

const PDFS = [
  // ── WEB ──────────────────────────────────────────────────────────────────
  { category: "web", name: "ShoppingEcommerce.pdf",                        url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ShoppingEcommerce.pdf" },
  { category: "web", name: "PET_CARE.pdf",                                 url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/PET_CARE.pdf" },
  { category: "web", name: "Business-Consultation-App-case-study-1.pdf",   url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App-case-study-1.pdf" },
  { category: "web", name: "Public-Blogging-Website-MERN.pdf",             url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf" },
  { category: "web", name: "FOOD-WINE-WEBSITE.pdf",                        url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf" },
  { category: "web", name: "AUTOREPAIR-PRO.pdf",                           url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/AUTOREPAIR-PRO.pdf" },
  { category: "web", name: "EdTech-Management-Information-System.pdf",     url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System-.pdf" },
  { category: "web", name: "NotevedAdmin.pdf",                             url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/NotevedAdmin.docx.pdf" },
  { category: "web", name: "Wellkies-Admin-Website.pdf",                   url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Website.docx.pdf" },
  { category: "web", name: "LIVE-appointment-bookings.pdf",                url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.docx.pdf" },

  // ── MOBILE ───────────────────────────────────────────────────────────────
  { category: "mobile", name: "Doctor-Appointment-Booking.pdf",            url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Building-a-Doctor-Appointment-Booking-System-with-React.pdf" },
  { category: "mobile", name: "Education-App-Backend.pdf",                 url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Behind-the-Scenes-of-E.pdf" },
  { category: "mobile", name: "Movie-Ticket-Booking-App.pdf",              url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Movie-Ticket-Booking-App-Backend-Documentation.pdf" },
  { category: "mobile", name: "Payment-Gateway-Integration.pdf",           url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Payment-Gateway-1.pdf" },
  { category: "mobile", name: "Education-Mobile-App.pdf",                  url: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Education-App.pdf" },
  { category: "mobile", name: "Resort-Management-App.pdf",                 url: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Resort-Management-.pdf" },
  { category: "mobile", name: "Homi-Room-Rental-App.pdf",                  url: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Homi-App.pdf" },
  { category: "mobile", name: "Wellkies-Doctors-App.pdf",                  url: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf" },
  { category: "mobile", name: "Wellkies-Clinic-App.pdf",                   url: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf" },

  // ── POWER PLATFORM ───────────────────────────────────────────────────────
  { category: "power-platform", name: "Employee-Details-Tracking-System.pdf",   url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Employee-Details-tracking-System.pdf" },
  { category: "power-platform", name: "Health-Plan-Selector.pdf",               url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Health-Plan-Selector-Mobile-Application.pdf" },
  { category: "power-platform", name: "Projects-Portfolio-Management.pdf",      url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf" },
  { category: "power-platform", name: "Students-Portal-Mobile-App.pdf",         url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Students-Portal-Mobile-App.pdf" },
  { category: "power-platform", name: "Ticket-Generation-Mobile-App.pdf",       url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Ticket-Generation-Mobile-App.pdf" },
  { category: "power-platform", name: "Interview-Managing-System.pdf",          url: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Interview-Managing-System.pdf" },

  // ── SHAREPOINT ───────────────────────────────────────────────────────────
  { category: "sharepoint", name: "Custom-Copy-Move-Panel-SPFx.pdf",            url: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf" },
  { category: "sharepoint", name: "Managing-SharePoint-Folders-PowerApps.pdf",  url: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Managing-SharePoint-Library-Folders-with-Power-Apps-Updated-.pdf" },
  { category: "sharepoint", name: "Dynamic-Navigation-Bar-SPFx.pdf",            url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Creating-a-Dynamic-Navigation-Bar-using-SPFx-Application-Customizer.pdf" },
  { category: "sharepoint", name: "Custom-Footer-SPFx.pdf",                     url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf" },
  { category: "sharepoint", name: "Global-Notification-Banner-SPFx.pdf",        url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.pdf" },
  { category: "sharepoint", name: "Browse-Documents-Panel-SPFx.pdf",            url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Inside-a-panel-Browse-Document-From-file-explorer.pdf" },
  { category: "sharepoint", name: "Parent-Panel-List-Library-Creation.pdf",     url: "https://www.softreetechnology.com/wp-content/uploads/2024/12/SPFx-1.pdf" },
  { category: "sharepoint", name: "Custom-Command-Extension-SPFx.pdf",          url: "https://www.softreetechnology.com/wp-content/uploads/2025/03/The-Implementation-of-a-Custom-Command-Extension-in-the-SharePoint-Framework-1.pdf" },
];

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/pdf,*/*",
  "Referer": "https://www.softreetechnology.com/",
};

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (existsSync(destPath)) {
      console.log(`  ⏭  Already exists: ${destPath.split("public")[1]}`);
      return resolve("skipped");
    }
    const file = createWriteStream(destPath);
    get(url, { headers: HEADERS }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve("downloaded"); });
    }).on("error", (err) => {
      file.close();
      reject(err);
    });
  });
}

async function main() {
  let downloaded = 0, skipped = 0, failed = 0;

  for (const { category, name, url } of PDFS) {
    const dir = join(OUTPUT_BASE, category);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const dest = join(dir, name);
    process.stdout.write(`  ⬇  ${category}/${name} ... `);
    try {
      const result = await downloadFile(url, dest);
      if (result === "skipped") { skipped++; } 
      else { console.log("✅"); downloaded++; }
    } catch (err) {
      console.log(`❌  ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed.`);
}

main();
