"use client";

import { useEffect, useState } from "react";

// Dev-only helper: shows the live viewport width and which Tailwind
// breakpoint is currently active, so screenshots are self-documenting
// during design iteration. Renders nothing in a production build.
//
// Tailwind's default breakpoints:
//   base <640 · sm >=640 · md >=768 · lg >=1024 · xl >=1280 · 2xl >=1536
function activeBreakpoint(width) {
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "base";
}

export default function ViewportBadge() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (process.env.NODE_ENV === "production") return null;
  if (width === null) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "8px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        padding: "4px 10px",
        borderRadius: "999px",
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "#fff",
        font: "500 11px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace",
        letterSpacing: "0.05em",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      {width}px &middot; {activeBreakpoint(width)}
    </div>
  );
}
