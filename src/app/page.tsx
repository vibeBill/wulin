"use client";

import { Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Section from "./components/Section";
import data from "./data";

type AudioContextType = typeof AudioContext;
interface Window {
  webkitAudioContext: AudioContextType;
}

export default function Home() {
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([0]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [isAudioInitialized, setIsAudioInitialized] = useState<boolean>(false);

  const initializeAudio = async (): Promise<void> => {
    if (isAudioInitialized) return;

    try {
      // 使用类型断言来处理 AudioContext
      const AudioContextClass = (window.AudioContext ||
        (window as any).webkitAudioContext) as AudioContextType;
      audioContextRef.current = new AudioContextClass();

      // 加载音频文件
      const response = await fetch("/audio/bgm.mp3");
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(
        arrayBuffer
      );

      // 创建音频源
      audioSourceRef.current = audioContextRef.current.createBufferSource();
      audioSourceRef.current.buffer = audioBuffer;
      audioSourceRef.current.connect(audioContextRef.current.destination);
      audioSourceRef.current.loop = true;

      // 开始播放
      audioSourceRef.current.start(0);
      setIsAudioInitialized(true);
    } catch (error) {
      console.error("Audio initialization failed:", error);
    }
  };

  const handleUserInteraction = (): void => {
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume();
    }
    initializeAudio();
  };

  const handleClick = (index: number): void => {
    handleUserInteraction();
    setSelectIndex(index);
    setHistory((prev) => [...prev, index]);
    if (index === 0) {
      setHistory([0]);
    }
  };

  const handleUndo = (): void => {
    if (history.length <= 1) return;

    handleUserInteraction();
    const newHistory = [...history];
    newHistory.pop();
    setSelectIndex(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };

  useEffect(() => {
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <div
        className={styles.page}
        onTouchStart={handleUserInteraction}
        onClick={handleUserInteraction}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              className={styles.undoButton}
            >
              <Undo2 size={20} />
            </button>
          </div>

          <div className={styles.content}>
            {data?.map((item, index) => (
              <Section
                className={`${index === selectIndex ? styles.active : ""}`}
                key={index}
                props={item}
                handleClick={handleClick}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
