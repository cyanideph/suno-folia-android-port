import { createRoot } from "react-dom/client";
import { App } from "./App";
import { i18next } from "@suno-folia/lyric-core";

i18next.changeLanguage("en");

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);