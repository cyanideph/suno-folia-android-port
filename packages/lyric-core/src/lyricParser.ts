/**
 * Parses LRC format lyrics with millisecond-precision timestamps.
 * Also supports plain TXT and embedded lyric formats.
 */
export interface LyricLine {
  text: string;
  start: number; // milliseconds
  end: number; // milliseconds
  duration: number; // end - start
}

/**
 * Parse LRC lyric string into structured lines.
 * LRC format: [mm:ss.xx]text
 */
export const parseLRC = (lrc: string): LyricLine[] => {
  const lines: LyricLine[] = [];
  const regex = /\[(\d{2}:\d{2}\.\d{2})\]([^\[]+)/g;
  let match;

  while ((match = regex.exec(lrc)) !== null) {
    const [, time, text] = match;
    const [minutes, seconds] = time.split(":").map(Number);
    const ms = Math.round((minutes * 60 + seconds) * 1000);

    lines.push({
      text: text.trim(),
      start: ms,
      end: ms + 1000, // default 1s display duration
      duration: 1000,
    });
  }

  return lines;
};

/**
 * Parse plain TXT lyrics. Timestamps are assigned equally across the duration.
 * @param txt Plain text lyric
 * @param totalDuration Total duration in milliseconds
 */
export const parseTXT = (txt: string, totalDuration: number): LyricLine[] => {
  const lines = txt.split("\n").filter((line) => line.trim().length > 0);
  const numLines = Math.max(lines.length, 1);
  const lineDuration = totalDuration / numLines;

  return lines.map((text, index) => ({
    text: text.trim(),
    start: index * lineDuration,
    end: (index + 1) * lineDuration,
    duration: lineDuration,
  }));
};

/**
 * Parse embedded lyrics from a .lyricmv project file format.
 * Embedded format: LYRIC starts on its own line, followed by "timestamp:text" pairs.
 */
export const parseEmbedded = (content: string): LyricLine[] => {
  const lines: LyricLine[] = [];
  const embeddedRegex = /(\d{2}:\d{2}:\d{2}[,\.]\d{3}):(.+)/g;
  let match;

  while ((match = embeddedRegex.exec(content)) !== null) {
    const [, timestamp, text] = match;
    const [hours, minutes, seconds] = timestamp
      .replace(",", ".")
      .split(":")
      .map(Number);
    const ms = Math.round((hours * 3600 + minutes * 60 + seconds) * 1000);

    lines.push({
      text: text.trim(),
      start: ms,
      end: ms + 5000, // default 5s for embedded
      duration: 5000,
    });
  }

  return lines;
};

export default { parseLRC, parseTXT, parseEmbedded };