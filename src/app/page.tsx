"use client";

import { Undo2, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Section from "./components/Section";
import data from "./data";

export default function Home() {
  const [selectIndex, setSelectIndex] = useState(0);
  const [history, setHistory] = useState([0]);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // 初始化 AudioContext
  const initializeAudioContext = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }
    } catch (error) {
      console.error("AudioContext initialization failed:", error);
    }
  };

  // 处理音频加载
  const handleAudioLoad = () => {
    setIsAudioReady(true);
  };

  // 处理音频错误
  const handleAudioError = (e: any) => {
    console.error("Audio loading error:", e);
    setIsAudioReady(false);
  };

  // 处理用户交互
  const handleUserInteraction = async () => {
    try {
      await initializeAudioContext();
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Playback failed:", error);
              setIsPlaying(false);
            });
        }
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  // 切换音频播放状态
  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await handleUserInteraction();
      } catch (error) {
        console.error("Toggle audio failed:", error);
      }
    }
  };

  const handleClick = (index: number): void => {
    setSelectIndex(index);
    setHistory((prev) => [...prev, index]);
    if (index === 0) {
      setHistory([0]);
    }
  };

  const handleUndo = (): void => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop();
    setSelectIndex(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };

  useEffect(() => {
    // 预加载音频
    if (audioRef.current) {
      audioRef.current.load();
    }

    // 清理函数
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        preload="auto"
        loop
        playsInline
        onLoadedData={handleAudioLoad}
        onError={handleAudioError}
      />
      <div className={styles.page} onClick={handleUserInteraction}>
        <div className={styles.container}>
          <div className={styles.header}>
            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              className={styles.undoButton}
            >
              <Undo2 size={20} />
            </button>
            {isAudioReady && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAudio();
                }}
                className={styles.audioButton}
              >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            )}
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
