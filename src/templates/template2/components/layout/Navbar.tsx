"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import config from "../../config.json"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent" style={{
              backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
            }}>
              ReadyBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/pricing"
              className="px-5 py-2.5 bg-[#1c6dd7] text-white rounded-lg font-medium button-glow"
              style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}
            >
              Write My Book
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#183d74] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-[#e0f0ff]"
        >
          <div className="px-4 py-5 space-y-4">
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>

            <div className="pt-2">
              <Link
                href="/pricing"
                className="block w-full px-5 py-3 text-white rounded-lg font-medium text-center"
                style={{
                  backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Write My Book
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[#183d74] hover:text-[#1857b2] transition-colors relative group"
    >
      {children}
      <span
        className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
        style={{
          backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
        }}
      ></span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block text-[#183d74] hover:text-[#1857b2] py-2 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 