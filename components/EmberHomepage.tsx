"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets, type ResponsiveAsset } from "@/lib/assets";

const navItems = [
  { label: "Dusk", href: "#top" },
  { label: "Design", href: "#design" },
  { label: "Interior", href: "#interior" },
  { label: "Experience", href: "#experience" },
];

const stats = [
  { value: 390, display: "390", unit: "mi", label: "EPA-est. range" },
  { value: 3.6, display: "3.6", unit: "sec", label: "0-60 mph", decimals: 1 },
  { value: 58900, display: "$58,900", prefix: "$", unit: "", label: "Starting at", currency: true },
  { display: "Private", unit: "", label: "Test drives" },
];

const exteriorChapters = [
  {
    title: "A profile drawn in one calm line.",
    label: "Silhouette",
    text: "The Dusk carries the stance of an SUV and the tension of a coupe, with warm reflections revealing its shoulder, roofline, and planted wheelbase.",
    asset: assets.exterior[4],
  },
  {
    title: "Presence without theatre.",
    label: "Stance",
    text: "A low nose, precise light signature, and sculpted front surfaces create confidence without leaning on aggressive performance cues.",
    asset: assets.exterior[0],
  },
  {
    title: "Performance begins at the contact patch.",
    label: "Wheel detail",
    text: "Large wheels, quiet brake hardware, and a taut shoulder line give the Dusk its athletic stance without breaking the calm.",
    asset: assets.exterior[2],
  },
  {
    title: "The rear view stays composed.",
    label: "Departure",
    text: "Clean rear volume and a low, warm light signature make the final glance as deliberate as the first approach.",
    asset: assets.exterior[5],
  },
  {
    title: "The light signature is drawn, not decorated.",
    label: "Light",
    text: "Thin illumination and quiet front surfaces turn technology into atmosphere, visible only where it sharpens the form.",
    asset: assets.exterior[3],
  },
];

const features = [
  {
    title: "Range without compromise",
    meta: "390 miles",
    text: "A 390-mile electric range gives long days room to breathe, without asking the design to feel utilitarian.",
    icon: assets.features.icons.range,
  },
  {
    title: "Performance without noise",
    meta: "3.6 seconds",
    text: "0-60 mph in 3.6 seconds, delivered with the smoothness and silence expected of a luxury electric drive.",
    icon: assets.features.icons.performance,
  },
  {
    title: "Luxury without excess",
    meta: "Edited cabin",
    text: "Warm materials, quiet interfaces, and precise proportions keep the Dusk sensual without becoming ornate.",
    icon: assets.features.icons.luxury,
  },
  {
    title: "Technology that disappears",
    meta: "Smoked glass UI",
    text: "Smoked glass displays and integrated controls stay close at hand, then recede when the road becomes the focus.",
    icon: assets.features.icons.technology,
  },
  {
    title: "A private first drive",
    meta: "One-to-one",
    text: "The Dusk is introduced through a calm one-to-one test drive experience, not a dealership floor.",
    icon: assets.features.icons.drive,
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.9, delay, ease: revealEase }}
    >
      {children}
    </motion.div>
  );
}

function Picture({
  asset,
  className,
  sizes = "(max-width: 760px) 100vw, 100vw",
  loading = "lazy",
}: {
  asset: ResponsiveAsset;
  className?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={asset.mobile} sizes={sizes} />
      <img className={className} src={asset.desktop} alt={asset.alt} loading={loading} />
    </picture>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4.2 9h9.1" />
      <path d="m9.6 5.3 3.7 3.7-3.7 3.7" />
    </svg>
  );
}

function FeatureMark({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="feature-icon-chip" aria-hidden="true">
      <img src={icon} alt="" loading="lazy" />
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="15.5" />
        <path d="M15 25.5h18" />
        <path d="M24 15v18" />
        <path d="M18.5 18.5 29.5 29.5" />
      </svg>
      <span>{title.slice(0, 1)}</span>
    </div>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
    </span>
  );
}

function CountUpStat({ stat }: { stat: (typeof stats)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.72 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(stat.display);

  useEffect(() => {
    if (!isInView || !("value" in stat) || typeof stat.value !== "number") return;
    if (reduceMotion) return;

    const controls = animate(0, stat.value, {
      duration: 1.25,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (stat.currency) {
          setDisplay(`${stat.prefix ?? ""}${Math.round(latest).toLocaleString("en-US")}`);
          return;
        }

        setDisplay(latest.toFixed(stat.decimals ?? 0));
      },
    });

    return () => controls.stop();
  }, [isInView, reduceMotion, stat]);

  return (
    <strong ref={ref}>
      {display}
      {stat.unit && <span>{stat.unit}</span>}
    </strong>
  );
}

