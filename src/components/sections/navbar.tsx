"use client";

import React, { useState, useEffect } from "react";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { cn } from "@/lib/utils";
import { scrollToSection, navigateFromPolicyPage } from "@/lib/scroll-utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  customNavLinks?: NavLink[];
}

export default function Navbar({ customNavLinks }: NavbarProps = {}) {
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const defaultNavLinks = [
    { name: t.nav.services, href: "#services" },
    { name: language === 'nl' ? 'Prijzen' : 'Pricing', href: "#prijzen" },
    { name: language === 'nl' ? 'Klantresultaten' : 'Case studies', href: "#case-studies" },
    { name: language === 'nl' ? 'Over ons' : 'About us', href: "#about" },
    { name: language === 'nl' ? 'Aanbevelingen' : 'Testimonials', href: "#testimonials" },
  ];

  const navLinks = customNavLinks || defaultNavLinks;

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Scroll spy runs on every page that has in-page sections, not just the
      // homepage: the service pages pass their own customNavLinks.
      const hashLinks = navLinks.filter(
        (link) => link.href.startsWith("#") && link.href !== "#"
      );
      if (hashLinks.length === 0) { setActiveSection(""); return; }

      const scrollPosition = window.scrollY + 100;
      if (scrollPosition < 200) { setActiveSection(""); return; }

      // getBoundingClientRect + scrollY rather than offsetTop: offsetTop is
      // relative to the nearest positioned ancestor, which gives wrong values
      // for sections nested inside a positioned wrapper.
      const sections = hashLinks
        .map((link) => {
          const id = link.href.replace("#", "");
          const el = document.getElementById(id);
          return el
            ? { id, position: el.getBoundingClientRect().top + window.scrollY }
            : null;
        })
        .filter((s): s is { id: string; position: number } => s !== null);

      sections.sort((a, b) => a.position - b.position);

      let current = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].position) {
          current = sections[i].id;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('/') && !href.startsWith('#')) {
      if (mobileMenuOpen) setMobileMenuOpen(false);
      return;
    }

    e.preventDefault();

    if (href === "#") {
      setActiveSection("");
    } else {
      setActiveSection(href.replace("#", ""));
    }

    // Close mobile menu first so body overflow is restored before scrolling
    const wasMobileOpen = mobileMenuOpen;
    if (wasMobileOpen) setMobileMenuOpen(false);

    const doScroll = () => {
      const handledPolicyNavigation = navigateFromPolicyPage(href);

      if (!handledPolicyNavigation) {
        if (href === "#") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const sectionId = href.replace("#", "");
          scrollToSection(sectionId);
        }
      }
    };

    // If mobile menu was open, wait for overflow:hidden to be removed before scrolling
    if (wasMobileOpen) {
      setTimeout(doScroll, 50);
    } else {
      doScroll();
    }
  };

  return (
    <>
      <header
        className={cn(
          // Always solid: a transparent bar let page content scroll through the
          // nav links and made them unreadable. The border only appears once
          // you scroll, so the bar still feels flush at the top.
          "fixed top-0 z-50 w-full transition-all duration-300 bg-background/95 backdrop-blur-xl",
          isScrolled || mobileMenuOpen
            ? "border-b border-foreground/10"
            : ""
        )}
      >
        <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-6 sm:px-10 lg:px-16">
          <div className="flex items-center flex-shrink-0">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "#")}
              className="flex items-center hover:opacity-70 transition-opacity"
            >
              <img
                src="/impulso-mark.png"
                alt="Impulso Co."
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <ul className="flex gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const isActive =
                  activeSection === link.href.replace("#", "") ||
                  (link.href === "#" && activeSection === "");
                return (
                  <li key={link.name} className="relative">
                    <a
                      href={link.href}
                      className={cn(
                        "text-sm font-normal tracking-normal whitespace-nowrap transition-colors duration-200",
                        isActive
                          ? "text-terracotta"
                          : "text-foreground/60 hover:text-terracotta"
                      )}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.name}
                    </a>
                    {/* Shared layoutId, so the bar slides from the previous
                        active item to this one instead of popping. */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-underline"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-terracotta"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-5">
              <a
                href="https://calendly.com/omarnassar1127/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-9 px-5 border border-foreground/40 text-sm font-medium text-foreground hover:border-terracotta hover:text-terracotta transition-colors duration-200"
              >
                {language === 'nl' ? 'Plan intake' : 'Book intake'}
              </a>
              <LanguageToggle />
            </div>
          </nav>

          {/* Mobile: language + hamburger */}
          <div className="flex items-center md:hidden gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center hover:bg-foreground/5 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background" />

            {/* Content */}
            <div className="relative h-full flex flex-col pt-20 pb-24 px-6">
              {/* Nav links, large, centered feel */}
              <nav className="flex-1 flex flex-col justify-center -mt-16">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.replace("#", "");
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.06, duration: 0.25 }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={cn(
                            "block py-4 text-3xl font-medium tracking-tight transition-colors",
                            isActive
                              ? "text-terracotta"
                              : "text-foreground/50 active:text-terracotta"
                          )}
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                className="space-y-4"
              >
                {/* Main CTA */}
                <a
                  href="https://calendly.com/omarnassar1127/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-medium py-4 text-sm active:bg-foreground/85 transition-colors"
                >
                  {language === "nl" ? "Plan gratis intake" : "Book free intake"}
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Contact row */}
                <div className="flex gap-3">
                  <a
                    href={`tel:${t.contact?.phoneNumber?.replace(/\s+/g, '') || '+31640495527'}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-foreground/30 text-sm font-medium text-foreground/70 active:bg-foreground/5 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {language === "nl" ? "Bel ons" : "Call us"}
                  </a>
                  <a
                    href={`mailto:${t.contact?.emailAddress || 'info@impulsoco.nl'}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-foreground/30 text-sm font-medium text-foreground/70 active:bg-foreground/5 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </div>

                {/* Subtle branding */}
                <p className="text-center text-xs text-muted-foreground/40 pt-2">
                  Impulso Co. Amsterdam, NL
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
