"use client";

import React, { useState } from 'react';
import { hsk1 } from '../data/hsk1';
import styles from './page.module.css';
import Celebration from './Celebration';

export default function MandarinSystem() {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const wordsPerLesson = 10;
  const totalLessons = Math.ceil(hsk1.length / wordsPerLesson);
  
  const activeWords = currentLesson 
    ? hsk1.slice((currentLesson - 1) * wordsPerLesson, currentLesson * wordsPerLesson) 
    : [];
  const currentCard = activeWords[currentIndex];

  const speak = (text) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex === activeWords.length - 1) {
      setIsFinished(true); 
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToNextLesson = () => {
    if (currentLesson < totalLessons) {
      setCurrentLesson(prev => prev + 1);
      setCurrentIndex(0);
      setIsFinished(false);
      setIsFlipped(false);
    } else {
      setCurrentLesson(null);
      setIsFinished(false);
    }
  };

  // --- VIEW 1: LESSON SELECTION MENU ---
  if (currentLesson === null) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>HSK 1 Lessons</h1>
        <p style={{ color: '#888', marginBottom: '20px' }}>Pick a lesson to start! 🎒</p>
        <div className={styles.lessonGrid}>
          {Array.from({ length: totalLessons }, (_, i) => i + 1).map((num) => (
            <button 
              key={num} 
              className={styles.lessonCard} 
              onClick={() => { setCurrentLesson(num); setCurrentIndex(0); setIsFinished(false); }}
            >
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Lesson {num}</span>
              <small style={{ color: '#aaa', marginTop: '5px', display: 'block' }}>
                Words {(num - 1) * 10 + 1} - {Math.min(num * 10, hsk1.length)}
              </small>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- VIEW 2: CELEBRATION VIEW ---
  if (isFinished) {
    return (
      <Celebration 
        currentLesson={currentLesson} 
        onNextLesson={goToNextLesson} 
        onBackToMenu={() => setCurrentLesson(null)} 
      />
    );
  }

  // --- VIEW 3: STUDY MODE VIEW ---
  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => setCurrentLesson(null)}>← Back</button>
      
      <h1 className={styles.title}>Cute HSK 1</h1>

      <div className={styles.progressContainer} style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
        <span>Lesson {currentLesson}</span>
        <span>{currentIndex + 1} / {activeWords.length}</span>
      </div>

      <div 
        className={`${styles.flashcardContainer} ${isFlipped ? styles.isFlipped : ''}`} 
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={styles.flashcardInner}>
          
          <div className={styles.cardFront}>
            <h1 
              className={styles.hanzi} 
              style={{ fontSize: currentCard.hanzi.length > 5 ? '2.5rem' : '5.5rem' }}
            >
              {currentCard.hanzi}
            </h1>
            <p className={styles.hintText}>Tap to flip 👆</p>
          </div>

          <div className={styles.cardBack}>
            <h1 
              className={styles.hanzi} 
              style={{ 
                fontSize: currentCard.hanzi.length > 5 ? '2rem' : '4rem',
                marginBottom: '10px' 
              }}
            >
              {currentCard.hanzi}
            </h1>

            <div className={styles.revealedContent}>
              <p className={styles.pinyin}>{currentCard.pinyin}</p>
              <h3 className={styles.english}>{currentCard.english}</h3>
              <button 
                className={styles.listenButton}
                onClick={(e) => { 
                  e.stopPropagation(); 
                  speak(currentCard.hanzi); 
                }}
              >
                🔊 Lissssssssssten
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.gradingContainer}>
        {!isFlipped ? (
          <p style={{ color: '#aaa', fontStyle: 'italic' }}>Tap card to reveal answer!</p>
        ) : (
          <button className={styles.gotItBtn} onClick={handleNext}>
            {currentIndex === activeWords.length - 1 ? "Finish Lesson! 🏁" : "Next Word ✨"}
          </button>
        )}
      </div>
    </div>
  );
}