export default function EmberHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const exteriorRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const activeExterior = exteriorChapters[activeChapter] ?? exteriorChapters[0];
  const featureProofLabels = useMemo(() => ["Surface proof", "Material proof"], []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (reduceMotion || !exteriorRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".chapter-panel");

      panels.forEach((panel, index) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveChapter(index),
          onEnterBack: () => setActiveChapter(index),
        });
      });

      const stageImages = gsap.utils.toArray<HTMLElement>(".stage-image img");

      stageImages.forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.025, yPercent: -1.6 },
          {
            scale: 1.075,
            yPercent: 1.6,
            ease: "none",
            scrollTrigger: {
              trigger: exteriorRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });
    }, exteriorRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const handleChapterSelect = (index: number) => {
    const panel = exteriorRef.current?.querySelectorAll<HTMLElement>(".chapter-panel")[index];
    panel?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    setActiveChapter(index);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ember Motors home">
          <BrandMark />
          Ember Motors
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#test-drive">
          Schedule Drive
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
            <ArrowIcon />
          </a>
        ))}
        <a className="mobile-menu-cta" href="#test-drive" onClick={() => setMenuOpen(false)}>
          Schedule a Private Test Drive
        </a>
      </div>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <Picture asset={assets.hero} loading="eager" sizes="100vw" />
        </div>
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-frame" aria-hidden="true" />
        <motion.div
          className="hero-content"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.16 } },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 34 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: revealEase } },
            }}
          >
            Quiet power, shaped by dusk.
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: revealEase } },
            }}
          >
            The Ember Dusk is a luxury electric SUV coupe built for drivers who
            want elegance and raw power in equal measure.
          </motion.p>
          <motion.div
            className="hero-actions"
            aria-label="Hero actions"
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.82, ease: revealEase } },
            }}
          >
            <a className="button button-dark" href="#test-drive">
              Schedule a Private Test Drive
              <ArrowIcon />
            </a>
            <a className="button button-glass" href="#waitlist">
              Join the Waitlist
            </a>
          </motion.div>
        </motion.div>
        <div className="hero-spec">
          <span>390-mile range</span>
          <span>0-60 mph in 3.6 sec</span>
          <span>From $58,900</span>
        </div>
        <a className="scroll-cue" href="#design" aria-label="Scroll to exterior design">
          <span />
        </a>
      </section>

      <motion.section
        className="stats-band"
        aria-label="Ember Dusk key statistics"
        initial={reduceMotion ? false : { opacity: 0, y: 34 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.85, ease: revealEase }}
      >
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <CountUpStat stat={stat} />
            <p>{stat.label}</p>
          </div>
        ))}
      </motion.section>

      <section className="exterior" id="design" ref={exteriorRef}>
        <Reveal className="chapter-heading">
          <span>Exterior</span>
          <h2>Built for a drive that feels more like arrival.</h2>
          <p>
            Warm precision defines the Dusk through a composed coupe silhouette,
            long-range proportion, and surfaces that hold light without shouting.
          </p>
        </Reveal>

        <div className="exterior-showcase">
          <div className="chapter-rail">
            {exteriorChapters.map((chapter, index) => (
              <article className="chapter-panel" key={chapter.title}>
                <div className="chapter-copy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p className="chapter-label">{chapter.label}</p>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.text}</p>
                </div>
                <div className="chapter-mobile-image">
                  <Picture asset={chapter.asset} />
                </div>
              </article>
            ))}
          </div>

          <div className="exterior-stage">
            <div className="stage-frame">
              {exteriorChapters.map((chapter, index) => (
                <div
                  className={`stage-image ${activeChapter === index ? "is-active" : ""}`}
                  key={chapter.title}
                >
                  <Picture asset={chapter.asset} />
                </div>
              ))}
              <div className="stage-progress" aria-label="Exterior chapter progress">
                {exteriorChapters.map((chapter, index) => (
                  <button
                    aria-label={`View ${chapter.label} chapter`}
                    className={activeChapter === index ? "is-active" : ""}
                    key={chapter.label}
                    onClick={() => handleChapterSelect(index)}
                    type="button"
                  />
                ))}
              </div>
              <div className="stage-caption">
                <span>{activeExterior.label}</span>
                <strong>{String(activeChapter + 1).padStart(2, "0")}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="interior" id="interior">
        <div className="interior-stage">
          <motion.div
            className="interior-image"
            initial={reduceMotion ? false : { opacity: 0, y: 56, scale: 0.94 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.34 }}
            transition={{ duration: 1.05, ease: revealEase }}
          >
            <Picture asset={assets.interior.main} />
          </motion.div>
          <motion.div
            className="interior-material-card"
            initial={reduceMotion ? false : { opacity: 0, x: -28, y: 28, scale: 0.96 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{ duration: 0.9, delay: 0.18, ease: revealEase }}
          >
            <strong>Cabin temperature</strong>
            <span>Warm light, quiet glass, tactile surfaces</span>
          </motion.div>
        </div>
        <Reveal className="interior-copy" delay={0.08}>
          <span>Interior</span>
          <h2>A cabin that lets the technology disappear.</h2>
          <p>
            Smoked glass interfaces, ambient warmth, and tactile materials make
            the Dusk feel calm before the first mile.
          </p>
          <motion.div
            className="interior-detail-grid"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.36 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
          >
            <motion.figure
              variants={{
                hidden: { opacity: 0, x: -34, y: 24, scale: 0.92 },
                visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.86, ease: revealEase } },
              }}
            >
              <Picture asset={assets.interior.console} />
              <figcaption>Smoked glass controls</figcaption>
            </motion.figure>
            <motion.figure
              variants={{
                hidden: { opacity: 0, x: 34, y: 24, scale: 0.92 },
                visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.86, ease: revealEase } },
              }}
            >
              <Picture asset={assets.interior.material} />
              <figcaption>Soft-touch material proof</figcaption>
            </motion.figure>
          </motion.div>
        </Reveal>
      </section>

      <section className="features" id="experience">
        <Reveal className="features-header">
          <div>
            <span>Why Ember</span>
            <h2>Luxury electric performance, edited down to what matters.</h2>
          </div>
          <p>
            Five quiet decisions shape the Dusk: long range, silent pace,
            restrained materiality, invisible technology, and a private first
            drive.
          </p>
        </Reveal>

        <div className="feature-editorial">
          <div className="feature-list">
            {features.map((feature, index) => (
              <motion.article
                className="feature-item"
                key={feature.title}
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.38 }}
                transition={{ duration: 0.78, delay: index * 0.055, ease: revealEase }}
              >
                <div className="feature-number">{String(index + 1).padStart(2, "0")}</div>
                <FeatureMark icon={feature.icon} title={feature.title} />
                <div className="feature-copy">
                  <span>{feature.meta}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <Reveal className="feature-proof" delay={0.12}>
            {assets.features.details.map((asset, index) => (
              <div className="feature-media" key={asset.desktop}>
                <Picture asset={asset} />
                <span>{featureProofLabels[index] ?? "Product proof"}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="test-drive" id="test-drive">
        <div className="test-drive-media">
          <Picture asset={assets.cta} />
        </div>
        <Reveal className="test-drive-panel">
          <span>Private Test Drive</span>
          <h2>An introduction arranged around you.</h2>
          <p>
            Step into a one-to-one drive appointment designed around your day,
            your roads, and your pace.
          </p>
          <div className="appointment-grid" aria-label="Private test drive details">
            <div>
              <strong>Format</strong>
              <span>One-to-one</span>
            </div>
            <div>
              <strong>Duration</strong>
              <span>45 minutes</span>
            </div>
            <div>
              <strong>Availability</strong>
              <span>Select cities</span>
            </div>
          </div>
          <div className="test-drive-actions">
            <a className="button button-dark" href="mailto:drive@embermotors.example">
              Schedule a Private Test Drive
              <ArrowIcon />
            </a>
            <a className="button button-light" id="waitlist" href="mailto:waitlist@embermotors.example">
              Join the Waitlist
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="footer-media" aria-hidden="true" />
        <div className="footer-inner">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <BrandMark />
              Ember Motors
            </a>
            <p>Quiet power for the next kind of luxury drive.</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#dusk">Dusk</a>
            <a href="#design">Design</a>
            <a href="#interior">Interior</a>
            <a href="#test-drive">Test Drive</a>
          </nav>
          <div className="footer-actions">
            <a href="#test-drive">Schedule Drive</a>
            <a href="#waitlist">Join Waitlist</a>
          </div>
          <small>
            Ember Dusk specifications shown for concept purposes. Availability
            and final configuration may vary.
          </small>
        </div>
      </footer>
    </main>
  );
}
