const { useState, useEffect, useRef } = React;

/* =========================================================
   DATA
   ========================================================= */

const TAGLINES = [
  "Software engineer and ML researcher, based in Nairobi.",
  "Worked at Google and the UN before graduating.",
  "Climate systems, healthcare ML, humanitarian tech.",
  "Fresh graduate. Serious builder. First-generation all the way.",
];

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "leadership", label: "Leadership" },
  { id: "thinking", label: "Thinking" },
  { id: "life", label: "Life" },
  { id: "contact", label: "Contact" },
];

const TICKER = [
  { num: "5,600+", label: "Records processed at Google", href: "#experience" },
  { num: "50+", label: "CSOs mapped across 3 regions", href: "#experience" },
  { num: "500+", label: "Beneficiaries tracked at ALA", href: "#experience" },
  { num: "2", label: "UN-IOM research papers · read", href: "#research" },
  { num: "88%", label: "ML accuracy · IMDB-50K study", href: "https://github.com/JohnOngeri/Sentiment-Analysis" },
  { label: "Mastercard Foundation Scholar · ALU", href: "#about" },
  { label: "Selected · Mauritius Startup Lab 2025", href: "#leadership" },
    { label: "Open to roles & Masters programmes", href: "#contact" },
];

const EXPLORING = [
  "Agentic safety in humanitarian operations",
  "Out-of-distribution robustness in climate-migration AI",
  "Machine learning in low-resource healthcare settings",
  "The gap between research and production ML",
  "Compute sovereignty for African AI deployments",
];

const SKILLS = [
  {
    group: "Engineering",
    items: ["TypeScript", "React", "Next.js", "Flutter / Dart", "Node.js", "REST APIs", "Swagger", "Tailwind"],
  },
  {
    group: "Machine Learning & Data",
    items: ["Python", "SQL", "TensorFlow", "Keras", "scikit-learn", "BiLSTM", "Word2Vec", "Pandas"],
  },
  {
    group: "Systems & Automation",
    items: ["AWS", "Distributed Systems", "Claude API", "Zapier", "Make.com", "Linux", "Git", "Jupyter"],
  },
];

const DISTINCTIONS = [
  { label: "Mastercard Foundation Scholar", org: "African Leadership University" },
  { label: "Mauritius Startup Lab — Signature Immersive Experience", org: "Selected 2025" },
  { label: "ALU Industry Partnership", org: "Google extern · 2025" },
  { label: "Wings to Fly Scholar", org: "Equity Group · Kenya" },
  { label: "Equity Leaders Program Scholar", org: "Equity Group Foundation" },
  { label: "First-generation university student", org: "Every credential earned, none inherited" },
];

const EXPERIENCE = [
  {
    when: "Apr 2026 — Present",
    role: "Intern · Climate Action",
    org: "IOM — UN Migration · Nairobi, Kenya",
    image: "assets/iom-three-wide.jpg",
    imageAlt: "John at UN-IOM Nairobi with colleagues, IOM Resilience mug in hand",
    groups: [
      {
        head: "Information & Knowledge Systems",
        bullets: [
          "Built and organised a SharePoint system for 50+ thematic policy documents and talking points, setting up the folder structure, taxonomy and access controls.",
          "Standardised policy data across 10+ country offices, converting unstructured MECC (Migration, Environment & Climate Change) information into consistent regional factsheets.",
        ],
      },
      {
        head: "Data & Structured Analysis",
        bullets: [
          "Built a structured dataset from scratch to track 50+ civil society organisations across 3 African regions, mapping who was working on what in climate migration.",
          "Built a tracking system for digital outreach, organising hundreds of raw social and media links into a searchable database of quarterly metrics.",
          "Compiled activity reports for 5+ youth programmes, tracking outcomes and progress for each initiative.",
        ],
      },
      {
        head: "Workflow & Content Management",
        bullets: [
          "Managed quarterly data collection from country offices across the region, standardising the format and retrieval process.",
          "Handled the CMS publishing workflow for 20+ youth blog entries across the region.",
          "Analysed engagement data to shape content strategy for campaigns including World Environment Day.",
        ],
      },
      {
        head: "Research",
        bullets: [
          "Authored two research papers (see Research) on agentic safety and out-of-distribution robustness in climate-migration AI, published under the Climate Action Department.",
        ],
      },
    ],
  },
  {
    when: "Jan 2026 — Present",
    role: "Founder's Associate · Research Ops & AI Systems",
    org: "Asakheni SA · South Africa",
    bullets: [
      "Built 12+ AI-powered operational workflows using Python, Claude, Zapier and Make.com, automating reporting, document generation, stakeholder communication and data capture.",
      "Cut manual admin workload by ~25 hours/month by developing automated reporting pipelines and internal operational systems.",
      "Maintain 8+ operational trackers and dashboards covering partnership pipelines, programme KPIs, funding opportunities and M&E reporting.",
      "Helped produce 20+ documents including funding proposals, concept notes, research briefs and investor materials.",
    ],
  },
  {
    when: "Sep — Dec 2025",
    role: "Software Engineering Extern",
    org: "Google · via ALU Industry Partnership · Nairobi",
    bullets: [
      "Built a production data-processing module that handled 5,600+ structured records, backed by 18 automated test cases. Zero defects after deployment.",
      "Code-reviewed three engineers' pull requests and caught 11 logic errors before they went to production.",
      "Built modular Python pipelines to Google engineering standards: clean separation of concerns, defensive error handling, full test coverage.",
      "Selected for ALU's Google externship, one of the programme's most competitive placements. Worked alongside experienced engineers within a real code review and deployment cycle.",
    ],
  },
  {
    when: "May — Aug 2025",
    role: "ALforEducation Apprentice",
    org: "African Leadership Academy · Johannesburg, South Africa",
    image: "assets/ala-johannesburg.jpg",
    imageAlt: "John in a suit standing in front of the AL for Education sign at African Leadership Academy, Johannesburg",
    bullets: [
      "Built a 5-part Monitoring & Evaluation framework tracking impact across 500+ beneficiaries in Opportunities and Entrepreneurship programmes, adopted across the organisation.",
      "Defined 15 programme indicators (cohort completion rates, jobs created) to give leadership consistent, trackable metrics.",
      "Reduced reporting turnaround by 20% by building a structured reporting process. The work contributed to the concept behind Menya Academy.",
      "Presented the findings to ALA leadership in Johannesburg; featured in Menya's newsletter, reaching 1,000+ stakeholders.",
    ],
  },
  {
    when: "May — Jul 2023",
    role: "College Counsellor",
    org: "Equity Group Foundation · Kenya",
    bullets: [
      "Coached high-school graduates from Kenya, Uganda, Rwanda and DRC into fully-funded global scholarships. Students went on to universities across the world.",
      "Worked through scholarship essays line-by-line with students from four countries to improve their applications.",
      "Designed targeted SAT prep plans that helped students prepare more efficiently.",
    ],
  },
  {
    when: "May — Sep 2021",
    role: "Pre-University Intern · Equity Leaders Program Scholar",
    org: "Equity Bank Limited · Malindi, Kenya",
    bullets: [
      "Processed cash transactions for 100+ customers daily through Equity's core banking system. Zero reconciliation errors.",
      "Originated customer bank accounts end-to-end through Equity's KYC and onboarding systems.",
      "Early hands-on exposure to the fintech operations stack powering East Africa's largest bank by customer count.",
    ],
  },
];

