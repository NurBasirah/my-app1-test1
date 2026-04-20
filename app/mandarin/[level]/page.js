"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from '../page.module.css'; 
import Celebration from '../Celebration';
import HanziPractice from '../HanziPractice';

export default function MandarinSystem() {
  const params = useParams();
  const level = params.level;

  // --- State Management ---
  const [words, setWords] = useState([]); 
  const [totalWords, setTotalWords] = useState(0); 
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [charIndex, setCharIndex] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState("");
  const [forgottenWords, setForgottenWords] = useState([]);

  const wordsPerLesson = 10;

  // --- 1. Initial Load: Get Count for Menu ---
  useEffect(() => {
    async function getLessonCount() {
      setLoading(true);
      const { count, error } = await supabase
        .from('vocabulary')
        .select('*', { count: 'exact', head: true }) 
        .eq('hsk_level', level);

      if (!error) setTotalWords(count || 0);
      setLoading(false);
    }
    if (level) getLessonCount();
  }, [level]);

  // --- 2. Selective Load: Get 10 Words for Selected Lesson ---
  useEffect(() => {
    async function fetchLessonWords() {
      if (currentLesson === null) return;
      
      setLoading(true);
      const start = (currentLesson - 1) * wordsPerLesson;
      const end = start + wordsPerLesson - 1;

      const { data, error } = await supabase
        .from('vocabulary')
        .select('*')
        .eq('hsk_level', level)
        .order('id', { ascending: true })
        .range(start, end); 

      if (!error) {
        setWords(data);
        setCurrentIndex(0); 
      }
      setLoading(false);
    }
    fetchLessonWords();
  }, [currentLesson, level]);

  // --- 3. Audio & Speech Recognition Logic ---
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
      const target = words[currentIndex].character;
      let matches = 0;
      for (let char of transcript) { if (target.includes(char)) matches++; }
      setScore(Math.min(Math.round((matches / target.length) * 100), 100));
    };
    recognition.start();
  };

  const handleNext = () => {
    setIsFlipped(false);
    setIsWritingMode(false);
    setCharIndex(0);
    setScore(null);
    setSpeechResult("");
    if (currentIndex === words.length - 1) setIsFinished(true);
    else setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
  if (currentIndex === 0) return; // nothing to go back to
  setIsFlipped(false);
  setIsWritingMode(false);
  setCharIndex(0);
  setScore(null);
  setSpeechResult("");
  setCurrentIndex((prev) => prev - 1);
};

const handleReviewForgotten = () => {
  // Filter the original word list to only those marked forgotten
  const forgottenWordObjects = words.filter(w => forgottenWords.includes(w.id));
  if (forgottenWordObjects.length === 0) return;
  setWords(forgottenWordObjects);
  setCurrentIndex(0);
  setIsFinished(false);
  setForgottenWords([]); // clear after starting review
};

