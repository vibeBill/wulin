"use client";

import { Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Section from "./components/Section";
import data from "./data";

export default function Home() {
  const [selectIndex, setSelectIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([0]); // 用栈存储历史操作

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log("Playback failed:", error);
        });
      }
      // 移除事件监听器，因为我们只需要触发一次
      ["click", "touchstart", "keydown"].forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };

    // 添加多个事件监听器来检测用户交互
    ["click", "touchstart", "keydown"].forEach((event) => {
      document.addEventListener(event, handleUserInteraction);
    });

    // 尝试直接播放
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Auto-play failed, waiting for user interaction");
      });
    }

    // 清理函数
    return () => {
      ["click", "touchstart", "keydown"].forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  const handleClick = (index: number) => {
    setSelectIndex(index);
    setHistory((prev) => [...prev, index]); // 将新操作推入历史栈
  };

  const handleUndo = () => {
    if (history.length <= 1) return; // 如果只有初始状态，不执行撤回

    const newHistory = [...history];
    newHistory.pop(); // 移除最后一个操作
    const previousIndex = newHistory[newHistory.length - 1]; // 获取上一个状态的索引

    setSelectIndex(previousIndex);
    setHistory(newHistory);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="auto"
        playsInline // 对iOS设备很重要
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
            {data &&
              data.map((item, index) => (
                <Section
                  className={`${index === selectIndex ? styles.active : null}`}
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
