import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Instagram,
  Phone,
  MapPin,
  Terminal,
  Shield,
  Cpu,
  Smartphone,
  Globe,
  Database,
  Wrench,
  Sparkles,
  ArrowUpRight,
  Radar,
  Video,
  Menu,
  X,
  Navigation,
  BarChart3,
  GraduationCap,
  Building2,
  Workflow,
  Gauge,
} from "lucide-react";

import profileImg from "./assets/profile.jpg";

/* ------------------------------------------------------------------ */
/*  Liquid-glass surface: a panel whose specular highlight tracks the  */
/*  pointer, simulating refraction across a curved glass sheet.        */
/* ------------------------------------------------------------------ */
function Glass({ as: Tag = "div", className = "", children, tilt = true, ...rest }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 30 });

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x, y });
  }, []);

  return (
    <Tag
      ref={ref}
      onMouseMove={tilt ? onMove : undefined}
      className={`glass-panel ${className}`}
      style={{ "--gx": `${pos.x}%`, "--gy": `${pos.y}%` }}
      {...rest}
    >
      <span className="glass-sheen" aria-hidden="true" />
      <span className="glass-edge" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Role cycler — typed/erased line in the hero terminal               */
/* ------------------------------------------------------------------ */
function useTypedCycle(words, typeMs = 55, holdMs = 1400, eraseMs = 30) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | holding | erasing

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let t;
    if (phase === "typing") {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), typeMs);
      } else {
        t = setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("erasing"), 10);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), eraseMs);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, wordIndex, words, typeMs, holdMs, eraseMs]);

  return text;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const ROLES = [
  "full-stack developer",
  "cybersecurity researcher",
  "OSINT analyst",
  "AI systems builder",
  "desktop & mobile developer",
];

const SKILL_GROUPS = [
  {
    label: "Languages",
    icon: Terminal,
    items: ["Python", "JavaScript", "TypeScript", "Rust", "Kotlin", "C++", "SQL", "HTML5", "CSS3"],
  },
  {
    label: "Frontend",
    icon: Globe,
    items: ["React", "Tailwind CSS", "Bootstrap", "Responsive Design", "Modern UI/UX"],
  },
  {
    label: "Backend",
    icon: Cpu,
    items: ["Django", "Flask", "REST APIs", "Authentication Systems", "Database Architecture"],
  },
  {
    label: "Mobile & Desktop",
    icon: Smartphone,
    items: ["Android (Kotlin)", "Desktop App Development", "Electron", "Cross-platform UI"],
  },
  {
    label: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "SQLite"],
  },
  {
    label: "DevOps & Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "Docker", "Linux"],
  },
  {
    label: "Cybersecurity",
    icon: Shield,
    items: [
      "OSINT",
      "Network Security",
      "Penetration Testing Fundamentals",
      "Network Enumeration",
      "Linux Security",
      "Wireshark",
      "Nmap",
      "Burp Suite",
      "Metasploit Framework",
    ],
  },
  {
    label: "Artificial Intelligence",
    icon: Sparkles,
    items: ["AI Integration", "Prompt Engineering", "Intelligent Automation", "LLM API Integration"],
  },
  {
    label: "Data & Analytics",
    icon: BarChart3,
    items: ["Data Science (Python)", "Power BI — Certified", "Data Analytics", "Business Intelligence"],
  },
];

const SERVICES = [
  { title: "Full-Stack Web Development", desc: "End-to-end web systems, from data layer to interface." },
  { title: "Backend API Development", desc: "REST APIs built for security, speed, and clean contracts." },
  { title: "Android App Development", desc: "Native Kotlin apps with a focus on performance and UX." },
  { title: "Desktop Application Development", desc: "Cross-platform desktop tools for teams and workflows." },
  { title: "Business Applications & BI", desc: "Secure business systems and intelligence software that simplify workflows and boost performance." },
  { title: "AI-Powered Applications", desc: "LLM integration and intelligent automation, built in." },
  { title: "Cybersecurity Research", desc: "OSINT tradecraft, enumeration, and applied pen-testing." },
  { title: "Automation Solutions", desc: "Systems that remove repetitive work from a workflow." },
  { title: "Technical Consulting", desc: "Architecture reviews and technology decisions, sanity-checked." },
];

const BUSINESS_PILLARS = [
  {
    title: "Secure by design",
    desc: "Business systems built to protect company data and operations from day one, not patched for security after launch.",
    icon: Shield,
  },
  {
    title: "Simplified workflows",
    desc: "Software that replaces scattered spreadsheets and manual steps with one clear, reliable system your team actually wants to use.",
    icon: Workflow,
  },
  {
    title: "Built to perform",
    desc: "Applications engineered for speed and reliability, so growth in usage never means a drop in performance.",
    icon: Gauge,
  },
];

