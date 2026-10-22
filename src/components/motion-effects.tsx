"use client";

import { useEffect } from "react";

/** Adds scroll reveals progressively, so content stays visible if JavaScript fails. */
export function MotionEffects() {
  useEffect(() => {
    const revealTargets = [
      "#about", "#services .physio-service-card", "#testimonials",
      "#contact > .booking-promo", "#contact > .booking-form-card", "#contact > .clinic-info-card",
      ".expertise-strip", ".physio-faq", ".details-service-section", ".details-split > div",
      ".services-page-cta",
    ].join(",");
    const elements = document.querySelectorAll<HTMLElement>(revealTargets);
    elements.forEach((element) => element.dataset.reveal = "");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

    elements.forEach((element) => observer.observe(element));
    document.documentElement.classList.add("motion-ready");

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
