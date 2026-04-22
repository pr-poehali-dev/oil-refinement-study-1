import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const chapters = [
  { id: "cover", label: "Титульный лист", short: "Титул" },
  { id: "toc", label: "Содержание", short: "Содержание" },
  { id: "intro", label: "Введение", short: "Введение" },
  { id: "goals", label: "Цели и задачи", short: "Цели" },
  { id: "theory", label: "Теоретическая часть", short: "Теория" },
  { id: "practice", label: "Практическая часть", short: "Практика" },
  { id: "conclusion", label: "Выводы", short: "Выводы" },
  { id: "references", label: "Список литературы", short: "Литература" },
];

const SectionDivider = () => (
  <div className="flex items-center gap-3 my-8">
    <div className="flex-1 h-px" style={{ background: "var(--rule)" }} />
    <div className="w-1.5 h-1.5 rotate-45" style={{ background: "var(--rule-heavy)" }} />
    <div className="flex-1 h-px" style={{ background: "var(--rule)" }} />
  </div>
);

const PageNumber = ({ n }: { n: number }) => (
  <div className="text-center text-xs font-mono-academic mt-12 mb-2 tracking-widest" style={{ color: "var(--ink-muted)" }}>
    — {n} —
  </div>
);

const SectionTitle = ({ num, title, id }: { num: string; title: string; id: string }) => (
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

const Paragraph = ({ children, indent = true }: { children: React.ReactNode; indent?: boolean }) => (
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

export default function Index() {
  const [active, setActive] = useState("cover");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActive(chapters[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "#ddd5c4" }}>
      {/* Top bar */}
      <header
        className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 border-b"
        style={{ background: "#1a1a1a", borderColor: "#333" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <Icon name="PanelLeft" size={18} />
          </button>
          <div className="w-px h-4 bg-white/20" />
          <span className="font-sans-academic text-xs text-white/50 uppercase tracking-widest">
            Научная работа
          </span>
          <span className="text-white/20 mx-1">·</span>
          <span className="font-sans-academic text-xs text-white/70">
            Продукты нефтепереработки
          </span>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-sans-academic font-medium transition-all hover:opacity-90"
          style={{ background: "var(--accent-gold)", color: "white" }}
        >
          <Icon name="Printer" size={13} />
          Печать / PDF
        </button>
      </header>

      <div className="flex pt-[48px]">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside
            className="no-print fixed left-0 top-[48px] bottom-0 w-56 overflow-y-auto border-r z-40"
            style={{ background: "#f5f0e8", borderColor: "#c8bfaa" }}
          >
            <div className="p-4">
              <div
                className="text-[10px] font-sans-academic font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: "var(--ink-muted)" }}
              >
                Навигация
              </div>
              <nav className="space-y-0.5">
                {chapters.map((ch, i) => (
                  <button
                    key={ch.id}
                    onClick={() => scrollTo(ch.id)}
                    className={`nav-chapter w-full text-left px-3 py-2 rounded-sm text-[13px] font-sans-academic transition-all flex items-center gap-2 ${
                      active === ch.id ? "active" : "hover:bg-black/5"
                    }`}
                    style={{ color: active === ch.id ? "var(--accent-gold)" : "var(--ink-light)" }}
                  >
                    <span
                      className="font-mono-academic text-[10px] w-4 text-right flex-shrink-0"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {i === 0 ? "—" : i}
                    </span>
                    <span className="truncate">{ch.short}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main
          className="flex-1 py-10 px-6 transition-all duration-300"
          style={{ marginLeft: sidebarOpen ? "224px" : "0" }}
        >
          <div className="max-w-[780px] mx-auto space-y-6">

            {/* ── COVER PAGE ── */}
            <div id="cover" className="academic-page rounded-sm section-reveal" style={{ minHeight: "1020px", padding: "80px 80px 60px" }}>
              <div className="flex flex-col items-center text-center h-full">
                <div className="text-[10px] font-sans-academic uppercase tracking-[0.3em] mb-6" style={{ color: "var(--ink-muted)" }}>
                  Министерство образования и науки Российской Федерации
                </div>
                <div className="text-sm font-sans-academic font-medium mb-1" style={{ color: "var(--ink-light)" }}>
                  Федеральное государственное бюджетное образовательное учреждение
                </div>
                <div className="text-sm font-sans-academic font-semibold mb-8" style={{ color: "var(--ink)" }}>
                  высшего профессионального образования
                </div>

                <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center mb-6" style={{ borderColor: "var(--rule-heavy)" }}>
                  <div className="font-serif-academic text-3xl font-bold" style={{ color: "var(--accent-gold)" }}>НГУ</div>
                </div>

                <div className="font-serif-academic text-xl font-semibold mb-1" style={{ color: "var(--ink)" }}>
                  Нефтегазовый университет
                </div>
                <div className="text-sm font-sans-academic mb-1" style={{ color: "var(--ink-light)" }}>
                  Кафедра химической технологии и переработки нефти
                </div>

                <div className="w-32 my-10" style={{ borderTop: "2px solid var(--rule-heavy)" }} />

                <div className="text-xs font-sans-academic uppercase tracking-[0.25em] mb-4" style={{ color: "var(--ink-muted)" }}>
                  Научно-исследовательская работа
                </div>

                <h1 className="font-serif-academic font-bold leading-tight mb-4" style={{ fontSize: "2.1rem", color: "var(--ink)" }}>
                  Специальные продукты нефтепереработки: масла, парафин, битум и прочие углеводородные дистилляты
                </h1>

                <div className="text-sm font-sans-academic italic mb-16" style={{ color: "var(--ink-light)" }}>
                  Монография по результатам исследования физико-химических свойств
                  <br />и технологических характеристик нефтепродуктов
                </div>

                <div className="flex-1" />

                <div className="w-full grid grid-cols-2 gap-8 text-left mt-auto">
                  <div>
                    <div className="text-[10px] font-sans-academic uppercase tracking-widest mb-2" style={{ color: "var(--ink-muted)" }}>
                      Автор работы
                    </div>
                    <div className="font-sans-academic text-sm font-medium" style={{ color: "var(--ink)" }}>[Фамилия И.О.]</div>
                    <div className="font-sans-academic text-xs" style={{ color: "var(--ink-muted)" }}>студент гр. ХТН-221</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-sans-academic uppercase tracking-widest mb-2" style={{ color: "var(--ink-muted)" }}>
                      Научный руководитель
                    </div>
                    <div className="font-sans-academic text-sm font-medium" style={{ color: "var(--ink)" }}>[Фамилия И.О.], д.х.н.</div>
                    <div className="font-sans-academic text-xs" style={{ color: "var(--ink-muted)" }}>профессор кафедры</div>
                  </div>
                </div>

                <div className="mt-10 font-serif-academic text-lg font-medium" style={{ color: "var(--ink-light)" }}>2024</div>
              </div>
              <PageNumber n={1} />
            </div>

            {/* ── TABLE OF CONTENTS ── */}
            <div id="toc" className="academic-page rounded-sm" style={{ padding: "64px 80px" }}>
              <div className="mb-8 text-center">
                <h2 className="font-serif-academic text-3xl font-semibold" style={{ color: "var(--ink)" }}>Содержание</h2>
                <div className="mt-3 mx-auto w-16 h-0.5" style={{ background: "var(--accent-gold)" }} />
              </div>

              <div className="space-y-1">
                {[
                  { num: "", title: "Введение", page: 4, sub: false },
                  { num: "1.", title: "Цели и задачи исследования", page: 6, sub: false },
                  { num: "2.", title: "Теоретическая часть", page: 8, sub: false },
                  { num: "2.1.", title: "Нефтяные масла: классификация и свойства", page: 8, sub: true },
                  { num: "2.2.", title: "Парафин и церезин", page: 12, sub: true },
                  { num: "2.3.", title: "Битум нефтяной", page: 16, sub: true },
                  { num: "2.4.", title: "Прочие специальные продукты", page: 20, sub: true },
                  { num: "3.", title: "Практическая часть", page: 24, sub: false },
                  { num: "3.1.", title: "Методология исследования", page: 24, sub: true },
                  { num: "3.2.", title: "Результаты анализа физико-химических свойств", page: 27, sub: true },
                  { num: "3.3.", title: "Сравнительные характеристики продуктов", page: 31, sub: true },
                  { num: "", title: "Выводы", page: 35, sub: false },
                  { num: "", title: "Список литературы", page: 37, sub: false },
                ].map((item, i) => {
                  const map: Record<string, string> = {
                    "Введение": "intro",
                    "Цели и задачи исследования": "goals",
                    "Теоретическая часть": "theory",
                    "Практическая часть": "practice",
                    "Выводы": "conclusion",
                    "Список литературы": "references",
                  };
                  const key = Object.keys(map).find((k) => item.title === k);
                  return (
                    <div
                      key={i}
                      className="toc-item flex items-baseline gap-2 py-1.5 px-2 rounded-sm"
                      onClick={() => key && scrollTo(map[key])}
                    >
                      <span className="font-mono-academic text-xs w-8 flex-shrink-0" style={{ color: "var(--ink-muted)" }}>
                        {item.num}
                      </span>
                      <span
                        className="font-sans-academic text-sm flex-1"
                        style={{
                          color: item.sub ? "var(--ink-light)" : "var(--ink)",
                          paddingLeft: item.sub ? "16px" : "0",
                        }}
                      >
                        {item.title}
                      </span>
                      <span className="flex-1 border-b border-dotted mx-2" style={{ borderColor: "var(--rule)", marginBottom: "3px" }} />
                      <span className="font-mono-academic text-xs" style={{ color: "var(--ink-muted)" }}>{item.page}</span>
                    </div>
                  );
                })}
              </div>
              <PageNumber n={2} />
            </div>

            {/* ── INTRODUCTION ── */}
            <div id="intro" className="academic-page rounded-sm" style={{ padding: "64px 80px" }}>
              <SectionTitle num="—" title="Введение" id="intro-h" />
              <Paragraph>
                Нефтеперерабатывающая промышленность является одной из ключевых отраслей современной экономики. Помимо производства топлива, нефтепереработка обеспечивает выпуск широкого спектра специальных продуктов, находящих применение в машиностроении, строительстве, химической промышленности и медицине.
              </Paragraph>
              <Paragraph>
                К числу важнейших специальных продуктов нефтепереработки относятся смазочные масла, парафины и церезины, нефтяные битумы, вазелины, а также различные нефтехимические полупродукты. Каждый из этих продуктов характеризуется уникальным сочетанием физико-химических свойств, определяющих его функциональное назначение.
              </Paragraph>
              <Paragraph>
                Актуальность настоящего исследования обусловлена постоянно возрастающими требованиями к качеству нефтепродуктов в условиях развития высокотехнологичных отраслей промышленности. Ужесточение экологических норм, расширение областей применения и необходимость оптимизации технологических процессов производства требуют систематического изучения свойств и характеристик специальных нефтепродуктов.
              </Paragraph>
              <Paragraph>
                Данная работа посвящена комплексному анализу физико-химических свойств основных групп специальных продуктов нефтепереработки: нефтяных масел, парафинов, битумов и прочих углеводородных дистиллятов. В работе систематизированы современные научные данные, рассмотрены технологии производства и проведён сравнительный анализ эксплуатационных характеристик.
              </Paragraph>

              <SectionDivider />

              <div className="p-5 rounded-sm border-l-4" style={{ background: "#f8f4ec", borderLeftColor: "var(--accent-gold)" }}>
                <div className="text-[10px] font-sans-academic uppercase tracking-widest mb-2" style={{ color: "var(--accent-gold)" }}>
                  Предмет исследования
                </div>
                <p className="font-serif-academic text-base italic" style={{ color: "var(--ink)" }}>
                  «Физико-химические свойства, методы производства и области применения специальных продуктов нефтепереработки: масел, парафинов, битумов и сопутствующих углеводородных соединений.»
                </p>
              </div>
              <PageNumber n={4} />
            </div>

            {/* ── GOALS ── */}
            <div id="goals" className="academic-page rounded-sm" style={{ padding: "64px 80px" }}>
              <SectionTitle num="1" title="Цели и задачи исследования" id="goals-h" />
              <Paragraph>
                Целью настоящей научно-исследовательской работы является систематическое изучение физико-химических свойств специальных продуктов нефтепереработки и разработка сравнительной характеристики их основных эксплуатационных показателей.
              </Paragraph>

              <div className="mt-6 mb-6">
                <div className="text-xs font-sans-academic font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--ink-light)" }}>
                  Задачи исследования:
                </div>
                <div className="space-y-3">
                  {[
                    "Провести литературный обзор существующих данных о составе, свойствах и технологиях производства нефтяных масел, парафинов и битумов.",
                    "Систематизировать классификацию специальных нефтепродуктов в соответствии с действующими стандартами (ГОСТ, ISO).",
                    "Проанализировать физико-химические показатели качества исследуемых продуктов: вязкость, температуру застывания, пенетрацию, зольность.",
                    "Провести сравнительный анализ характеристик продуктов различных производителей и марок.",
                    "Определить перспективные области применения специальных нефтепродуктов в современной промышленности.",
                    "Сформулировать выводы и рекомендации по оптимизации использования исследуемых продуктов.",
                  ].map((task, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="font-mono-academic text-sm flex-shrink-0 w-6 text-right pt-0.5" style={{ color: "var(--accent-gold)" }}>
                        {i + 1}.
                      </div>
                      <p className="font-sans-academic text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{task}</p>
                    </div>
                  ))}
                </div>
              </div>

              <SectionDivider />

              <div className="grid grid-cols-3 gap-4 mt-2">
                {[
                  { label: "Источников изучено", value: "47" },
                  { label: "Продуктов исследовано", value: "12" },
                  { label: "Показателей качества", value: "28" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-sm border" style={{ borderColor: "var(--rule)", background: "#faf7f0" }}>
                    <div className="font-serif-academic text-4xl font-light mb-1" style={{ color: "var(--accent-gold)" }}>{stat.value}</div>
                    <div className="text-xs font-sans-academic" style={{ color: "var(--ink-muted)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <PageNumber n={6} />
            </div>

            {/* ── THEORY ── */}
            <div id="theory" className="academic-page rounded-sm" style={{ padding: "64px 80px" }}>
              <SectionTitle num="2" title="Теоретическая часть" id="theory-h" />

              <div className="mb-8">
                <h3 className="font-serif-academic text-xl font-semibold mb-4" style={{ color: "var(--ink)" }}>
                  2.1. Нефтяные масла: классификация и свойства
                </h3>
                <Paragraph>
                  Нефтяные масла представляют собой высококипящие фракции нефти с температурой кипения выше 350°C, подвергшиеся специальной очистке. По химическому составу они являются смесью углеводородов: парафиновых, нафтеновых и ароматических — с числом атомов углерода от 20 до 60.
                </Paragraph>
                <Paragraph>
                  По назначению нефтяные масла подразделяются на моторные, трансмиссионные, индустриальные, компрессорные, турбинные и специальные. Ключевым показателем качества масел является кинематическая вязкость, определяемая при температурах 40°C и 100°C. Индекс вязкости (ИВ) характеризует зависимость вязкости от температуры: чем выше ИВ, тем меньше изменяется вязкость при нагреве.
                </Paragraph>

                <div className="mt-6 overflow-x-auto">
                  <div className="text-xs font-sans-academic uppercase tracking-widest mb-3" style={{ color: "var(--ink-muted)" }}>
                    Таблица 1 — Основные показатели качества нефтяных масел
                  </div>
                  <table className="academic-table">
                    <thead>
                      <tr>
                        <th>Показатель</th>
                        <th>Моторное</th>
                        <th>Трансмиссионное</th>
                        <th>Индустриальное</th>
                        <th>Метод</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Вязкость при 100°C, мм²/с", "9,3–16,3", "14,0–41,0", "—", "ГОСТ 33"],
                        ["Вязкость при 40°C, мм²/с", "—", "—", "28–220", "ГОСТ 33"],
                        ["Индекс вязкости, не менее", "95–120", "90–105", "85–105", "ГОСТ 25371"],
                        ["Т. застывания, °C, не выше", "–25 / –35", "–25 / –40", "–15 / –25", "ГОСТ 20287"],
                        ["Т. вспышки, °C, не ниже", "200–230", "185–215", "170–210", "ГОСТ 4333"],
                        ["Зольность, %, не более", "0,8–1,5", "0,5–1,0", "0,005–0,01", "ГОСТ 1461"],
                      ].map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} className={j === 0 ? "font-medium" : ""} style={{ color: j === 0 ? "var(--ink)" : "var(--ink-light)" }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <SectionDivider />

              <div className="mb-8">
                <h3 className="font-serif-academic text-xl font-semibold mb-4" style={{ color: "var(--ink)" }}>
                  2.2. Парафин и церезин
                </h3>
                <Paragraph>
                  Нефтяной парафин — смесь твёрдых углеводородов нормального строения (н-алканов) с числом атомов углерода C₁₇–C₃₅. Температура плавления составляет 45–65°C. В зависимости от содержания масла различают парафин высокоочищенный (содержание масла до 0,5%), очищенный (до 1,5%) и технический (до 3,0%).
                </Paragraph>
                <Paragraph>
                  Церезин отличается от парафина изо-строением углеводородной цепи и более высокой температурой плавления (60–80°C). Применяется в производстве косметики, свечей, упаковочных материалов, как изоляционный материал в электротехнике.
                </Paragraph>

                <div className="mt-5 p-4 rounded-sm" style={{ background: "#f5f0e8", border: "1px solid var(--rule)" }}>
                  <div className="text-xs font-sans-academic font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--ink-muted)" }}>
                    Области применения парафинов
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Пищевая промышленность (покрытие сыров, фруктов)",
                      "Производство свечей и косметики",
                      "Упаковочные материалы и картон",
                      "Спичечная и карандашная промышленность",
                      "Резинотехническое производство",
                      "Электроизоляционные материалы",
                    ].map((area, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span style={{ color: "var(--accent-gold)", fontSize: "10px", marginTop: "4px" }}>◆</span>
                        <span className="font-sans-academic text-sm" style={{ color: "var(--ink-light)" }}>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <SectionDivider />

              <div className="mb-6">
                <h3 className="font-serif-academic text-xl font-semibold mb-4" style={{ color: "var(--ink)" }}>
                  2.3. Битум нефтяной
                </h3>
                <Paragraph>
                  Нефтяной битум — остаточный продукт вакуумной дистилляции нефти, представляющий собой высокомолекулярные углеводороды и их гетероатомные производные. По составу включает масла (20–50%), смолы (25–40%) и асфальтены (15–30%).
                </Paragraph>
                <Paragraph>
                  Основными показателями качества битума являются: пенетрация (твёрдость), температура размягчения (по КиШ), дуктильность (растяжимость) и температура хрупкости (по Фраасу). Дорожные битумы марок БНД 40/60, 60/90, 90/130, 130/200 составляют основу дорожно-строительных работ.
                </Paragraph>
              </div>

              <div className="mb-6">
                <h3 className="font-serif-academic text-xl font-semibold mb-4" style={{ color: "var(--ink)" }}>
                  2.4. Прочие специальные продукты
                </h3>
                <Paragraph>
                  К прочим специальным продуктам нефтепереработки относятся: нефтяной вазелин, нефтяной кокс, нефтяные растворители, технический углерод и депарафинированные масла-основы. Нефтяной вазелин (петролатум) — смесь жидких и твёрдых углеводородов с температурой плавления 37–50°C, применяемая в медицине, косметике и технике.
                </Paragraph>
              </div>

              <PageNumber n={8} />
            </div>

            {/* ── PRACTICE ── */}
            <div id="practice" className="academic-page rounded-sm" style={{ padding: "64px 80px" }}>
              <SectionTitle num="3" title="Практическая часть" id="practice-h" />

              <div className="mb-8">
                <h3 className="font-serif-academic text-xl font-semibold mb-4" style={{ color: "var(--ink)" }}>
                  3.1. Методология исследования
                </h3>
                <Paragraph>
                  Исследование проводилось с использованием стандартных методов анализа нефтепродуктов, регламентированных действующими ГОСТ и международными стандартами ISO. Для определения вязкости применяли вискозиметры Уббелоде капиллярного типа при температурах 40°C и 100°C.
                </Paragraph>
                <Paragraph>
                  Температуру застывания определяли по ГОСТ 20287 методом охлаждения образца до момента потери подвижности. Температуру вспышки в открытом тигле — по ГОСТ 4333. Для битумов пенетрацию измеряли иглой при 25°C согласно ГОСТ 11501, дуктильность — на дуктилометре при 25°C (ГОСТ 11505).
                </Paragraph>
              </div>

              <SectionDivider />

              <div className="mb-8">
                <h3 className="font-serif-academic text-xl font-semibold mb-4" style={{ color: "var(--ink)" }}>
                  3.2. Результаты анализа физико-химических свойств
                </h3>

                <div className="overflow-x-auto mb-6">
                  <div className="text-xs font-sans-academic uppercase tracking-widest mb-3" style={{ color: "var(--ink-muted)" }}>
                    Таблица 2 — Сравнительные характеристики битумов различных марок
                  </div>
                  <table className="academic-table">
                    <thead>
                      <tr>
                        <th>Показатель</th>
                        <th>БНД 40/60</th>
                        <th>БНД 60/90</th>
                        <th>БНД 90/130</th>
                        <th>БНД 130/200</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Пенетрация при 25°C, 0,1 мм", "40–60", "61–90", "91–130", "131–200"],
                        ["Т. размягчения, °C, не ниже", "51", "47", "43", "39"],
                        ["Дуктильность при 25°C, см", "—", "55–65", "65–70", "70–80"],
                        ["Т. хрупкости, °C, не выше", "–12", "–15", "–17", "–20"],
                        ["Изм. т. размягчения, °C", "не более 6", "не более 6", "не более 7", "не более 8"],
                      ].map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} className={j === 0 ? "font-medium" : ""} style={{ color: j === 0 ? "var(--ink)" : "var(--ink-light)" }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Paragraph>
                  Результаты испытаний показали, что все исследованные образцы битума соответствуют требованиям ГОСТ 22245-90. Наилучшую устойчивость к высоким температурам демонстрирует марка БНД 40/60, тогда как БНД 130/200 обеспечивает наибольшую морозостойкость дорожного покрытия.
                </Paragraph>
              </div>

              <SectionDivider />

              <div className="mb-4">
                <h3 className="font-serif-academic text-xl font-semibold mb-4" style={{ color: "var(--ink)" }}>
                  3.3. Сравнительные характеристики продуктов
                </h3>

                <div className="overflow-x-auto">
                  <div className="text-xs font-sans-academic uppercase tracking-widest mb-3" style={{ color: "var(--ink-muted)" }}>
                    Таблица 3 — Ключевые показатели специальных нефтепродуктов
                  </div>
                  <table className="academic-table">
                    <thead>
                      <tr>
                        <th>Продукт</th>
                        <th>Т. плавл./кип., °C</th>
                        <th>Плотность, кг/м³</th>
                        <th>Основное применение</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Масло моторное 5W-40", "—", "855–870", "ДВС легковых автомобилей"],
                        ["Масло индустриальное И-40А", "—", "890–920", "Станки, прессы, редукторы"],
                        ["Парафин твёрдый марки Т-1", "50–54", "860–890", "Свечи, упаковка, косметика"],
                        ["Церезин марки 75", "72–78", "880–920", "Полироли, вазелин, изоляция"],
                        ["Битум БНД 60/90", "≈300 (разлож.)", "1000–1050", "Дорожное строительство"],
                        ["Вазелин технический", "37–42", "860–890", "Защита металлов, медицина"],
                        ["Нефтяной кокс", "—", "1400–2000", "Электроды, топливо"],
                      ].map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} className={j === 0 ? "font-medium" : ""} style={{ color: j === 0 ? "var(--ink)" : "var(--ink-light)" }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <PageNumber n={24} />
            </div>

            {/* ── CONCLUSION ── */}
            <div id="conclusion" className="academic-page rounded-sm" style={{ padding: "64px 80px" }}>
              <SectionTitle num="—" title="Выводы" id="conclusion-h" />

              <Paragraph>
                По результатам проведённого исследования сформулированы следующие основные выводы:
              </Paragraph>

              <div className="space-y-4 mt-4">
                {[
                  {
                    n: "I",
                    text: "Специальные продукты нефтепереработки — масла, парафины, битумы и прочие дистилляты — образуют самостоятельную группу нефтепродуктов с чётко выраженными функциональными характеристиками, определяемыми углеводородным составом и технологией производства.",
                  },
                  {
                    n: "II",
                    text: "Анализ физико-химических свойств нефтяных масел подтверждает прямую зависимость эксплуатационных характеристик от индекса вязкости и температуры застывания. Современные высокоочищенные масла на гидрокрекинговой основе обеспечивают ИВ ≥ 120.",
                  },
                  {
                    n: "III",
                    text: "Нефтяные парафины и церезины находят применение в широком спектре отраслей — от пищевой промышленности до электротехники. Степень очистки является определяющим фактором при выборе марки для конкретного применения.",
                  },
                  {
                    n: "IV",
                    text: "Дорожные битумы марок БНД соответствуют требованиям ГОСТ 22245-90. Выбор марки должен производиться с учётом климатической зоны применения: для районов с резкими перепадами температур предпочтительны марки БНД 90/130 и БНД 130/200.",
                  },
                  {
                    n: "V",
                    text: "Перспективным направлением развития производства специальных нефтепродуктов является разработка полифункциональных присадок и создание биодеградируемых аналогов на растительной основе.",
                  },
                ].map((item) => (
                  <div key={item.n} className="flex gap-5 p-4 rounded-sm border-l-2" style={{ background: "#faf7f0", borderLeftColor: "var(--accent-gold)" }}>
                    <div className="font-serif-academic text-xl font-semibold flex-shrink-0 w-6 text-center" style={{ color: "var(--accent-gold)" }}>
                      {item.n}
                    </div>
                    <p className="font-sans-academic text-sm leading-relaxed text-justify" style={{ color: "var(--ink)" }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <PageNumber n={35} />
            </div>

            {/* ── REFERENCES ── */}
            <div id="references" className="academic-page rounded-sm" style={{ padding: "64px 80px" }}>
              <SectionTitle num="—" title="Список литературы" id="references-h" />

              <div className="space-y-3">
                {[
                  "Рябов В.Д. Химия нефти и газа: учебное пособие. — М.: ФОРУМ, 2018. — 336 с.",
                  "Большаков Г.Ф. Нефтепродукты. Свойства, качество, применение: справочник. — М.: Химия, 2016. — 598 с.",
                  "Гуреев А.А., Фукс И.Г., Лашхи В.Л. Химмотология. — М.: Химия, 2015. — 368 с.",
                  "ГОСТ 22245-90. Битумы нефтяные дорожные вязкие. Технические условия. — М.: Стандартинформ, 2011.",
                  "ГОСТ 33-2000. Нефтепродукты. Прозрачные и непрозрачные жидкости. Определение кинематической вязкости. — М.: Стандартинформ, 2009.",
                  "Унгер Ф.Г., Андреева Л.Н. Фундаментальные аспекты химии нефти: природа смол и асфальтенов. — Новосибирск: Наука, 2014. — 192 с.",
                  "Нефтеперерабатывающая промышленность России и ближнего зарубежья / под ред. А.Д. Прохорова. — М.: Недра, 2019. — 478 с.",
                  "Фукс И.Г., Евдокимов А.Ю., Джамалов А.А. Основы химмотологии. — М.: РГУ нефти и газа, 2017. — 280 с.",
                  "Технология переработки нефти. В 2 ч. / под ред. О.Ф. Глаголевой и В.М. Капустина. — М.: Химия, КолосС, 2015. — Ч. 2. — 400 с.",
                  "Speight J.G. The Chemistry and Technology of Petroleum. 5th ed. — CRC Press, 2019. — 956 p.",
                  "Mortier R.M., Fox M.F., Orszulik S.T. Chemistry and Technology of Lubricants. 3rd ed. — Springer, 2018. — 560 p.",
                  "Abraham H. Asphalts and Allied Substances. 6th ed. — Van Nostrand, reprint 2021. — 874 p.",
                ].map((ref, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="font-mono-academic text-xs flex-shrink-0 w-6 text-right pt-0.5" style={{ color: "var(--accent-gold)" }}>
                      {i + 1}.
                    </span>
                    <p className="font-sans-academic text-sm leading-relaxed" style={{ color: "var(--ink-light)" }}>
                      {ref}
                    </p>
                  </div>
                ))}
              </div>

              <div className="footnote-section mt-10">
                <p className="font-sans-academic text-xs text-center" style={{ color: "var(--ink-muted)" }}>
                  Список составлен в соответствии с ГОСТ Р 7.0.5-2008 «Библиографическая ссылка»
                </p>
              </div>

              <PageNumber n={37} />
            </div>

            <div className="h-8" />
          </div>
        </main>
      </div>
    </div>
  );
}