const PROJECTS = [
  {
    title: "Navis",
    desc: "A free, offline-first personal navigation and location intelligence app. Navis uses GPS to track journeys, visualize routes, and manage important places — building a personalized map of visited locations with geofencing, route history, and location insights, all while keeping your geographic data under your control.",
    tags: ["Offline-first", "GPS", "Geofencing", "Privacy-first"],
    icon: Navigation,
  },
  {
    title: "Intelligence & OSINT Platform",
    desc: "An investigations platform combining AI-assisted analysis, metadata forensics, username correlation, and email intelligence into a single reporting workflow.",
    tags: ["Python", "React", "APIs", "SQLite"],
    icon: Radar,
  },
  {
    title: "Smart Traffic Management System",
    desc: "A live monitoring web app for road incidents and congestion, with route intelligence rendered over an interactive map layer.",
    tags: ["Django", "Leaflet", "OpenStreetMap", "JavaScript"],
    icon: Globe,
  },
  {
    title: "Business CRM System",
    desc: "A CRM covering customer records, invoicing, analytics dashboards, and reporting for day-to-day business operations.",
    tags: ["Django", "React", "MySQL"],
    icon: Database,
  },
  {
    title: "AI Automation Projects",
    desc: "A set of automation systems that fold AI into existing software workflows to cut down manual, repetitive work.",
    tags: ["Python", "LLM APIs", "Automation"],
    icon: Cpu,
  },
];

const PHILOSOPHY = [
  "Write clean, maintainable code.",
  "Design scalable software architectures.",
  "Prioritize security from the beginning.",
  "Build intuitive user experiences.",
  "Continuously learn and improve.",
  "Solve real-world problems through technology.",
];

const NAV = ["About", "Capabilities", "Services", "Projects", "Contact"];

