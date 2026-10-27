import { createRoot } from "react-dom/client";
import { App } from "./App";
import { i18next, getTextDirection } from "@suno-folia/lyric-core";

i18next.changeLanguage("en");

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Apply text direction based on current language
document.documentDir = i18next.language === "ar" || i18next.language === "he" || i18next.language === "ur" ? "rtl" : "ltr";