const WORK = [
  {
    n: "01",
    title: "PregnaCare — Mobile health + ML API",
    human:
      "A cross-platform mobile app for maternal health, with a machine learning model that predicts birth weight. Built for healthcare workers in low-resource clinical settings.",
    stack: ["Flutter", "Dart", "Python", "ML API", "Swagger", "REST"],
    role: "Co-built with Andrew Ogayo",
    year: "2024",
    repo: "76 commits · 3 forks",
    image: "assets/pregnacare-pitch.jpeg",
    imageAlt: "John presenting PregnaCare on stage at ALU's Do Hard Things event",
    case:
      "A Flutter app backed by a Python ML API with a documented public REST endpoint. The goal was a practical tool for healthcare workers that didn't feel cold to use — tracking, predictions, and support in one place. Presented at ALU's Do Hard Things showcase.",
    links: [
      { label: "GitHub", href: "https://github.com/JohnOngeri/flutter-pregnancy-app" },
      { label: "Demo →", href: "#" },
    ],
  },
  {
    n: "02",
    title: "Integrity Board — Fraud reporting tool",
    human:
      "A confidential incident-reporting interface for ALU's student-run Integrity Board, so any member of the community can flag academic dishonesty without friction or fear.",
    stack: ["React", "Forms", "Auth", "UX research"],
    role: "Built as Integrity Board member",
    year: "2024 — 2025",
    repo: "Internal · ALU",
    image: "assets/fraud-tool-presenting.jpg",
    imageAlt: "John presenting the Report a Fraud Incident tool to the Integrity Board",
    case:
      "Designed the report-intake flow and built the front-end so reports stay anonymous by default, optionally attributed, and route directly to the board's secure inbox. Demoed to the full Integrity Board and integrated into the ALU/ALC student dashboard.",
    links: [{ label: "Case study →", href: "#" }],
  },
  {
    n: "03",
    title: "Sentiment Analysis — NLP study",
    human:
      "A comparison of four NLP models on 50,000 IMDB reviews. Finding: in most real-world deployment scenarios, a well-tuned logistic regression still beats a neural network.",
    stack: ["Python", "BiLSTM", "TF-IDF", "Word2Vec", "TensorFlow", "scikit-learn"],
    role: "Capstone study",
    year: "2024",
    repo: "Logistic Reg. 88% · BiLSTM 86%",
    image: "assets/flutter-coding.jpg",
    imageAlt: "Working in IDE on a Flutter / Python pipeline with full test suite",
    case:
      "Evaluated four models on the IMDB 50K dataset: Logistic Regression (TF-IDF), Naïve Bayes, SVM, and a BiLSTM (Word2Vec), all under the same preprocessing conditions. The logistic regression came out ahead on both accuracy and interpretability, which has real implications for deploying ML in resource-limited environments.",
    links: [
      { label: "GitHub", href: "https://github.com/JohnOngeri/Sentiment-Analysis" },
      { label: "Read report →", href: "#research" },
    ],
  },
];

