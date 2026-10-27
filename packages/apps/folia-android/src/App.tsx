import { LyricVisualizer } from "@suno-folia/lyric-core";
import { parseLRC } from "@suno-folia/lyric-core";
import i18next from "i18next";
import { useState } from "react";

const defaultLyrics = `[00:00.00]Night skies above us
[00:04.50]Show me where your hope is
[00:09.00]Only if you feel it
[00:13.50]Only if you feel it`;

const parsedLyrics = parseLRC(defaultLyrics);

export const App: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const handleLineChange = (index: number) => {
    setCurrentLine(index);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    document.body.className = theme === "dark" ? "" : "light-theme";
  };

  return (
    <div
      style={{
        margin: "0",
        padding: "20px",
        minHeight: "100vh",
        background: theme === "dark" ? "#1a1a2e" : "#f5f5f5",
        color: theme === "dark" ? "#e0e0e0" : "#212121",
        fontFamily: "system-ui, -apple-system, sans-serif",
        direction: i18next.dir() === "rtl" ? "rtl" : "ltr",
      }}
    >
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        {i18next.t("title")}
      </h1>

      <section style={{ padding: "20px", margin: "20px 0", borderRadius: "8px" }}>
        <h2>{i18next.t("player")}</h2>
        <LyricVisualizer />
        <div style={{ marginTop: "20px" }}>
          <p>Line {currentLine + 1} of {parsedLyrics.length}</p>
          <button
            onClick={toggleTheme}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              background: theme === "dark" ? "#6366f1" : "#a5f3fc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
      </section>

      <section style={{ padding: "20px", margin: "20px 0", borderRadius: "8px" }}>
        <h2>{i18next.t("settings")}</h2>
        <p>Language: 
          <select
            onChange={(e) => i18next.changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="he">עברית</option>
            <option value="ur">اردو</option>
          </select>
        </p>
        <p>Theme: {theme}</p>
      </section>
    </div>
  );
};