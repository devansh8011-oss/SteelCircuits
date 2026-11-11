import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollCurve.css';

// Plugin registration is idempotent — Footer also registers it. Doing it here
// keeps this component self-contained.
gsap.registerPlugin(ScrollTrigger);

// Below this width we use the compact mobile side-channel curve geometry.
const MOBILE_BREAKPOINT = 720;

// The hero headline lifts upward on scroll (Hero.css: --hero-blur drives a
// translateY of up to --hero-lift-max = 55vh). getBoundingClientRect() sees
// that transform, so we add the lift back to recover the "I"'s at-rest position
// and keep the curve's start point stable no matter where the user is scrolled.
const HERO_LIFT_VH = 0.55;

// The span's bounding box extends ~0.2em below the glyph's baseline (the line
// box's descent area). Lift the start up by this fraction of the font size so
// the stroke begins at the "I"'s visible bottom — a hair of overlap so it reads
// as the letter extending, with no gap. Tune if you see a gap or overlap.
const BASELINE_NUDGE = 0.2;

// Cached canvas for measuring the "I"'s ink width (same trick Footer uses).
let measureCtx;
function stemWidth(weight, fontSize, fontFamily) {
  measureCtx = measureCtx || document.createElement('canvas').getContext('2d');
  measureCtx.font = `${weight} ${fontSize}px ${fontFamily}`;
  const m = measureCtx.measureText('I');
  // actualBoundingBox L+R = the glyph's inked horizontal extent = stem width.
  return m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
}

// Current value of Hero's scroll-driven --hero-blur (set as an inline style on
// <html>), 0..1. Cheap to read; drives how far the headline has lifted.
function currentBlur() {
  return parseFloat(document.documentElement.style.getPropertyValue('--hero-blur')) || 0;
}

// Compute responsive cubic-Bézier points routed cleanly into the right-side
// whitespace so the curve extends from "I" along the side without overlapping
// the hero headline ("NOT JUST / WEBSITES — I / BUILD ...") or the Roles list.
function computeSegments({ sx0, sy0, W, H, stem, headlineBottomY, headlineRightX, rolesTopY, rolesBottomY, rolesRightX }) {
  const isMobile = W <= MOBILE_BREAKPOINT;
  const edgePad = isMobile ? Math.max(12, stem * 1.4) : Math.max(32, W * 0.035);
  const maxRightX = W - edgePad;

  // 1. Clear Hero cleanly to the right side of the headline (never cutting left across BUILD / word)
  const heroClearX = isMobile
    ? Math.min(maxRightX, Math.max(sx0 + 18, headlineRightX + 18))
    : Math.min(maxRightX, Math.max(sx0 + W * 0.08, headlineRightX + W * 0.035));

  const belowHeroY = Math.max(sy0 + H * 0.14, headlineBottomY + H * 0.03);
  const gapMidY = (belowHeroY + rolesTopY) * 0.5;

  // 2. Clear Roles cleanly in the open right gutter
  const rolesClearX = isMobile
    ? maxRightX
    : Math.min(maxRightX, Math.max(heroClearX + W * 0.03, rolesRightX + W * 0.04));

  const rolesMidY = (rolesTopY + rolesBottomY) * 0.5;
  const belowRolesY = Math.min(H * 0.9, Math.max(rolesBottomY + H * 0.04, rolesMidY + H * 0.15));

  // Gentle mid-gap wave x-coordinate (stays right of center so it adds rhythm in the gap)
  const gapWaveX = isMobile
    ? Math.max(sx0 * 0.72, W * 0.62)
    : Math.max(rolesClearX - W * 0.09, heroClearX - W * 0.03);

  return [
    // Segment 1: drop briefly straight from "I" stem, then sweep outward right past Hero
    {
      c1x: sx0,
      c1y: sy0 + (belowHeroY - sy0) * 0.42,
      c2x: heroClearX,
      c2y: sy0 + (belowHeroY - sy0) * 0.52,
      ex: heroClearX,
      ey: belowHeroY,
    },
    // Segment 2: expressive S-curve inside the open vertical gap between Hero & Roles
    {
      c1x: heroClearX,
      c1y: belowHeroY + (gapMidY - belowHeroY) * 0.65,
      c2x: gapWaveX,
      c2y: gapMidY - (rolesTopY - gapMidY) * 0.2,
      ex: gapWaveX,
      ey: Math.min(rolesTopY - H * 0.03, gapMidY + H * 0.03),
    },
    // Segment 3: glide out to the right margin alongside Roles without crossing Roles text
    {
      c1x: gapWaveX,
      c1y: rolesTopY + (rolesMidY - rolesTopY) * 0.1,
      c2x: rolesClearX,
      c2y: rolesTopY + (rolesMidY - rolesTopY) * 0.45,
      ex: rolesClearX,
      ey: rolesMidY,
    },
    // Segment 4: continue down clear side margin below Roles, then exit off bottom-right
    {
      c1x: rolesClearX,
      c1y: belowRolesY,
      c2x: isMobile ? W * 0.74 : rolesClearX - W * 0.04,
      c2y: H * 0.94,
      ex: W * 1.06,
      ey: H * 1.05,
    },
  ];
}

// Assemble the path `d`: an explicit start point + the precomputed downstream
// bézier points. Only the start moves per frame; the rest stays anchored.
function buildD(sx, sy, pts) {
  let d = `M ${sx.toFixed(1)} ${sy.toFixed(1)}`;
  for (const p of pts) {
    d += ` C ${p.c1x.toFixed(1)} ${p.c1y.toFixed(1)}, ${p.c2x.toFixed(1)} ${p.c2y.toFixed(1)}, ${p.ex.toFixed(1)} ${p.ey.toFixed(1)}`;
  }
  return d;
}

