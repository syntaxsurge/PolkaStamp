"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavMobile } from "./nav-mobile";
import type { NavItem } from "./nav-bar";
import { PolkadotLogo } from "../ui/polkadot-logo";
import Link from "next/link";

interface NavMobileControlProps {
  items: NavItem[];
}

export function NavMobileControl({ items }: NavMobileControlProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs transform bg-background shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b pl-4 pr-2">
          <Link href="/" className="flex items-end flex-col">
            <PolkadotLogo withPoweredBy={false} />
            <span className="text-[13px] font-light mr-1 -mt-1.5">
              App Starter
            </span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="size-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          <NavMobile items={items} />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}