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

  const [firstInteraction, setFirstInteraction] = useState(true);

  const [notSupport, setNotSupport] = useState(false);

  // 初始化音频
  const initializeAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.src = "/audio/bgm.mp3";
      audioRef.current.preload = "auto";
      audioRef.current.loop = true;

      // 添加事件监听器
      audioRef.current.addEventListener("loadeddata", handleAudioLoad);
      audioRef.current.addEventListener("error", handleAudioError);
      audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough);
      audioRef.current.addEventListener("playing", () => setIsPlaying(true));
      audioRef.current.addEventListener("pause", () => setIsPlaying(false));
    }
  };

  // 处理音频加载完成
  const handleAudioLoad = () => {
    setIsAudioReady(true);
  };

  // 处理音频可以播放
  const handleCanPlayThrough = () => {
    setIsAudioReady(true);
  };

  // 处理音频错误
  const handleAudioError = (e: Event) => {
    const target = e.target as HTMLAudioElement;
    console.error("Audio loading error:", {
      error: target.error,
      readyState: target.readyState,
      networkState: target.networkState,
      src: target.src,
    });
    setIsAudioReady(false);
    setNotSupport(true);
  };

  // 处理用户交互
  const handleUserInteraction = async () => {
    if (!audioRef.current) return;

    try {
      // 重新加载音频
      audioRef.current.load();

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Playback failed:", error);
      setIsPlaying(false);

      // 如果播放失败，尝试重新初始化
      initializeAudio();
    }
  };

  const handleUserClick = async () => {
    if (!firstInteraction) return;
    await handleUserInteraction();
    setFirstInteraction(false);
  };

  // 切换音频播放状态
  const toggleAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  // 初始化
  useEffect(() => {
    initializeAudio();

    // 清理函数
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadeddata", handleAudioLoad);
        audioRef.current.removeEventListener("error", handleAudioError);
        audioRef.current.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return (
    <>
      <div className={styles.page} onClick={handleUserClick}>
        <div className={styles.header}>
          {isAudioReady ? (
            <button
              onClick={toggleAudio}
              className={styles.audioButton}
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
            >
              {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          ) : notSupport ? (
            <p>当前浏览器不支持播放背景音乐</p>
          ) : (
            <p>背景音乐加载中。。。</p>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUndo();
            }}
            disabled={history.length <= 1}
            className={styles.undoButton}
          >
            <Undo2 size={20} />
          </button>
        </div>
        <div className={styles.container}>
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
