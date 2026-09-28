"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Minimal carousel state on top of a native CSS scroll-snap track.
 * Native scrolling keeps touch/trackpad/keyboard behaviour for free;
 * this hook only tracks the active slide and exposes prev/next.
 */
export function useCarousel<T extends HTMLElement = HTMLDivElement>() {
  const trackRef = useRef<T>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const left = track.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - track.offsetLeft - left);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setCount(slides.length);
    setIndex(nearest);
    setCanPrev(left > 4);
    setCanNext(left + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const prev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
  }, []);

  const next = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
  }, []);

  return { trackRef, index, count, canPrev, canNext, scrollTo, prev, next };
}
