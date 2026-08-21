import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#070809] border-t border-[#1F2228] py-16 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="text-base font-bold text-[#F4F4F0]">
              SAGAR NEPALI <span className="text-[#67E8F9] font-normal">{"//"} SOFTWARE ENGINEER</span>
            </div>
            <p className="text-[#92969D] max-w-md font-sans">
              Available for full-stack architecture, technical leadership, and custom contract engineering.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-[#92969D]">
            <a
              href="https://github.com/alexsagar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F4F0] transition-colors"
            >
              GITHUB &rarr;
            </a>
            <a
              href="https://linkedin.com/in/alexsagar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F4F0] transition-colors"
            >
              LINKEDIN &rarr;
            </a>
            <a
              href="mailto:contact@sagar-nepali.com.np"
              className="hover:text-[#F4F4F0] transition-colors"
            >
              EMAIL &rarr;
            </a>
          </div>
        </div>

        <div className="border-t border-[#1F2228] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#92969D]">
          <div>
            &copy; {new Date().getFullYear()} SAGAR NEPALI. LICENSED UNDER MIT.
          </div>
          <div>
            BUILT WITH NEXT.JS 14 &bull; GSAP &bull; THREE.JS &bull; LENIS &bull; PAYLOAD CMS
          </div>
        </div>
      </div>
    </footer>
  );
}
