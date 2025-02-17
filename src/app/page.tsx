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

  // 统一处理音频播放
  const playAudio = () => {
    if (!isFirstInteraction) return;

    const audioContext = new AudioContext();
    const source = audioContext.createBufferSource();
    // 加载音频文件
    fetch("/audio/bgm.mp3", {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
        setIsFirstInteraction(false);
      })
      .catch((error) => console.log("播放失败:", error));
  };

  const handleClick = (index: number) => {
    playAudio();
    setSelectIndex(index);
    setHistory((prev) => [...prev, index]);
    if (index === 0) {
      setHistory([0]);
    }
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
      <div className={styles.page} onTouchStart={playAudio}>
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