const PAPERS = [
  {
    title:
      "Recursive Oversight and Action-Redlines: A Framework for Safe Autonomous Agents in Humanitarian Logistics",
    venue: "Public Research Publication · IOM East & Southern Africa",
    year: "2026",
    authors: "John Ongeri Ouma",
    affil: "Climate Action Department, UN-IOM Regional Office, Nairobi",
    tags: ["AI Safety", "Agentic systems", "Humanitarian logistics", "Mechanistic interpretability", "Nairobi Protocol 2.0"],
    abstract: [
      "Examines what changes when a humanitarian logistics system moves from predicting outcomes to taking autonomous actions. Uses a simulated multi-stage displacement event in the East African Community to show how problems like the off-switch problem, instrumental convergence, and proxy reward drift appear in practice.",
      "Proposes a three-part response: a Monitor-Agent oversight setup, a set of hard-coded action limits the system cannot override, and an interpretability protocol for detecting deceptive behaviour. Closes with the Nairobi Protocol 2.0, a governance framework for AI compute in AU and UN contexts.",
    ],
    links: [
      { label: "Read PDF →", href: "assets/Recursive_Oversight_Action_Redlines.pdf" },
    ],
  },
  {
    title:
      "Robustness Under Crisis: A Framework for Out-of-Distribution Generalisation and Adversarial Red-Teaming in Climate-Migration AI Systems",
    venue: "Public Research Publication · IOM East & Southern Africa",
    year: "Jan 2026",
    authors: "John Ongeri Ouma",
    affil: "Climate Action Department, UN-IOM Regional Office, Nairobi",
    tags: ["OOD Generalisation", "Red-Teaming", "Climate-Migration AI", "Reward Misspecification", "Humanitarian Safety"],
    abstract: [
      "Looks at what happens to humanitarian ML systems when conditions shift far outside their training data. Identifies a failure mode called distributional collapse, where confidence scores become unreliable, model representations degrade, and reward signals drift — all at once — under compound climate events in the East African Community.",
      "Proposes a three-part audit method: automated red-teaming using IPCC AR6 tail scenarios, attention and MLP-layer interpretability analysis, and calibration benchmarking. Tests this against a 2026 Horn-of-Africa case study, showing that current models can produce harmful allocation decisions with no internal warning signal.",
    ],
    links: [
      { label: "Read PDF →", href: "assets/Robustness_Under_Crisis.pdf" },
    ],
  },
  {
    title:
      "Comparative Analysis of Traditional Machine Learning and Deep Learning Approaches for Sentiment Classification",
    venue: "Technical Report · African Leadership University",
    year: "2024",
    authors: "John Ongeri Ouma",
    tags: ["NLP", "Sentiment Analysis", "BiLSTM", "TF-IDF", "Logistic Regression"],
    abstract: [
      "Evaluates Logistic Regression, Naïve Bayes, SVM and a Bidirectional LSTM on the IMDB 50K-review dataset under matched preprocessing.",
      "Finds that TF-IDF + Logistic Regression (88% F1) marginally outperforms a Word2Vec-trained BiLSTM (86% F1), arguing that model selection should be governed by deployment constraints, not raw accuracy.",
    ],
    links: [
      { label: "Read PDF", href: "#" },
      { label: "Code", href: "https://github.com/JohnOngeri/Sentiment-Analysis" },
    ],
  },
];

const LEADERSHIP = [
  {
    when: "Mar 2024 — Feb 2025",
    title: "SRC Financial Treasurer — Elected",
    org: "ALU Student Representative Council · Cohort 24/25",
    image: "assets/srctreasurer.png",
    imageAlt: "ALU SRC 24/25 announcement card — John Ouma Ongeri, Treasurer, Kenya",
    bullets: [
      "Ran and won a campus-wide election across the ALU/ALC student body. Served as sole signatory on all financial transactions for the full year.",
      "Wrote the SRC's budgetary and financial policies and held to them. The controls survived a leadership transition with zero discrepancies.",
      "Delivered termly financial statements to a campus of hundreds with full audit transparency.",
    ],
  },
  {
    when: "2024 — 2025",
    title: "Integrity Board Member — Appointed",
    org: "ALU / ALC Integrity Board · Cohort 3",
    image: "assets/integrityboard.png",
    imageAlt: "ALU/ALC Integrity Board member card showing John Ouma — Kenya",
    bullets: [
      "Selected to ALU/ALC's student-run Integrity Board, the body charged with upholding academic honesty across the ALU and ALC student bodies.",
      "Built the board's fraud-reporting tool from scratch, demoed it to the full board, and got it integrated into the campus dashboard. Replaced a paper process with a confidential digital intake.",
    ],
  },
  {
    when: "Jul — Aug 2025",
    title: "Mauritius Startup Lab — SIE Cohort",
    org: "ALU Signature Immersive Experience · Mauritius",
    bullets: [
      "Selected for the month-long Mauritius Startup Lab, ALU's annual immersive programme for entrepreneurs and early-stage founders.",
      "Worked with founders, investors and operators over the month. Came out with a clearer sense of how to build a business, and an early operating plan for an idea I'd been sitting on.",
    ],
  },
  {
    when: "Jul — Aug 2022",
    title: "Polling Clerk — National Election",
    org: "Independent Electoral & Boundaries Commission · Malindi",
    bullets: [
      "Operated the Kenya Integrated Election Management System (KIEMS) for real-time biometric voter verification at national-election scale.",
      "Managed the flow of a polling station during Kenya's 2022 general election.",
    ],
  },
  {
    when: "High School",
    title: "Dormitory Prefect & Library Prefect",
    org: "Kisii School · Two concurrent leadership posts",
    bullets: [
      "Responsible for the welfare and night-time order of a full dormitory at Kisii School.",
      "Also ran the school library: shelving, lending, and helping younger students find what they needed.",
    ],
  },
  {
    when: "Primary School",
    title: "Class Prefect",
    org: "Earliest leadership role",
    bullets: [
      "Picked by classmates and teachers to keep our class organised, on time and on-task. That was the first time I learned that leadership is mostly about showing up early and reading the room.",
    ],
  },
];

