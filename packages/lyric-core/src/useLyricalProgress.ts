import { useEffect, useState } from "react";
import { LyricLine } from "./lyricParser";

/**
 * Hook that tracks the current lyric line based on audio progress.
 * Uses an interval to update every 250ms.
 * 
 * @param lyricLines Parsed lyric lines with start/end times
 * @param audioDuration Total audio duration in ms (for cleanup)
 * @param onLineChange Callback when current line changes
 */
export const useLyricalProgress = (
  lyricLines: LyricLine[],
  audioDuration: number,
  onLineChange: (currentIndex: number, totalLines: number) => void
) => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isRunning = true;

    const updateCurrentLine = () => {
      if (!isRunning) return;

      // Find the current line based on progress
      let foundIndex = 0;
      for (let i = 0; i < lyricLines.length; i++) {
        if (lyricLines[i].start <= audioDuration && lyricLines[i].end >= audioDuration) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex !== currentLine) {
        setCurrentLine(foundIndex);
        onLineChange(foundIndex, lyricLines.length);
      }
    };

    // Initial update
    updateCurrentLine();

    // Set up interval for real-time tracking
    timeoutId = setInterval(updateCurrentLine, 250);

    return () => {
      isRunning = false;
      clearInterval(timeoutId as NodeJS.Timeout);
    };
  }, [lyricLines, audioDuration, onLineChange, currentLine]);

  return { currentLine, setCurrentLine };
};
export default useLyricalProgress;