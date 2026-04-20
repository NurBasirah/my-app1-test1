"use client";

import React, { useState, useEffect } from 'react';
import { hsk1 } from '../data/hsk1';
import styles from './page.module.css';
import Celebration from './Celebration';
import HanziPractice from './HanziPractice';

export default function MandarinSystem() {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState("");
  const [score, setScore] = useState(null);

  const wordsPerLesson = 10;
  const totalLessons = Math.ceil(hsk1.length / wordsPerLesson);
  const activeWords = currentLesson ? hsk1.slice((currentLesson - 1) * wordsPerLesson, currentLesson * wordsPerLesson) : [];
  const currentCard = activeWords[currentIndex];

    // --- PLAY SOUND ---
  const playSound = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN'; // Ensures it uses the Chinese voice
  window.speechSynthesis.speak(utterance);
  }; 

  // --- AUDIO & SPEECH LOGIC ---
  const speak = (text) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition is not supported in this browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.onstart = () => { setIsListening(true); setScore(null); };
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpeechResult(transcript);
      const target = currentCard.hanzi;
      let matches = 0;
      for (let char of transcript) { if (target.includes(char)) matches++; }
      setScore(Math.min(Math.round((matches / target.length) * 100), 100));
    };
    recognition.start();
  };

  const handleNext = () => {
    setIsFlipped(false);
    setIsWritingMode(false);
    setScore(null);
    setSpeechResult("");
    if (currentIndex === activeWords.length - 1) setIsFinished(true);
    else setCurrentIndex((prev) => prev + 1);
  };

  if (currentLesson === null) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>HSK 1 Lessons</h1>
        <div className={styles.lessonGrid}>
          {Array.from({ length: totalLessons }, (_, i) => i + 1).map((num) => (
            <button key={num} className={styles.lessonCard} onClick={() => setCurrentLesson(num)}>
              <span>Lesson {num}</span>
              <small>Words {(num - 1) * 10 + 1} - {Math.min(num * 10, hsk1.length)}</small>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isFinished) return <Celebration currentLesson={currentLesson} onNextLesson={() => { setCurrentLesson(prev => prev + 1); setCurrentIndex(0); setIsFinished(false); }} onBackToMenu={() => setCurrentLesson(null)} />;

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => setCurrentLesson(null)}>← Back</button>
      <h1 className={styles.title}>Cute HSK 1</h1>

      <div className={styles.progressContainer} style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
        <span>Lesson {currentLesson}</span>
        <span>{currentIndex + 1} / {activeWords.length}</span>
      </div>

      <div className={`${styles.flashcardContainer} ${isFlipped ? styles.isFlipped : ''}`} onClick={() => !isWritingMode && setIsFlipped(!isFlipped)}>
        <div className={styles.flashcardInner}>
          
          <div className={styles.cardFront}>
            <h1 className={styles.hanzi} style={{ fontSize: currentCard.hanzi.length > 5 ? '2.5rem' : '5.5rem' }}>{currentCard.hanzi}</h1>
            <p className={styles.hintText}>Tap to flipppppppppppp 👆</p>
          </div>

          <div className={styles.cardBack}>
            {isWritingMode ? (
              <div className={styles.writingOverlay}>
                <button className={styles.closeWriting} onClick={(e) => { e.stopPropagation(); setIsWritingMode(false); }}>✕</button>
                <HanziPractice character={currentCard.hanzi[0]} />
              </div>
            ) : (
              <>
                {/* Hanzi Above the Line */}
                <h1 className={styles.hanzi} style={{ fontSize: '4rem', marginBottom: '10px' }}>{currentCard.hanzi}</h1>
                <div className={styles.revealedContent}>
                  <p className={styles.pinyin}>{currentCard.pinyin}</p>
                  <h3 className={styles.english}>{currentCard.english}</h3>
                  <div className="flex flex-col gap-2 items-center">
                    <button className={styles.listenButton} onClick={(e) => { e.stopPropagation(); speak(currentCard.hanzi); }}>🔊 Listen</button>
                    <button className={`${styles.listenButton} ${isListening ? styles.audioPlaying : ""}`} onClick={(e) => { e.stopPropagation(); startSpeechRecognition(); }}>
                      {isListening ? "Listening..." : "🎤 Speak & Check"}
                    </button>
                    <button className={styles.practiceBtn} onClick={(e) => { e.stopPropagation(); setIsWritingMode(true); }}>✍️ Practice Writing</button>
                    {score !== null && <div className={styles.scoreCircle}><b>{score}</b><small>Score</small></div>}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.gradingContainer}>
        {isFlipped && <button className={styles.gotItBtn} onClick={handleNext}>Next Word ✨</button>}
      </div>
    </div>
  );
}
