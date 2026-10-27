import { LyricVisualizer } from "@suno-folia/lyric-core";
import { useLyricalProgress } from "@suno-folia/lyric-core";
import { parseLRC } from "@suno-folia/lyric-core";
import { useLyricalProgress as useLyricalProgressHook } from "@suno-folia/lyric-core";
import i18next from "i18next";
import { useState } from "react";

const lyricsText = `[00:00.00]Hello world
[00:05.00]This is a test
[00:10.00]Of the lyric system`;

const parsedLyrics = parseLRC(lyricsText);

export const App: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const { currentLine: trackedLine, setCurrentLine: setTrackedLine } = useLyricalProgress(
    parsedLyrics,
    0,
    (index) => setCurrentLine(index)
  );

  const handleExport = () => {
    // TODO: Trigger video export pipeline
    window.alert("Export triggered - would invoke Capacitor export-sink plugin");
  };

  return (
    <div
      style={{
        margin: "0",
        padding: "20px",
        minHeight: "100vh",
        direction: i18next.dir() === "rtl" ? "rtl" : "ltr",
      }}
    >
      <h1>{i18next.t("title")}</h1>

      <section style={{ margin: "20px 0" }}>
        <h2>{i18next.t("lyrics")}</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {parsedLyrics.map((line, idx) => (
            <li
              key={idx}
              style={{
                margin: "8px 0",
                fontSize: "1.2rem",
                borderBottom: `1px solid ${idx === currentLine ? "#ff6b6b" : "#ddd"}`,
                paddingBottom: "8px",
              }}
            >
              [{line.start / 1000}s] {line.text}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{i18next.t("visualizer")}</h2>
        <LyricVisualizer />
        <p>Current line: {currentLine + 1} of {parsedLyrics.length}</p>
        <button onClick={handleExport} style={{ marginTop: "10px" }}>
          {i18next.t("export")}
        </button>
      </section>

      <section>
        <h2>{i18next.t("settings")}</h2>
        <p>Language: 
          <select
            onChange={(e) => {
              const lang = e.target.value;
              i18next.changeLanguage(lang);
              document.documentDir = lang === "ar" || lang === "he" || lang === "ur" ? "rtl" : "ltr";
            }}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="he">עברית</option>
            <option value="ur">اردو</option>
          </select>
        </p>
      </section>
    </div>
  );
};