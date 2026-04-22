import { useState, useEffect } from "react";
import DocHeader from "@/components/academic/DocHeader";
import DocSections from "@/components/academic/DocSections";

const chapters = [
  { id: "cover" },
  { id: "toc" },
  { id: "intro" },
  { id: "goals" },
  { id: "theory" },
  { id: "practice" },
  { id: "conclusion" },
  { id: "references" },
];

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
    <div className="min-h-screen" style={{ background: "#e0e0e0" }}>
      <DocHeader
        active={active}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onScrollTo={scrollTo}
      />

      <div className="flex pt-[48px]">
        <main
          className="flex-1 py-10 px-6 transition-all duration-300"
          style={{ marginLeft: sidebarOpen ? "224px" : "0" }}
        >
          <DocSections onScrollTo={scrollTo} />
        </main>
      </div>
    </div>
  );
}
