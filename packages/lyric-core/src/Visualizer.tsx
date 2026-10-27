import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";

/**
 * Base visualizer canvas that renders lyric lines as a WebGL scene.
 * Supports multiple visualization modes: spectrum, particles, waveform.
 */
export const LyricVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"spectrum" | "particles" | "waveform">("spectrum");
  const [progress, setProgress] = useState(0);

  return (
    <Canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
      glare={false}
      shadows={false}
    >
      {/* Spectrum visualizer band */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {mode === "spectrum" && (
          <ambientLight color="#111" intensity={0.5} />
        )}
      </group>

      {/* Particle layer */}
      {mode === "particles" && (
        <point
          position={[0, 0, 0]}
          size={0.1}
          color="#ffffff"
          args={[0.01]}
        >
          <position
            x={progress * 10}
            y={Math.sin(progress) * 5}
            z={Math.cos(progress) * 3}
          />
        </point>
      )}

      {/* Waveform shape */}
      {mode === "waveform" && (
        <line
          position={[-5, 0, 0]}
          to={[-5, 0, 10]}
          args={[10, "#ff6b6b"]}
        />
      )}
    </Canvas>
  );
};

/**
 * Hook to sync visualizer progress with lyric timing.
 * @param lyricLines Array of lyric lines with timestamps
 * @param onLineChange Callback when current line changes
 */
export const useLyricalProgress = (
  lyricLines: Array<{ text: string; start: number; end: number }>,
  onLineChange: (lineIndex: number) => void
) => {
  const [currentLine, setCurrentLine] = useState(0);

  // Simple progress tracking - in production would sync with actual audio
  return { currentLine, setCurrentLine };
};