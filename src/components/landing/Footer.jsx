import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#18191b] text-gray-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-[2rem] sm:px-[6rem]">
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
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Career
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  How Trustpilot works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Businesses Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-6">Business</h2>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Why Trustflag ? Talk with founders
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Talk to expert
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Need help setting up ?
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
            <h2 className="text-lg font-semibold mb-6">People</h2>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Write a Review
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
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Community
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
