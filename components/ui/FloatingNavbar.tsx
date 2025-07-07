"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Centered Desktop Navigation */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "hidden md:flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-black/.1 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-8 py-2 items-center justify-center space-x-4",
            className
          )}
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(17, 25, 40, 0.75)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
          }}
        >
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="text-sm !cursor-pointer">{navItem.name}</span>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Mobile Hamburger Menu Button in Top Right */}
      <AnimatePresence mode="wait">
        <motion.button
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          // Changed `rounded-full` to `rounded-lg`
          className="md:hidden fixed top-6 right-6 z-[5001] w-12 h-12 rounded-lg flex justify-center items-center"
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(17, 25, 40, 0.75)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isMenuOpen ? (
              // Close Icon (X)backdropFilter
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Custom Hamburger Icon
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 9h10"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 12h10"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 15h6"
                />
              </>
            )}
          </svg>
        </motion.button>
      </AnimatePresence>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="md:hidden fixed top-24 left-4 right-4 z-[5000] p-5 rounded-lg shadow-lg"
            style={{
              backdropFilter: "blur(16px) saturate(180%)",
              backgroundColor: "rgba(17, 25, 40, 0.75)",
              // This creates a very thin, subtle border
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex flex-col items-center space-y-6">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`mobile-link=${idx}`}
                  href={navItem.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white text-lg font-medium hover:text-neutral-300 transition-colors"
                >
                  {navItem.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