/* ------------------------------------------------------------------ */
/*  Scanning readout — decorative, ties hero to the OSINT/security work */
/* ------------------------------------------------------------------ */
function ScanReadout() {
  const lines = [
    "target :: initializing session",
    "enumerating open services ...",
    "cross-referencing metadata",
    "correlating identifiers",
    "compiling report",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % lines.length), 1900);
    return () => clearInterval(t);
  }, [lines.length]);
  return (
    <div className="font-mono text-[11px] sm:text-xs text-teal-200/70 space-y-1.5">
      {lines.map((l, idx) => (
        <div
          key={l}
          className="flex items-center gap-2 transition-opacity duration-500"
          style={{ opacity: idx <= i ? 1 : 0.18 }}
        >
          <span className={idx === i ? "text-teal-300" : "text-teal-300/40"}>
            {idx < i ? "✓" : idx === i ? "›" : "·"}
          </span>
          <span className={idx === i ? "scan-caret" : ""}>{l}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                                */
/* ------------------------------------------------------------------ */
export default function Portfolio() {
  const typed = useTypedCycle(ROLES);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen text-slate-100 relative overflow-x-hidden" style={{ background: "#0a0d13" }}>
      <GlobalStyle />

      {/* ambient background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="blob blob-teal" />
        <div className="blob blob-violet" />
        <div className="noise-overlay" />
      </div>

      {/* ---------------- NAV ---------------- */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Glass tilt={false} className="glass-nav flex items-center justify-between px-4 sm:px-6 py-3">
            <a href="#top" className="flex items-center gap-2 font-display font-semibold tracking-tight text-[15px] sm:text-base">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-teal-300/90 to-violet-400/90 text-[#0a0d13] text-[13px] font-bold">
                EO
              </span>
              <span>Evans Opoku</span>
            </a>

            <nav className="hidden md:flex items-center gap-7 text-sm text-slate-300/90 font-medium">
              {NAV.map((n) => (
                <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-teal-200 transition-colors">
                  {n}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/White7-shark"
                target="_blank"
                rel="noreferrer"
                className="btn-neu p-2 rounded-lg"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a href="#contact" className="btn-primary text-sm px-4 py-2 rounded-lg">
                Start a project
              </a>
            </div>

            <button
              type="button"
              className="md:hidden btn-neu p-2.5 rounded-lg relative z-50"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </Glass>

          <div
            className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
              menuOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <Glass tilt={false} className="glass-nav px-5 py-5 flex flex-col gap-4 text-sm">
              {NAV.map((n) => (
                <a
                  key={n}
                  href={`#${n.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-200 py-1"
                >
                  {n}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-center py-2.5 rounded-lg"
              >
                Start a project
              </a>
            </Glass>
          </div>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-teal-300/80 mb-5">
            Kumasi, Ghana &middot; Available for select work
          </p>
          <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl sm:leading-[1.05] font-semibold text-white">
            Software, built with
            <br />
            a security mindset.
          </h1>
          <p className="mt-5 font-mono text-teal-200/90 text-base sm:text-lg h-7">
            {typed}
            <span className="caret">|</span>
          </p>
          <p className="mt-5 text-slate-300/85 max-w-xl leading-relaxed">
            I'm Evans — a software developer from Ghana building full-stack, mobile, and desktop
            applications, with cybersecurity, OSINT, and AI woven into how I design them, not
            bolted on afterward.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary px-6 py-3 rounded-xl inline-flex items-center gap-2">
              See my work <ArrowUpRight size={16} />
            </a>
            <a href="#contact" className="btn-neu px-6 py-3 rounded-xl">
              Get in touch
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5 text-slate-400">
            <a href="https://github.com/White7-shark" target="_blank" rel="noreferrer" className="hover:text-teal-200 transition-colors" aria-label="GitHub">
              <Github size={19} />
            </a>
            <a href="https://www.tiktok.com/@mr_tech075" target="_blank" rel="noreferrer" className="hover:text-teal-200 transition-colors" aria-label="TikTok">
              <Video size={19} />
            </a>
            <a href="https://instagram.com/mrtec.h7" target="_blank" rel="noreferrer" className="hover:text-teal-200 transition-colors" aria-label="Instagram">
              <Instagram size={19} />
            </a>
          </div>
        </div>

        {/* Signature liquid-glass terminal panel */}
        <Glass className="glass-terminal px-6 py-6 sm:px-7 sm:py-7">
          <div className="flex items-center gap-1.5 mb-5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-teal-300/70" />
            <span className="ml-3 font-mono text-[11px] text-slate-400/80">session.osint</span>
          </div>
          <ScanReadout />
          <div className="mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-2 gap-4">
            <div>
              <p className="font-display text-2xl font-semibold text-white">8+</p>
              <p className="text-[11px] text-slate-400 mt-0.5">specializations in active use</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-white">4</p>
              <p className="text-[11px] text-slate-400 mt-0.5">featured builds shipped</p>
            </div>
          </div>
        </Glass>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <SectionLabel>About</SectionLabel>
        <div className="grid lg:grid-cols-[1fr_0.7fr] gap-10 mt-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-snug">
              I turn ideas into software that holds up under scrutiny.
            </h2>
            <p className="mt-5 text-slate-300/85 leading-relaxed">
              My work spans full-stack web development, Android and desktop application
              development, cybersecurity, OSINT, and AI integration. I care about performance and
              user experience, but I start most projects by asking how they could be misused or
              broken — then design around that from the first line of code.
            </p>
            <p className="mt-4 text-slate-300/85 leading-relaxed">
              I'm especially drawn to business-facing software — CRMs, dashboards, and internal
              systems that a company runs on every day. I build those with the same security
              mindset I bring to OSINT work, so the tools that simplify a business's workflow
              are also the ones protecting it.
            </p>
            <p className="mt-4 text-slate-300/85 leading-relaxed">
              Outside of client and product work, I research digital privacy and emerging
              software architectures, and stay close to the security community through hands-on
              practice rather than theory alone.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Glass tilt={false} className="portrait-card p-2">
              <img
                src={profileImg}
                alt="Portrait of Evans Opoku"
                className="w-full aspect-square object-cover rounded-2xl"
              />
            </Glass>
            <div className="grid grid-cols-2 gap-3">
              <FactCard label="Based in" value="Ghana" icon={MapPin} />
              <FactCard label="Role" value="Software Developer" icon={Terminal} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <FactCard label="Focus" value="AI + Security" icon={Shield} />
          <FactCard label="Builds" value="Web, Mobile, Desktop" icon={Smartphone} />
          <FactCard label="Specialty" value="Business Systems & BI" icon={Building2} />
          <FactCard label="Education" value="Kumasi Technical University" icon={GraduationCap} sub="Second Class Upper" />
        </div>
      </section>

      {/* ---------------- CAPABILITIES ---------------- */}
      <section id="capabilities" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <SectionLabel>Capability stack</SectionLabel>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-4 max-w-xl">
          The layers I build with, from interface down to network.
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_GROUPS.map((group) => (
            <Glass key={group.label} className="p-5">
              <group.icon size={18} className="text-teal-300" />
              <h3 className="font-display font-semibold text-white mt-3 text-[15px]">{group.label}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </Glass>
          ))}
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section id="services" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <SectionLabel>Services</SectionLabel>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-4 max-w-xl">
          Where I can plug into your project.
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <Glass key={s.title} className="p-5">
              <h3 className="font-display font-semibold text-white text-[15px]">{s.title}</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{s.desc}</p>
            </Glass>
          ))}
        </div>
      </section>

      {/* ---------------- BUSINESS FOCUS ---------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <Glass className="px-6 py-10 sm:px-10 sm:py-12">
          <SectionLabel>Built for business</SectionLabel>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-4 max-w-lg">
            I build the systems businesses run on.
          </h2>
          <p className="mt-3 text-slate-300/85 max-w-xl leading-relaxed">
            Beyond individual products, this is where I spend most of my energy — powerful,
            secure business applications and business intelligence software that simplify how a
            company works and strengthen how it performs.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-5">
            {BUSINESS_PILLARS.map((b) => (
              <div key={b.title} className="neu-card p-5 rounded-xl">
                <b.icon size={18} className="text-teal-300" />
                <h3 className="font-display font-semibold text-white mt-3 text-[15px]">{b.title}</h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </Glass>
      </section>

      {/* ---------------- PROJECTS ---------------- */}
      <section id="projects" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <SectionLabel>Featured projects</SectionLabel>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-4 max-w-xl">
          A few builds worth a closer look.
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <Glass key={p.title} className="p-6 sm:p-7 group">
              <div className="flex items-start justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <p.icon size={18} className="text-violet-300" />
                </span>
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-teal-300 transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mt-4">{p.title}</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="chip chip-mono">
                    {t}
                  </span>
                ))}
              </div>
            </Glass>
          ))}
        </div>
      </section>

      {/* ---------------- PHILOSOPHY + CONTENT ---------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-6">
        <Glass className="p-7 sm:p-8">
          <SectionLabel>How I work</SectionLabel>
          <ul className="mt-5 space-y-3">
            {PHILOSOPHY.map((line) => (
              <li key={line} className="flex items-start gap-3 text-slate-300/90 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-300 shrink-0" />
                {line}
              </li>
            ))}
          </ul>
        </Glass>

        <Glass className="p-7 sm:p-8">
          <SectionLabel>Beyond the code</SectionLabel>
          <div className="mt-5 flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] shrink-0">
              <Video size={16} className="text-teal-300" />
            </span>
            <p className="text-sm text-slate-300/90 leading-relaxed">
              I also break tech topics down into short-form videos — quick, practical explainers
              rather than long tutorials — across TikTok, Instagram, and YouTube Shorts.
            </p>
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.15em] text-slate-500 font-mono">Also interested in</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Open Source", "Cloud Technologies", "Linux", "Ethical Hacking", "Emerging Tech"].map((i) => (
              <span key={i} className="chip">
                {i}
              </span>
            ))}
          </div>
        </Glass>
      </section>

      {/* ---------------- MOTTO ---------------- */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-14 text-center">
        <p className="font-display text-xl sm:text-2xl text-slate-200 leading-snug">
          "Building secure, intelligent, and impactful software
          <br className="hidden sm:block" /> — one project at a time."
        </p>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <Glass className="px-6 py-10 sm:px-14 sm:py-14 text-center">
          <SectionLabel center>Get in touch</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mt-4">
            Have a build in mind?
          </h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto">
            Open to full-stack, mobile, desktop, and security-focused work — reach out and tell
            me what you're building.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="tel:+233549007619" className="btn-primary px-6 py-3 rounded-xl inline-flex items-center gap-2">
              <Phone size={16} /> +233 549 007 619
            </a>
            <a
              href="https://github.com/White7-shark"
              target="_blank"
              rel="noreferrer"
              className="btn-neu px-6 py-3 rounded-xl inline-flex items-center gap-2"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-sm">
            <MapPin size={14} /> Ghana
          </div>
        </Glass>
      </section>

      <footer className="max-w-6xl mx-auto px-5 sm:px-8 pb-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <span>&copy; {new Date().getFullYear()} Evans Opoku</span>
        <div className="flex items-center gap-4">
          <a href="https://github.com/White7-shark" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">GitHub</a>
          <a href="https://www.tiktok.com/@mr_tech075" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">TikTok</a>
          <a href="https://instagram.com/mrtec.h7" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small presentational helpers                                       */
/* ------------------------------------------------------------------ */
function SectionLabel({ children, center }) {
  return (
    <p className={`font-mono text-[11px] tracking-[0.25em] uppercase text-teal-300/70 ${center ? "text-center" : ""}`}>
      / {children}
    </p>
  );
}

function FactCard({ label, value, icon: Icon, sub }) {
  return (
    <div className="neu-card p-4 rounded-xl">
      <Icon size={15} className="text-violet-300" />
      <p className="text-[11px] text-slate-400 mt-2">{label}</p>
      <p className="text-sm text-white font-medium mt-0.5 leading-snug">{value}</p>
      {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Global style block — fonts, glass system, neumorphic buttons        */
/* ------------------------------------------------------------------ */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Manrope:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

      .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
      body, .font-body { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      * { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; }

      html { scroll-behavior: smooth; }

      /* ambient blobs */
      .blob {
        position: absolute;
        border-radius: 9999px;
        filter: blur(90px);
        opacity: 0.35;
      }
      .blob-teal {
        width: 480px; height: 480px;
        top: -120px; left: -100px;
        background: radial-gradient(circle at 30% 30%, #34e7c4, transparent 70%);
      }
      .blob-violet {
        width: 520px; height: 520px;
        top: 30%; right: -160px;
        background: radial-gradient(circle at 60% 40%, #a78bfa, transparent 70%);
      }
      .noise-overlay {
        position: absolute; inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
        mix-blend-mode: overlay;
      }

      /* liquid glass panel */
      .glass-panel {
        position: relative;
        border-radius: 20px;
        background: rgba(255,255,255,0.045);
        border: 1px solid rgba(255,255,255,0.09);
        backdrop-filter: blur(18px) saturate(140%);
        -webkit-backdrop-filter: blur(18px) saturate(140%);
        box-shadow:
          0 1px 0 rgba(255,255,255,0.08) inset,
          0 20px 40px -20px rgba(0,0,0,0.6);
        overflow: hidden;
        transition: border-color 0.3s ease, transform 0.3s ease;
      }
      .glass-panel:hover { border-color: rgba(255,255,255,0.16); }
      .glass-sheen {
        position: absolute; inset: 0; pointer-events: none;
        background: radial-gradient(320px circle at var(--gx,50%) var(--gy,30%), rgba(255,255,255,0.14), transparent 60%);
        transition: opacity 0.2s ease;
        opacity: 0;
      }
      .glass-panel:hover .glass-sheen { opacity: 1; }
      .glass-edge {
        position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
      }
      .glass-nav { border-radius: 16px; }
      .glass-terminal { border-radius: 22px; }
      .portrait-card { border-radius: 22px; }
      .portrait-card img { border-radius: 16px; filter: grayscale(0.1) contrast(1.03); }

      /* neumorphic buttons on dark glass */
      .btn-neu, .btn-primary {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .btn-neu {
        background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
        border: 1px solid rgba(255,255,255,0.09);
        box-shadow: 3px 3px 8px rgba(0,0,0,0.35), -1px -1px 6px rgba(255,255,255,0.03);
        color: #e6e9f2;
        font-weight: 500;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .btn-neu:hover { transform: translateY(-1px); box-shadow: 4px 4px 10px rgba(0,0,0,0.4), -1px -1px 6px rgba(255,255,255,0.04); }
      .btn-neu:active { transform: translateY(0); box-shadow: inset 2px 2px 6px rgba(0,0,0,0.4); }

      .btn-primary {
        background: linear-gradient(135deg, #34e7c4, #7dd8ff);
        color: #061014;
        font-weight: 600;
        box-shadow: 0 10px 25px -8px rgba(52,231,196,0.45);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 30px -8px rgba(52,231,196,0.55); }
      .btn-primary:active { transform: translateY(0); }

      .neu-card {
        background: linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015));
        border: 1px solid rgba(255,255,255,0.07);
        box-shadow: 5px 5px 12px rgba(0,0,0,0.35), -3px -3px 10px rgba(255,255,255,0.02);
      }

      .chip {
        font-size: 11.5px;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        color: #cbd3e1;
        white-space: nowrap;
      }
      .chip-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; color: #9fe8d8; background: rgba(52,231,196,0.07); border-color: rgba(52,231,196,0.18); }

      .caret, .scan-caret::after {
        display: inline-block;
        animation: blink 1s steps(1) infinite;
      }
      .caret { color: #34e7c4; }
      @keyframes blink { 50% { opacity: 0; } }

      a:focus-visible, button:focus-visible {
        outline: 2px solid #34e7c4;
        outline-offset: 2px;
        border-radius: 8px;
      }

      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
      }
    `}</style>
  );
}
