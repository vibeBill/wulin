"use client";

import { Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Section from "./components/Section";
import data from "./data";

export default function Home() {
  const [selectIndex, setSelectIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 统一处理音频播放
  const playAudio = () => {
    if (!audioRef.current || !isFirstInteraction) return;

    audioRef.current
      .play()
      .then(() => setIsFirstInteraction(false))
      .catch((error) => console.log("播放失败:", error));
  };

  const handleClick = (index: number) => {
    playAudio();
    setSelectIndex(index);
    setHistory((prev) => [...prev, index]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;

    playAudio();
    const newHistory = [...history];
    newHistory.pop();
    setSelectIndex(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="auto"
        playsInline
        // 添加 muted 属性解决 iOS 自动播放限制
        muted={isFirstInteraction}
      />
      <div className={styles.page}>
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
                handleClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
