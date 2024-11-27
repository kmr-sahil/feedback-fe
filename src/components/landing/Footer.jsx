import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#18191b] text-gray-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-[6rem]">
          {/* About Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-6">About</h2>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  How Trustpilot works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Transparency Report
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Press
                </Link>
              </li>
            </ul>
            ?
          </div>

          {/* Community Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-6">Community</h2>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Trust in reviews
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>

          {/* Businesses Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-6">Businesses</h2>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Trustpilot Business
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Business Login
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog for Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-6">Follow us on</h2>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  Linkedin
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  Youtube
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
