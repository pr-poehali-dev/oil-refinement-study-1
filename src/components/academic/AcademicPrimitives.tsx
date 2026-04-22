export const SectionDivider = () => (
  <div className="flex items-center gap-3 my-8">
    <div className="flex-1 h-px" style={{ background: "var(--rule)" }} />
    <div className="w-1.5 h-1.5 rotate-45" style={{ background: "var(--rule-heavy)" }} />
    <div className="flex-1 h-px" style={{ background: "var(--rule)" }} />
  </div>
);

export const PageNumber = ({ n }: { n: number }) => (
  <div className="text-center text-xs font-mono-academic mt-12 mb-2 tracking-widest" style={{ color: "var(--ink-muted)" }}>
    — {n} —
  </div>
);

export const SectionTitle = ({ num, title, id }: { num: string; title: string; id: string }) => (
  <div id={id} className="relative mb-6 pt-2">
    <span className="chapter-number">{num}</span>
    <div className="text-xs font-sans-academic font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "var(--accent-gold)" }}>
      {num !== "—" ? `Раздел ${num}` : ""}
    </div>
    <h2 className="font-serif-academic text-3xl font-semibold leading-tight" style={{ color: "var(--ink)" }}>
      {title}
    </h2>
    <div className="mt-3 w-16 h-0.5" style={{ background: "var(--accent-gold)" }} />
  </div>
);

export const Paragraph = ({ children, indent = true }: { children: React.ReactNode; indent?: boolean }) => (
  <p
    className="font-sans-academic leading-relaxed mb-4"
    style={{
      fontSize: "15px",
      color: "var(--ink)",
      textAlign: indent ? "justify" : "left",
      textIndent: indent ? "2em" : "0",
    }}
  >
    {children}
  </p>
);
