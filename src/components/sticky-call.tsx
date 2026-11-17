"use client";

import { useEffect, useState } from "react";
import { CallButton, ViberButton } from "./ui";

/** Mobilni: Pozovi + Viber uvijek pod palcem, nakon što hero izađe iz ekrana (UX princip 2). */
export function StickyCall() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.08] bg-navy-900/75 px-3 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="grid grid-cols-2 gap-2">
        <CallButton label="Pozovi" />
        <ViberButton variant="glass" label="Viber" />
      </div>
    </div>
  );
}
