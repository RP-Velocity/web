"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export default function Reveal({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      setVisible(true);
      return;
    }

    setAnimate(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        ...(animate
          ? {
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(36px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }
          : null),
      }}
    >
      {children}
    </div>
  );
}