const QUESTIONS = [
  {
    q: "How do we deploy autonomous agents in humanitarian operations without recreating the off-switch problem?",
    seed: "Monitor-Agent oversight, action-redlines that cannot be optimised around, and the institutional governance that enforces them.",
  },
  {
    q: "When does a classical ML model outperform a neural network, and how do we know in advance?",
    seed: "Pre-experiment heuristics for interpretability, data scale and deployment cost, to move the choice earlier in the pipeline.",
  },
  {
    q: "What does compute sovereignty look like for AI systems trained on African data?",
    seed: "Local infrastructure, AU-anchored governance, and the Nairobi Protocol 2.0. Who owns the compute matters as much as who writes the code.",
  },
  {
    q: "How do we measure the real-world impact of a research paper, not just its citations?",
    seed: "The gap between publishing and deployment is rarely discussed. It should be.",
  },
];

const GALLERY = [
  { src: "assets/reading-portrait.jpeg", caption: "Reading · The Book of Echoes", ratio: 0.75 },
  { src: "assets/football-team.jpg", caption: "Five-a-side, Friday nights", ratio: 1.78 },
  { src: "assets/beach-group.jpeg", caption: "Cohort sunset · Mauritius", ratio: 1.5 },
  { src: "assets/climbing-harness.jpg", caption: "Climbing rig · outdoor camp", ratio: 0.75 },
  { src: "assets/paintball-team.jpg", caption: "Paintball · Kenya woods", ratio: 0.75 },
  { src: "assets/dinner-gala.jpeg", caption: "Gala night · Mauritius", ratio: 1.5 },
  { src: "assets/formal-friends.jpg", caption: "Mauritius nights", ratio: 0.75 },
  { src: "assets/tugofwar-close.jpeg", caption: "Tug-of-war · ALU sports day", ratio: 1.5 },
  { src: "assets/iom-elder-coffee.jpg", caption: "Briefing · UN-IOM Nairobi", ratio: 1.78 },
  { src: "assets/pregnacare-stairs.jpeg", caption: "Pitching PregnaCare", ratio: 1.5 },
  { src: "assets/beach-selfie.jpeg", caption: "After the build", ratio: 1.5 },
];

/* =========================================================
   HOOKS
   ========================================================= */

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
    const fn = (e) => setR(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return r;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCursor() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const cursor = document.getElementById("cursor");
    if (!cursor) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let raf;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onDown = () => cursor.classList.add("hover");
    const onUp = () => cursor.classList.remove("hover");
    const tick = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const over = (e) => {
      const t = e.target.closest("a, button, .work-row, .q, .skill-tag, .ticker-item, .paper, .cv-btn, .contact-email, .gal-item, .exp-row, .dist-chip");
      if (t) cursor.classList.add("hover"); else cursor.classList.remove("hover");
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", over);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, [reduced]);
}

function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function Nav({ active }) {
  return (
    <nav className="nav">
      <a href="#top" className="brand">JO ·  PORTFOLIO  ·  2026</a>
      <div className="links">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} className={active === n.id ? "active" : ""}>
            {n.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Typewriter({ phrases }) {
  const [text, setText] = useState("");
  const [pIdx, setPIdx] = useState(0);
  const [phase, setPhase] = useState("type");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setText(phrases[0]); return; }
    let timeout;
    const current = phrases[pIdx];
    if (phase === "type") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 45);
      } else {
        timeout = setTimeout(() => setPhase("hold"), 2400);
      }
    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("erase"), 100);
    } else if (phase === "erase") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 22);
      } else {
        setPIdx((i) => (i + 1) % phrases.length);
        setPhase("type");
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, pIdx, phrases, reduced]);

  return (
    <span>
      {text}
      {!reduced && <span className="caret" />}
    </span>
  );
}