const handleForgot = () => {
  // Add current word to forgotten list (avoid duplicates)
  setForgottenWords(prev => {
    if (!prev.includes(words[currentIndex].id)) {
      return [...prev, words[currentIndex].id];
    }
    return prev;
  });
  
  // Move to next word
  setIsFlipped(false);
  setIsWritingMode(false);
  setCharIndex(0);
  setScore(null);
  setSpeechResult("");
  if (currentIndex === words.length - 1) setIsFinished(true);
  else setCurrentIndex((prev) => prev + 1);
};

  // --- Render logic ---

  if (loading && currentLesson === null) {
    return <div className={styles.container}><h1>Loading HSK {level}...</h1></div>;
  }

  // --- VIEW 1: Lesson Menu ---
  if (currentLesson === null) {
    const totalLessons = Math.ceil(totalWords / wordsPerLesson);
    return (
      <div className={styles.container}>
        <Link href="/mandarin/category" className={styles.backBtn}>← Back to Categories</Link>
        <h1 className={styles.title}>HSK {level} Lessons</h1>
        <p className={styles.subtitle}>Total words: {totalWords}</p>
        <div className={styles.lessonGrid}>
          {Array.from({ length: totalLessons }, (_, i) => i + 1).map((num) => (
            <button key={num} className={styles.lessonCard} onClick={() => setCurrentLesson(num)}>
              <span>Lesson {num}</span>
              <small>Words {(num - 1) * 10 + 1} - {Math.min(num * 10, totalWords)}</small>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- VIEW 2: Celebration ---
  if (isFinished) {
    return (
      <Celebration 
        currentLesson={currentLesson} 
        onNextLesson={() => { 
          setCurrentLesson(prev => prev + 1); 
          setIsFinished(false); 
          setForgottenWords([]); 
        }} 
        onBackToMenu={() => { 
          setCurrentLesson(null); 
          setIsFinished(false); 
          setForgottenWords([]); 
        }}
        onReviewForgotten={handleReviewForgotten}
        words={words}
        forgottenCount={forgottenWords.length}
      />
    );
  }

  const currentCard = words[currentIndex];
  if (!currentCard) return null;

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => setCurrentLesson(null)}>← Lessons</button>
      <h1 className={styles.title}>Cute HSK {level}</h1>

      <div className={styles.progressContainer} style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
        <span>Lesson {currentLesson}</span>
        <span>{currentIndex + 1} / {words.length}</span>
      </div>

      <div className={`${styles.flashcardContainer} ${isFlipped ? styles.isFlipped : ''}`} 
           onClick={() => !isWritingMode && setIsFlipped(!isFlipped)}>
        <div className={styles.flashcardInner}>
          
          <div className={styles.cardFront}>
            <h1 className={styles.hanzi} style={{ fontSize: currentCard.character.length > 3 ? '3rem' : '5.5rem' }}>
              {currentCard.character}
            </h1>
            <p className={styles.hintText}>Tap to flip 👆</p>
          </div>

          <div className={styles.cardBack}>
            {isWritingMode ? (
              <div className={styles.writingOverlay}>
                <button className={styles.closeWriting} onClick={(e) => { e.stopPropagation(); setIsWritingMode(false); }}>✕</button>
                <HanziPractice character={currentCard.character[charIndex]} />
                {currentCard.character.length > 1 && (
                  <div className={styles.charNav}>
                    {currentCard.character.split('').map((c, i) => (
                      <button key={i} onClick={(e) => { e.stopPropagation(); setCharIndex(i); }} 
                              className={charIndex === i ? styles.activeChar : ''}
                              style={{ padding: '8px', margin: '2px', borderRadius: '5px', background: charIndex === i ? '#e11d48' : '#ddd', color: charIndex === i ? '#fff' : '#000' }}>
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                <h1 className={styles.hanzi} style={{ fontSize: '4rem', marginBottom: '10px' }}>{currentCard.character}</h1>

                <div className={styles.revealedContent}>
                  <p className={styles.pinyin}>{currentCard.pinyin}</p>
                  <h3 className={styles.english}>{currentCard.meaning}</h3>
                  <h4 style={{ color: '#ff69b4', fontWeight: 'bold' }}>🇲🇾 {currentCard.meaning_ms}</h4>
                  
                  <div className="flex flex-col gap-2 items-center mt-4">
                    <button className={styles.listenButton} onClick={(e) => { e.stopPropagation(); speak(currentCard.character); }}>🔊 Listen</button>
                    
                    <button className={`${styles.listenButton} ${isListening ? styles.audioPlaying : ""}`} 
                            onClick={(e) => { e.stopPropagation(); startSpeechRecognition(); }}>
                      {isListening ? "Listening..." : "🎤 Speak & Check"}
                    </button>

                    <button className={styles.practiceBtn} onClick={(e) => { e.stopPropagation(); setIsWritingMode(true); }}>✍️ Practice Writing</button>
                    
                    {score !== null && (
                      <div className={styles.scoreCircle}>
                        <b>{score}</b>
                        <small>Score</small>
                      </div>
                    )}
                    {speechResult && <p className={styles.speechResult}>You said: {speechResult}</p>}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

  {isFlipped && !isWritingMode && (
    <div className={styles.gradingContainer}>
      <button 
        className={styles.gotItBtn} 
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        style={{ opacity: currentIndex === 0 ? 0.5 : 1, cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}
      >
        ← Previous
      </button>
      <button className={styles.gotItBtn} onClick={handleNext}>
        Got it ✨
      </button>
      <button className={styles.forgotBtn} onClick={handleForgot}>
        Forgot 😵
      </button>
    </div>
  )}    </div>
  );
}