import { s } from "@/lib/stage";

// Breathing room under the fixed nav, tuned per page.
//
// WHY IT'S A COMPONENT AND NOT A CONSTANT
// Each page opens on different artwork and needs a different amount. Home
// opens on the medallion, which is meant to sit high; /music opens on a
// section header that the nav was sitting on top of. One shared value
// would be wrong somewhere.
//
// WHY TWO DIVS
// The desktop value is a --stage fraction so it tracks the nav's own
// proportional padding; the mobile value is fixed pixels, because at phone
// width a stage fraction collapses to almost nothing (0.03 of a 358px
// stage is 11px, against a mobile nav bar that's 76px tall). They can't be
// expressed as one number, and an inline min-height can't be overridden by
// a class — inline always wins — so each breakpoint gets its own element.
//
// TO ADJUST: change the props where this is used, not the defaults here.
//
//   desktop  fraction of the stage. 0.03 ≈ 41px at a 1366px stage.
//   mobile   plain pixels. The mobile nav bar is 76px tall (16 + 48 + 12).
export default function NavClearance({ desktop = 0.03, mobile = 56 }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="md:hidden"
        style={{ height: `${mobile}px` }}
      />
      <div
        aria-hidden="true"
        className="hidden md:block"
        style={{ height: s(desktop) }}
      />
    </>
  );
}