/**
 * Draws an SVG curve from the base of the hero's standalone "I" down along the side
 * into the roles section, scrubbed by scroll via GSAP ScrollTrigger (smoothed by the
 * Lenis instance App already drives into ScrollTrigger.update).
 *
 * `regionRef` must point at a position:relative wrapper around BOTH
 * section.hero and section.roles-section.
 */
export default function ScrollCurve({ regionRef }) {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const region = regionRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!region || !svg || !path) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx = null;
    // Geometry shared with the per-frame tick(): rest start + downstream points.
    let frame = null;
    let lastLift = -1;

    const build = () => {
      // Tear down any previous tween + trigger before remeasuring.
      if (ctx) {
        ctx.revert();
        ctx = null;
      }
      frame = null;

      const anchor = region.querySelector('.curve-anchor');
      if (!anchor) {
        svg.style.display = 'none';
        return;
      }
      svg.style.display = '';

      // Region pixel box -> viewBox so 1 SVG user unit == 1 px.
      const regionRect = region.getBoundingClientRect();
      const W = regionRect.width;
      const H = regionRect.height;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

      // REST start point: bottom of the "I"'s glyph with the headline lift
      // removed. a.bottom already includes the current lift, so add it back to
      // recover the at-rest position. The downstream curve is anchored to this;
      // the LIVE start is tracked per frame in tick() so it follows the "I" as
      // the headline lifts on scroll and never detaches.
      const a = anchor.getBoundingClientRect();
      const cs = getComputedStyle(anchor);
      const fs = parseFloat(cs.fontSize) || a.height;
      const lift0 = currentBlur() * window.innerHeight * HERO_LIFT_VH;
      const sx0 = a.left + a.width / 2 - regionRect.left;
      // Lift to the glyph baseline so the curve starts AT the bottom of the "I".
      const sy0 = a.bottom - regionRect.top + lift0 - fs * BASELINE_NUDGE;

      // Match the stroke to the "I"'s stem so the line looks like the letter
      // extending. Fall back to the CSS width if metrics are unavailable.
      const rawStem = stemWidth(cs.fontWeight, fs, cs.fontFamily);
      const stem = rawStem > 0 ? rawStem : (W <= MOBILE_BREAKPOINT ? 6 : 12);
      path.style.strokeWidth = `${stem}`;

      // Measure Hero headline and Roles list resting bounds for collision-free routing
      const headlineEl = region.querySelector('.hero-headline');
      const rolesListEl = region.querySelector('.roles-list');
      const hRect = headlineEl ? headlineEl.getBoundingClientRect() : a;
      const rRect = rolesListEl ? rolesListEl.getBoundingClientRect() : {
        top: regionRect.top + H * 0.65,
        bottom: regionRect.top + H * 0.85,
        right: regionRect.left + W * 0.75,
      };

      const pts = computeSegments({
        sx0,
        sy0,
        W,
        H,
        stem,
        headlineBottomY: hRect.bottom - regionRect.top + lift0,
        headlineRightX: hRect.right - regionRect.left,
        rolesTopY: rRect.top - regionRect.top,
        rolesBottomY: rRect.bottom - regionRect.top,
        rolesRightX: rRect.right - regionRect.left,
      });
      frame = { sx0, sy0, pts };
      lastLift = -1; // force tick() to redraw with the new geometry

      // Normalise the dash to the path length via pathLength=1, so tick() can
      // rewrite the geometry every frame without disturbing the draw progress.
      path.setAttribute('pathLength', '1');
      path.setAttribute('d', buildD(sx0, sy0, pts));
      path.style.strokeDasharray = '1';
      path.style.strokeDashoffset = reduce ? '0' : '1';

      if (reduce) return; // no scrubbed draw under reduced motion

      const roles = region.querySelector('.roles-section');
      ctx = gsap.context(() => {
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            // Trigger on the "I" itself so the draw STARTS from it, rather than
            // from the top of the region (which you scroll past well before the
            // "I" is in view — that's why it looked already-drawn).
            trigger: anchor,
            start: 'top 38%', // begins smoothly as the "I" lifts toward the upper third
            endTrigger: roles || region,
            end: 'bottom center', // finishes as the roles section passes center
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }, region);

      ScrollTrigger.refresh();
    };

    // Per-frame: move ONLY the path's start to follow the "I"'s live lift,
    // keeping the downstream curve anchored. Reads one inline CSS var; the
    // normalised dash keeps the drawn fraction intact as geometry changes.
    const tick = () => {
      if (!frame) return;
      const lift = currentBlur() * window.innerHeight * HERO_LIFT_VH;
      if (lift === lastLift) return;
      lastLift = lift;
      path.setAttribute('d', buildD(frame.sx0, frame.sy0 - lift, frame.pts));
    };
    gsap.ticker.add(tick);

    build();

    const onResize = () => build();
    window.addEventListener('resize', onResize);

    // The "I" position depends on layout + the webfont; rebuild once both settle.
    const onLoad = () => build();
    window.addEventListener('load', onLoad);
    let cancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) build();
      });
    }

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onLoad);
      if (ctx) ctx.revert();
    };
  }, [regionRef]);

  return (
    <svg
      ref={svgRef}
      className="scroll-curve"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path ref={pathRef} className="scroll-curve-path" fill="none" />
    </svg>
  );
}
