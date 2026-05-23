import { existsSync, mkdirSync, copyFileSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOWNLOADS = `C:\\Users\\Soumeet Kumar Barik\\Downloads`;
const PUBLIC_PDF = join(__dirname, "..", "public", "pdf");

// Maps: { src: filename in Downloads, dest: category/filename in public/pdf }
const MOVE_MAP = [
  // ── WEB ──────────────────────────────────────────────────────────────────
  { src: "ShoppingEcommerce.pdf",                                                      dest: "web/ShoppingEcommerce.pdf" },
  { src: "PET_CARE.pdf",                                                               dest: "web/PET_CARE.pdf" },
  { src: "Business-Consultation-App-case-study-1.pdf",                                 dest: "web/Business-Consultation-App-case-study-1.pdf" },
  { src: "Public-Blogging-Website-Using-the-MERN-Stack.pdf",                           dest: "web/Public-Blogging-Website-MERN.pdf" },
  { src: "FOOD-WINE-WEBSITE.pdf",                                                      dest: "web/FOOD-WINE-WEBSITE.pdf" },
  { src: "AUTOREPAIR-PRO.pdf",                                                         dest: "web/AUTOREPAIR-PRO.pdf" },
  { src: "EdTech-Management-Information-System-.pdf",                                  dest: "web/EdTech-Management-Information-System.pdf" },
  { src: "NotevedAdmin.docx.pdf",                                                      dest: "web/NotevedAdmin.pdf" },
  { src: "Website.docx.pdf",                                                           dest: "web/Wellkies-Admin-Website.pdf" },
  { src: "LIVE-appointment-bookings.docx.pdf",                                         dest: "web/LIVE-appointment-bookings.pdf" },

  // ── MOBILE ───────────────────────────────────────────────────────────────
  { src: "Building-a-Doctor-Appointment-Booking-System-with-React.pdf",               dest: "mobile/Doctor-Appointment-Booking.pdf" },
  { src: "Behind-the-Scenes-of-E.pdf",                                                dest: "mobile/Education-App-Backend.pdf" },
  { src: "Movie-Ticket-Booking-App-Backend-Documentation.pdf",                        dest: "mobile/Movie-Ticket-Booking-App.pdf" },
  { src: "Payment-Gateway-1.pdf",                                                     dest: "mobile/Payment-Gateway-Integration.pdf" },
  { src: "Education-App.pdf",                                                         dest: "mobile/Education-Mobile-App.pdf" },
  { src: "Resort-Management-.pdf",                                                    dest: "mobile/Resort-Management-App.pdf" },
  { src: "Homi-App.pdf",                                                              dest: "mobile/Homi-Room-Rental-App.pdf" },
  { src: "Wellkies-Doctor-Document.pdf",                                              dest: "mobile/Wellkies-Doctors-App.pdf" },
  { src: "Wellkies-Clinic-App.pdf",                                                   dest: "mobile/Wellkies-Clinic-App.pdf" },

  // ── POWER PLATFORM ───────────────────────────────────────────────────────
  { src: "Employee-Details-tracking-System.pdf",                                      dest: "power-platform/Employee-Details-Tracking-System.pdf" },
  { src: "Health-Plan-Selector-Mobile-Application.pdf",                               dest: "power-platform/Health-Plan-Selector.pdf" },
  { src: "Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",                      dest: "power-platform/Projects-Portfolio-Management.pdf" },
  { src: "Students-Portal-Mobile-App.pdf",                                            dest: "power-platform/Students-Portal-Mobile-App.pdf" },
  { src: "Ticket-Generation-Mobile-App.pdf",                                          dest: "power-platform/Ticket-Generation-Mobile-App.pdf" },
  { src: "Interview-Managing-System.pdf",                                             dest: "power-platform/Interview-Managing-System.pdf" },

  // ── SHAREPOINT ───────────────────────────────────────────────────────────
  { src: "Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf", dest: "sharepoint/Custom-Copy-Move-Panel-SPFx.pdf" },
  { src: "Managing-SharePoint-Library-Folders-with-Power-Apps-Updated-.pdf",          dest: "sharepoint/Managing-SharePoint-Folders-PowerApps.pdf" },
  { src: "Creating-a-Dynamic-Navigation-Bar-using-SPFx-Application-Customizer.pdf",   dest: "sharepoint/Dynamic-Navigation-Bar-SPFx.pdf" },
  { src: "Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",             dest: "sharepoint/Custom-Footer-SPFx.pdf" },
  { src: "Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.pdf", dest: "sharepoint/Global-Notification-Banner-SPFx.pdf" },
  { src: "Inside-a-panel-Browse-Document-From-file-explorer.pdf",                     dest: "sharepoint/Browse-Documents-Panel-SPFx.pdf" },
  { src: "SPFx-1.pdf",                                                                dest: "sharepoint/Parent-Panel-List-Library-Creation.pdf" },
  { src: "The-Implementation-of-a-Custom-Command-Extension-in-the-SharePoint-Framework-1.pdf", dest: "sharepoint/Custom-Command-Extension-SPFx.pdf" },
];

// Files to DELETE from Downloads (not needed in the project)
const DELETE_FROM_DOWNLOADS = [
  "Add-Remove-And-Get-All-Web-Parts-From-Modern-Site-Page-Using-PnP-PowerShell.pdf",
  "Assignment1_Chapter1.pdf",
  "Assignment2_HTML.pdf",
  "Assignment3_Chapter2.pdf",
  "Assignment5_Chapter4.pdf",
  "Assignment6_Chapter5.pdf",
  "Assignment7_Chapter6.pdf",
  "Automated-Request-Submission-and-Approval-Workflow-in-Power-Apps.pdf",
  "Car-Rental-System-doc.pdf",
  "Claim-Request-Management.pdf",
  "How-To-Enable-And-Disable-MFA-Using-PowerShell-1.pdf",
  "How-To-Fetch-Items-From-SharePoint-List-To-PowerApps-Gallery-Calculate.pdf",
  "Model-Driven-App.pdf",
  "Model-Driven-App-1.pdf",
  "Multiple-Signature-Approval-Process.pdf",
  "Pet-Care-Management-App.pdf",
  "Portfolio_softree.pdf",
  "Power-Apps-Shopping-Cart.pdf",
  "Power-App-Working-with-List-Relationships.pdf",
  "Project-Management-For-Blog.pdf",
  "Reservation-booking-system-for-an-event-For-Blog.pdf",
  "Sales-Invoice.pdf",
  "School-Stationery-Shopping-App-Backend-Documentation.docx.pdf",
  "Softree-Portfolio-1.pdf",
  "Softree-Technology-Portfolio.pdf",
  "SPFx.pdf",
  "Teacher-and-Student-Report-Generation-Website.pdf",
  "The-Implementation-of-a-Custom-Command-Extension-in-the-SharePoint-Framework.pdf",
  "The-Implementation-of-a-Custom-Command-Extension-in-the-SharePoint-Framework-1 (1).pdf",
  "TimeSheet.pdf",
  "Travel-Agency-Multiple-Authentication-System.pdf",
  "Upload-files-from-PowerApps-to-Sharepoint-library-using-Graph-API.pdf",
  "Wellkies-User-App.pdf",
  "Wellkies-Website.pdf",
];

console.log("\n=== MOVING PDFs to public/pdf/ ===\n");

let moved = 0, skipped = 0, missing = [];

for (const { src, dest } of MOVE_MAP) {
  const srcPath = join(DOWNLOADS, src);
  const destPath = join(PUBLIC_PDF, dest);
  const destDir = dirname(destPath);

  if (!existsSync(srcPath)) {
    console.log(`  ❌ MISSING in Downloads: ${src}`);
    missing.push(dest);
    continue;
  }
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
  if (existsSync(destPath)) {
    console.log(`  ⏭  Already exists, skipping: ${dest}`);
    skipped++;
    continue;
  }
  copyFileSync(srcPath, destPath);
  console.log(`  ✅ ${src}  →  public/pdf/${dest}`);
  moved++;
}

console.log("\n=== DELETING unnecessary PDFs from Downloads ===\n");

let deleted = 0;
for (const name of DELETE_FROM_DOWNLOADS) {
  const p = join(DOWNLOADS, name);
  if (existsSync(p)) {
    unlinkSync(p);
    console.log(`  🗑  Deleted: ${name}`);
    deleted++;
  }
}

console.log(`\n─────────────────────────────────────────`);
console.log(`Moved:   ${moved}`);
console.log(`Skipped: ${skipped}`);
console.log(`Deleted: ${deleted}`);
if (missing.length) {
  console.log(`\n⚠️  MISSING PDFs (not found in Downloads):`);
  missing.forEach(m => console.log(`   - ${m}`));
} else {
  console.log(`\n✅ All PDFs accounted for!`);
}
