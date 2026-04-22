import Icon from "@/components/ui/icon";
import { generateDocx } from "@/lib/generateDocx";

const chapters = [
  { id: "cover", short: "Титул" },
  { id: "toc", short: "Содержание" },
  { id: "intro", short: "Введение" },
  { id: "goals", short: "Цели" },
  { id: "theory", short: "Теория" },
  { id: "practice", short: "Практика" },
  { id: "conclusion", short: "Выводы" },
  { id: "references", short: "Литература" },
];

interface DocHeaderProps {
  active: string;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onScrollTo: (id: string) => void;
}

export default function DocHeader({ active, sidebarOpen, onToggleSidebar, onScrollTo }: DocHeaderProps) {
  return (
    <>
      <header
        className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 border-b"
        style={{ background: "#1a1a1a", borderColor: "#333" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => generateDocx()}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-sans-academic font-medium transition-all hover:opacity-90"
            style={{ background: "#1a5276", color: "white" }}
          >
            <Icon name="FileDown" size={13} />
            Скачать Word
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-sans-academic font-medium transition-all hover:opacity-90"
            style={{ background: "#444", color: "white" }}
          >
            <Icon name="Printer" size={13} />
            Печать / PDF
          </button>
        </div>
      </header>

      {sidebarOpen && (
        <aside
          className="no-print fixed left-0 top-[48px] bottom-0 w-56 overflow-y-auto border-r z-40"
          style={{ background: "#f4f4f4", borderColor: "#d0d0d0" }}
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
                  onClick={() => onScrollTo(ch.id)}
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
    </>
  );
}