function useMagneticLinks(selector) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const links = document.querySelectorAll(selector);
    const cleanups = [];
    links.forEach((link) => {
      const onMove = (e) => {
        const r = link.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const x = Math.max(-6, Math.min(6, dx * 0.25));
        const y = Math.max(-4, Math.min(4, dy * 0.25));
        link.style.transform = `translate(${x}px, ${y}px)`;
        link.style.transition = "transform 0.05s linear";
      };
      const onLeave = () => {
        link.style.transform = "translate(0,0)";
        link.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      };
      link.addEventListener("mousemove", onMove);
      link.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        link.removeEventListener("mousemove", onMove);
        link.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((c) => c());
  }, [selector]);
}

function Hero() {
  const ongeriRef = useRef(null);
  const heroRef = useRef(null);
  const ambientRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const heroVideoRef = useRef(null);
  const reduced = useReducedMotion();

  // Auto-play video; pause when hero scrolls out of view
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    if (heroRef.current) io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);
  const TARGET = "ONGERI";
  const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

  // Layer 1 — scramble reveal
  useEffect(() => {
    const spans = ongeriRef.current?.querySelectorAll(".ong-letter");
    if (!spans || !spans.length) return;
    if (reduced) {
      spans.forEach((s, i) => { s.textContent = TARGET[i]; });
      return;
    }
    const resolved = new Array(TARGET.length).fill(false);
    const startDelay = setTimeout(() => {
      const tick = setInterval(() => {
        let allDone = true;
        for (let i = 0; i < TARGET.length; i++) {
          if (resolved[i]) continue;
          allDone = false;
          if (Math.random() < 0.30) {
            resolved[i] = true;
            spans[i].textContent = TARGET[i];
            spans[i].classList.add("resolved");
          } else {
            spans[i].textContent = CHARSET[Math.floor(Math.random() * CHARSET.length)];
          }
        }
        if (allDone) clearInterval(tick);
      }, 40);
      const safety = setTimeout(() => {
        clearInterval(tick);
        spans.forEach((s, i) => { s.textContent = TARGET[i]; s.classList.add("resolved"); });
      }, 1400);
      ongeriRef.current?._cleanup?.();
      if (ongeriRef.current) {
        ongeriRef.current._cleanup = () => { clearInterval(tick); clearTimeout(safety); };
      }
    }, 200);
    return () => { clearTimeout(startDelay); ongeriRef.current?._cleanup?.(); };
  }, [reduced]);

  // Layer 2 — variable font weight reaction (also feeds cursor + ambient light)
  useEffect(() => {
    if (reduced) return;
    const spans = ongeriRef.current?.querySelectorAll(".ong-letter");
    const ambient = ambientRef.current;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let lx = mx, ly = my; // lerp targets for cursor ring + ambient
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      // Cursor dot follows immediately
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
      // Variable font weights
      if (spans) {
        spans.forEach((s) => {
          const r = s.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(mx - cx, my - cy);
          let w;
          if (d <= 60) w = 900;
          else if (d <= 200) w = 900 - ((d - 60) / 140) * 600;
          else w = 300;
          s.style.fontVariationSettings = `"wght" ${Math.round(w)}`;
        });
      }
      // Cursor inversion over big letters
      const el = document.elementFromPoint(mx, my);
      const overText = !!(el && el.closest && el.closest(".ong-letter"));
      cursorDotRef.current?.classList.toggle("on-text", overText);
      cursorRingRef.current?.classList.toggle("on-text", overText);
    };

    const tick = () => {
      lx += (mx - lx) * 0.12;
      ly += (my - ly) * 0.12;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
      }
      // Ambient light — slower lerp
      if (ambient) {
        const ax = parseFloat(ambient.style.getPropertyValue("--mx")) || mx;
        const ay = parseFloat(ambient.style.getPropertyValue("--my")) || my;
        const nx = ax + (mx - ax) * 0.06;
        const ny = ay + (my - ay) * 0.06;
        ambient.style.setProperty("--mx", nx + "px");
        ambient.style.setProperty("--my", ny + "px");
      }
      raf = requestAnimationFrame(tick);
    };

    if (ambient) {
      ambient.style.setProperty("--mx", mx + "px");
      ambient.style.setProperty("--my", my + "px");
    }
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <header id="top" ref={heroRef} className={`hero hero--kinetic shell ${reduced ? "is-reduced" : ""}`}>
      <div className="ambient-light" ref={ambientRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />

      <div className="hero-meta-top hero-fade delay-100">
        <div>Software Engineer<span>Ex-Google · UN-IOM · ML Researcher</span></div>
        <div>Based in<span>Nairobi, Kenya</span></div>
        <div>Education<span>ALU · Mastercard Foundation Scholar</span></div>
      </div>

      <div>
        <h1 className="hero-name">
          <span className="first hero-clip delay-200">
            <span className="first-inner">John Ouma</span>
          </span>
          <span className="last" ref={ongeriRef} aria-label="ONGERI">
            {TARGET.split("").map((ch, i) => (
              <span key={i} className="ong-letter" data-final={ch}>{ch}</span>
            ))}
          </span>
        </h1>
        <p className="hero-tagline hero-tagline--kinetic">
          {"Software engineer. ML researcher. Based in Nairobi.".split(" ").map((w, i) => (
            <span
              key={i}
              className="hero-word"
              style={{ animationDelay: `${700 + i * 60}ms` }}
            >
              {w}
            </span>
          ))}
        </p>
      <div className="hero-bio-row">
        <p className="hero-bio hero-fade delay-900">
          Software engineer and ML researcher, based in Nairobi. I graduated from African Leadership University on a full Mastercard Foundation Scholarship. Before finishing my degree, I built production tools at Google, wrote software for the UN's climate team at IOM, and designed a monitoring framework tracking 500+ beneficiaries at African Leadership Academy in Johannesburg.
        </p>

        <div className="hero-photos hero-fade delay-1100" aria-hidden="true">
          <figure className="hero-photo hero-photo--vid">
            <video
              ref={heroVideoRef}
              src="assets/won 1st place video.mp4"
              playsInline
              loop
              preload="auto"
            />
            <figcaption>1st Place · ALU 2024</figcaption>
          </figure>
          <figure className="hero-photo hero-photo--front">
            <img src="assets/hero-google-1.jpg" alt="John at the Google Africa office reception, holding a Pixelbook" loading="lazy" />
            <figcaption>Google Africa · 2025</figcaption>
          </figure>
          <figure className="hero-photo hero-photo--back">
            <img src="assets/hero-google-2.jpg" alt="John at the Google Africa office on his first day, wearing a visitor lanyard" loading="lazy" />
            <figcaption>Day 1 · Software Engineering Extern</figcaption>
          </figure>
        </div>
      </div>
      </div>

      <div className="hero-bottom hero-fade delay-1050">
        <span className="status-badge">
          <span className="pulse" />
          Open to roles &amp; Masters programmes
        </span>
        <span className="scroll-hint">
          <span>SCROLL</span>
          <span className="bar" />
        </span>
      </div>
    </header>
  );
}

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <section className="ticker" aria-label="Career highlights">
      <div className="ticker-track">
        {items.map((it, i) => {
          const isExternal = it.href && /^https?:|\.pdf$/i.test(it.href);
          const inner = (
            <React.Fragment>
              {it.num && <span className="num">{it.num}</span>}
              <span>{it.label}</span>
              {it.href && <span className="ticker-arrow" aria-hidden="true">↗</span>}
            </React.Fragment>
          );
          return (
            <React.Fragment key={i}>
              {it.href ? (
                <a
                  className="ticker-item ticker-link"
                  href={it.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                >
                  {inner}
                </a>
              ) : (
                <span className="ticker-item">{inner}</span>
              )}
              <span className="ticker-item" aria-hidden="true"><span className="dot" /></span>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section shell">
      <div className="about-grid">
        <div className="reveal">
          <span className="eyebrow">01 · About</span>
          <p className="pullquote pullquote-top">
            Good software should work in the hardest <span className="accent">environments,</span> not just the easiest ones.
          </p>
          <p className="pullquote-attrib">A working principle</p>

          <div className="about-portrait">
            <img src="assets/portrait-smile.jpg" alt="John Ouma Ongeri, golden-hour portrait in Kigali" loading="lazy" />
            <span className="cap">John · Kigali, 2024</span>
          </div>
        </div>

        <div>
          <div className="about-block reveal rd-60">
            <h3>The short version</h3>
            <div className="about-bio">
              <p>
                I'm John Ouma Ongeri, software engineer and ML researcher. I currently work at UN-IOM Nairobi on climate systems, and as Founder's Associate at Asakheni SA, where I build automation and AI tools for the team's operations.
              </p>
              <p>
                Before graduating, I spent a semester as a Software Engineering Extern at Google through ALU's industry partnership, writing a production data module backed by 18 automated tests, with zero defects after deployment. I also built a monitoring and evaluation framework at African Leadership Academy in Johannesburg, tracking outcomes across 500+ programme beneficiaries, and presented the work to ALA leadership.
              </p>
              <p>
                At ALU I was elected SRC Financial Treasurer, sole signatory on every financial transaction across the student body for a full year. I also served on the Integrity Board and was selected for the Mauritius Startup Lab. First-generation university student. Wings to Fly Scholar. Equity Leaders Program Scholar. Mastercard Foundation Scholar. 
              </p>
            </div>
          </div>

          <div className="about-block reveal rd-100">
            <h3>Distinctions &amp; selections</h3>
            <div className="dist-grid">
              {DISTINCTIONS.map((d) => (
                <div className="dist-chip" key={d.label}>
                  <div className="dist-label">{d.label}</div>
                  <div className="dist-org">{d.org}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-block reveal rd-160">
            <h3>What I'm exploring right now</h3>
            <ul className="exploring-list">
              {EXPLORING.map((e, i) => (
                <li key={i}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="label">{e}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-block reveal rd-220">
            <h3>Toolbox</h3>
            {SKILLS.map((g) => (
              <div className="skill-group" key={g.group}>
                <div className="skill-group-title">{g.group}</div>
                <div className="skill-tags">
                  {g.items.map((s) => (
                    <span className="skill-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section shell">
      <div className="section-head reveal">
        <h2>Experience.</h2>
        <p className="desc">
          Where I've worked. Google, UN-IOM, African Leadership Academy, Equity Bank, the IEBC. Numbers attached.
        </p>
      </div>

      <div className="exp-list">
        {EXPERIENCE.map((e, i) => (
          <article className="exp-row reveal" style={{ "--rd": `${i * 60}ms` }} key={e.role + e.org}>
            <div className="exp-when">{e.when}</div>
            <div className="exp-body">
              <h3>{e.role}</h3>
              <div className="exp-org">{e.org}</div>
              {e.groups ? (
                <div className="exp-groups">
                  {e.groups.map((g, gi) => (
                    <div className="exp-group" key={gi}>
                      <div className="exp-group-head">{g.head}</div>
                      <ul>
                        {g.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul>
                  {e.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                </ul>
              )}
            </div>
            {e.image ? (
              <div className="exp-img">
                <img src={e.image} alt={e.imageAlt} loading="lazy" />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="section shell">
      <div className="section-head reveal">
        <h2>Selected work.</h2>
        <p className="desc">
          Three projects I built from scratch. Plain description above, technical detail below.
        </p>
      </div>

      <div role="list">
        {WORK.map((w, i) => (
          <article className="work-row reveal" style={{ "--rd": `${i * 80}ms` }} key={w.n} role="listitem">
            <div className="index">{w.n}</div>
            <div className="meta">
              <h3>{w.title}</h3>
              <p className="human">{w.human}</p>
              <div className="stack">
                {w.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
              <div className="expand">
                <div className="case">
                  <div className="case-img">
                    <img src={w.image} alt={w.imageAlt} loading="lazy" />
                  </div>
                  <div className="case-body">
                    <p>{w.case}</p>
                    <div className="links">
                      {w.links.map((l) => (
                        <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-meta">
              <strong>{w.role}</strong>
              {w.year}<br />
              {w.repo}
            </div>
            <div className="arrow" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Research() {
  return (
    <section id="research" className="section research shell">
      <div className="section-head reveal">
        <h2>Research <span className="swatch">&amp; writing.</span></h2>
        <p className="desc">
          Two published papers at UN-IOM on agentic safety and out-of-distribution robustness in humanitarian AI, plus an earlier NLP study. Work that sits between engineering and research.
        </p>
      </div>

      <div>
        {PAPERS.map((p, i) => (
          <article className="paper reveal" style={{ "--rd": `${i * 80}ms` }} key={p.title}>
            <div className="meta">
              <div className="venue">{p.venue} · {p.year}</div>
              <h3>{p.title}</h3>
              <p className="authors"><strong>{p.authors}</strong></p>
              {p.affil ? <p className="affil">{p.affil}</p> : null}
              <div className="ptags">
                {p.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
            <div>
              <div className="abstract">
                {p.abstract.map((line, idx) => <p key={idx}>{line}</p>)}
              </div>
              <div className="plinks">
                {p.links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section id="leadership" className="section leadership shell">
      <div className="section-head reveal">
        <h2>Leadership <span className="swatch">&amp; community.</span></h2>
        <p className="desc">
          Leadership started early — school prefect, then student government, then the UN. A consistent thread across the years.
        </p>
      </div>

      <div>
        {LEADERSHIP.map((l, i) => (
          <article className="lead-row reveal" style={{ "--rd": `${i * 70}ms` }} key={l.title}>
            <div className="when">{l.when}</div>
            <div className="lead-body">
              <h3>{l.title}</h3>
              <div className="org">{l.org}</div>
              <ul>
                {l.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
              </ul>
            </div>
            {l.image ? (
              <div className="lead-img">
                <img src={l.image} alt={l.imageAlt} loading="lazy" />
              </div>
            ) : (
              <div className="lead-img lead-img--placeholder" aria-hidden="true">
                <span>{l.when}</span>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Thinking() {
  return (
    <section id="thinking" className="section thinking shell">
      <div className="section-head reveal">
        <h2>Questions I'm chasing.</h2>
        <p className="desc">
          Things I keep thinking about. Not answers — the questions came first.
        </p>
      </div>

      <div className="questions">
        {QUESTIONS.map((q, i) => (
          <div className="q reveal" style={{ "--rd": `${i * 60}ms` }} key={i}>
            <div className="num">Q{String(i + 1).padStart(2, "0")}</div>
            <div>
              <p>{q.q}</p>
              <p className="seed">{q.seed}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Life() {
  return (
    <section id="life" className="section life shell">
      <div className="section-head reveal">
        <h2>Off the screen.</h2>
        <p className="desc">
          There's more to it than the code. Some of the rest.
        </p>
      </div>

      <div className="gallery">
        {GALLERY.map((g, i) => (
          <figure
            className="gal-item reveal"
            key={g.src}
            style={{ "--rd": `${i * 50}ms`, gridColumn: `span ${g.ratio > 1.5 ? 2 : 1}` }}
          >
            <div className="gal-frame">
              <img src={g.src} alt={g.caption} loading="lazy" />
            </div>
            <figcaption>{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact shell">
      <div className="reveal">
        <h2>
          Let's build something <em>worth building.</em>
        </h2>
        <p className="sub">
          Or talk research. Or Masters programmes. I'm open, and I read every cold email.
        </p>
      </div>

      <div className="contact-grid">
        <div className="reveal rd-80">
          <a className="contact-email" href="mailto:johnongeriouma@gmail.com">
            johnongeriouma@gmail.com
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <div className="cv-row">
            <a className="cv-btn" href="assets/John_Ongeri_Profile.pdf" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4v12m0 0-4-4m4 4 4-4M5 20h14" />
              </svg>
              LinkedIn profile PDF
            </a>
            <p className="academic-note">
               Happy to share transcripts and recommendations on request.
            </p>
          </div>
        </div>

        <div className="contact-links reveal rd-160">
          <a href="https://github.com/JohnOngeri" target="_blank" rel="noopener noreferrer">
            <span>GitHub — @JohnOngeri</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </a>
          <a href="https://linkedin.com/in/john-ongeri-b01759226" target="_blank" rel="noopener noreferrer">
            <span>LinkedIn — john-ongeri</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </a>
          <a href="assets/Recursive_Oversight_Action_Redlines.pdf" target="_blank" rel="noreferrer">
            <span>Paper — Recursive Oversight (UN-IOM)</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </a>
          <a href="assets/Robustness_Under_Crisis.pdf" target="_blank" rel="noreferrer">
            <span>Paper — Robustness Under Crisis (UN-IOM)</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </a>
        </div>
      </div>

      <div className="foot foot-spaced">
        <span>© 2026 John Ouma Ongeri · </span>
        <span>Last updated · May 2026</span>
      </div>
    </section>
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  useReveal();
  useScrollProgress();
  useMagneticLinks(".nav .links a");
  const active = useActiveSection();
  const [pdf, setPdf] = useState(null); // { href, title, blobUrl, loading, error }

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest("a[href$='.pdf'], a[href*='.pdf?'], a[data-pdf]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") && !href.includes(location.host)) return;
      e.preventDefault();
      const title = a.getAttribute("data-pdf-title") || a.textContent.trim().replace(/→|↗/g, "").trim();
      setPdf({ href, title, blobUrl: null, loading: true, error: null });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Fetch PDF as blob so the iframe can load it without frame-ancestors blocks
  useEffect(() => {
    if (!pdf || pdf.blobUrl || !pdf.loading) return;
    let cancelled = false;
    let createdUrl = null;
    (async () => {
      try {
        const res = await fetch(pdf.href);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const blob = await res.blob();
        createdUrl = URL.createObjectURL(blob);
        if (cancelled) { URL.revokeObjectURL(createdUrl); return; }
        setPdf((p) => p && p.href === pdf.href ? { ...p, blobUrl: createdUrl, loading: false } : p);
      } catch (err) {
        if (cancelled) return;
        setPdf((p) => p && p.href === pdf.href ? { ...p, loading: false, error: err.message } : p);
      }
    })();
    return () => {
      cancelled = true;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [pdf?.href]);

  useEffect(() => {
    if (!pdf) return;
    const onKey = (e) => { if (e.key === "Escape") setPdf(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [pdf]);

  return (
    <React.Fragment>
      <Nav active={active} />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Experience />
        <Work />
        <Research />
        <Leadership />
        <Thinking />
        <Life />
        <Contact />
      </main>
      {pdf ? (
        <div className="pdf-modal" onClick={() => setPdf(null)}>
          <div className="pdf-modal__panel" onClick={(e) => e.stopPropagation()}>
            <header className="pdf-modal__bar">
              <div className="pdf-modal__title">{pdf.title || "Document"}</div>
              <div className="pdf-modal__actions">
                <a href={pdf.href} download className="pdf-modal__btn">Download</a>
                <a href={pdf.blobUrl || pdf.href} target="_blank" rel="noreferrer" className="pdf-modal__btn">Open in tab</a>
                <button type="button" className="pdf-modal__btn pdf-modal__btn--close" onClick={() => setPdf(null)} aria-label="Close">Close ✕</button>
              </div>
            </header>
            <div className="pdf-modal__body">
              {pdf.loading ? (
                <div className="pdf-modal__state">
                  <div className="pdf-modal__spinner" />
                  <div>Loading PDF…</div>
                </div>
              ) : pdf.error ? (
                <div className="pdf-modal__state pdf-modal__state--error">
                  <div>Couldn't load this PDF in the viewer.</div>
                  <div className="pdf-modal__hint">{pdf.error}</div>
                  <a className="pdf-modal__btn" href={pdf.href} download>Download instead</a>
                </div>
              ) : pdf.blobUrl ? (
                <iframe className="pdf-modal__frame" src={pdf.blobUrl} title={pdf.title || "PDF"} />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
