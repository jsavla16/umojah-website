// ===================================================================
// ABOUT PAGE — MOBILE TUNING
// ===================================================================
//
// Every adjustable value for the About page's mobile layout, in one file.
// They used to live inside the three components, which made them hard to
// find. Nothing else affects mobile placement on this page.
//
// HOW x, y AND font WORK
//
//   x      Horizontal nudge.  "20px" moves RIGHT.  "-20px" moves LEFT.
//   y      Vertical nudge.    "20px" moves DOWN.   "-20px" moves UP.
//   font   Type size.         Bigger value = bigger text.
//   width  Element size.      Bigger value = bigger. Images keep their
//          proportions, so width alone changes height too — never set both.
//
// The direction of y is the one that catches people out: on screen the
// vertical axis points DOWNWARD from the top-left corner, so a positive
// number pushes an element further down the page, not up. It's the
// opposite of a graph.
//
// x and y are applied as CSS transforms, which move an element VISUALLY
// WITHOUT affecting layout. Nothing reflows, no neighbour shifts, the
// section's height doesn't change — so these are safe to experiment with,
// and you can always get back by setting them to "0px".
//
// It also means an element can be pushed clean off the edge of the screen
// if you go far enough. That's a feature, not a bug: it's how the
// festivals warrior gets cropped by the block edge the way the artboard
// shows it.
//
// Any CSS length works: "12px", "-2rem", "5%". Percentages resolve against
// the element's OWN size, not the screen — so "50%" on a warrior moves it
// half its own width, not half the page.

export const ABOUT_MOBILE = {
  // --- 2.1 The Sound System -----------------------------------------
  // The speaker stack. `raise` and `bleed` are real margins, not
  // transforms, because they're meant to change layout: raise pulls the
  // stack up alongside the last paragraph, bleed pulls The Crew up
  // underneath it so the stack overlaps into the terracotta.
  stack: {
    width: "86%",
    raise: "-4rem", // more negative = higher
    shiftRight: "6%", // higher = further right
    bleed: "-14%", // more negative = further into The Crew
  },

  // --- 2.2 The Crew --------------------------------------------------
  crew: {
    // Clearance under the bleeding speaker stack. Raise this to move the
    // whole mobile Crew header — heading and standfirst — down. If you
    // change stack.bleed above, expect to change this too; they're two
    // halves of the same overlap.
    headerTop: "4rem",
  },

  // --- 2.3 Collaborations & Festivals --------------------------------
  // Four independent elements. The warriors are shrink-0, so their width
  // is taken from the row and the list absorbs what's left — which is why
  // the artists panel (22 names) and the festivals panel (5 names) want
  // different numbers.
  // Terracotta panel — warrior on the LEFT, artist list on the right.
  warriorArtists: {
    width: "59%", // BIGGER value = wider AND taller figure (height follows
    //               the artwork's proportions, so one number does both).
    //               Also leaves the artist list less room beside it.
    x: "0px", //     MORE POSITIVE = moves RIGHT.  MORE NEGATIVE = LEFT.
    y: "0px", //     MORE POSITIVE = moves DOWN.   MORE NEGATIVE = UP.
  },

  // Bone panel — festival list on the left, warrior on the RIGHT.
  warriorFestivals: {
    width: "59%", // BIGGER = wider and taller. Can go much larger than the
    //               artists warrior: only five short names compete for the
    //               row, and running off the edge is what the artboard does.
    x: "0px", //     MORE POSITIVE = RIGHT (and off the screen edge, which
    //               is how you crop it).  MORE NEGATIVE = LEFT.
    y: "0px", //     MORE POSITIVE = DOWN.  MORE NEGATIVE = UP.
  },

  listArtists: {
    font: "0.8rem", // BIGGER = larger type. Raise it until a long name
    //                 wraps, then stop. Lowering this is the cheapest way
    //                 to buy room if the column feels squeezed.
    x: "0px", //       MORE POSITIVE = RIGHT.  MORE NEGATIVE = LEFT.
    y: "0px", //       MORE POSITIVE = DOWN.   MORE NEGATIVE = UP.
  },

  listFestivals: {
    font: "0.8rem", // BIGGER = larger type. Far more headroom here than
    //                 the artists list — five short names, nothing to wrap.
    x: "0px", //       MORE POSITIVE = RIGHT.  MORE NEGATIVE = LEFT.
    y: "0px", //       MORE POSITIVE = DOWN.   MORE NEGATIVE = UP.
  },
};

// Builds the transform string. Returns undefined when both offsets are
// zero so we don't stamp a pointless transform onto every element —
// a transform also creates a stacking context, which can quietly change
// what paints over what.
export const shift = ({ x = "0px", y = "0px" } = {}) =>
  x === "0px" && y === "0px" ? undefined : `translate(${x}, ${y})`;
