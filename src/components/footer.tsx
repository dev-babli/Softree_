"use client";

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-black via-gray-900 to-gray-800 text-white">
      {/* Top: Logo & Company Name with Social Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          {/* <img
            src="/softree-logo.png" // replace with your logo path
            alt="Softree Technology Logo"
            className="h-10 w-auto"
          /> */}
          <span className="text-xl font-bold">Softree Technology</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Important Links */}
        <div>
          <h5 className="text-lg font-semibold mb-4 uppercase">
            Important Links
          </h5>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.softreetechnology.com/about/"
                className="hover:underline"
              >
                About Softree Technology
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/team/"
                className="hover:underline"
              >
                Meet Our Team
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/case-studies/"
                className="hover:underline"
              >
                Case Studies
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/blog"
                className="hover:underline"
              >
                Tech Blog
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/contact/"
                className="hover:underline"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/get-a-quote/"
                className="hover:underline"
              >
                Get a Quote
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Services for Developers */}
        <div>
          <h5 className="text-lg font-semibold mb-4 uppercase">Are You?</h5>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.softreetechnology.com/mobile-app-development/"
                className="hover:underline"
              >
                Looking for MERN Developers?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/full-stack-development/"
                className="hover:underline"
              >
                Looking for Full Stack Developers?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/react-development/"
                className="hover:underline"
              >
                Looking for React Developers?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/flutter-development/"
                className="hover:underline"
              >
                Looking for Flutter Developers?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/ios-development/"
                className="hover:underline"
              >
                Looking for iOS Developers?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/angular-development/"
                className="hover:underline"
              >
                Looking for Angular Developers?
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: SharePoint & Power Apps */}
        <div>
          <h5 className="text-lg font-semibold mb-4 uppercase">Are You?</h5>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.softreetechnology.com/sharepoint-development/"
                className="hover:underline"
              >
                Looking for SharePoint Developers?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/powerapps-development/"
                className="hover:underline"
              >
                Looking for Power Apps Developers?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/power-automate-development/"
                className="hover:underline"
              >
                Looking for Power Automate Developers?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/sharepoint-migration/"
                className="hover:underline"
              >
                Looking for SP Migration Expert?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/spfx-development/"
                className="hover:underline"
              >
                Looking for SPFx & React Developers?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/power-pages/"
                className="hover:underline"
              >
                Looking for Power Pages Developers?
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/power-bi/"
                className="hover:underline"
              >
                Looking for Power BI Developers?
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Our Presence */}
        <div>
          <h5 className="text-lg font-semibold mb-4 uppercase">Our Presence</h5>
          <div className="mb-4">
            <h6 className="font-medium">United States</h6>
            <p>166 Geary St. STE 1500 #2439, San Francisco, CA 94108</p>
          </div>
          <div className="mb-4">
            <h6 className="font-medium">India</h6>
            <p>PLOT 5C/1283, SECTOR-10, CDA, Cuttack, Odisha 753014</p>
            <p>Flat B308, Kempapura, Bengaluru, 560037</p>
          </div>
          <div className="flex space-x-4 mt-2 text-gray-400">
            <a
              href="https://www.facebook.com/softreetechnology"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/softreetechnology/"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/softree-technology-pvt-ltd/"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.youtube.com/@softreetechnologypvt.ltd.9452"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright & policies */}
      <div className="border-t border-gray-700 mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            © 2024 Softree Technology, All rights reserved.
          </div>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://www.softreetechnology.com/privacy-policy/"
                className="hover:underline"
              >
                Term of Use - Softree Technology
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/privacy-policy/"
                className="hover:underline"
              >
                Privacy Policy - Softree Technology
              </a>
            </li>
            <li>
              <a
                href="https://www.softreetechnology.com/privacy-policy/"
                className="hover:underline"
              >
                Cookie Policy - Softree Technology
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
