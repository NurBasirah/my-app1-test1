"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

const STICKER_BUNDLE = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueHdwZzZ0eHdwZzZ0eHdwZzZ0eHdwZzZ0eHdwZzZ0eHdwZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3o7TKVUn7iM8FMEU24/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmpqMzQyOWo2NTZ0bzF0em9ubzF4NTVicTRscjE0czhwOGlldnEyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ONyTeYeH696IpVL95D/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXVwbmlqNXdueHoybzRicDF0Y293bGE4aXh3a24zZDl5Y202d3BybyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zhL1ju4S5mKcEBmSD7/giphy.gif",
];

export default function Celebration({ 
  currentLesson, 
  words,           // <-- array of { character, pinyin, meaning }
  onNextLesson, 
  onBackToMenu,
  onReviewForgotten,   // add this
  forgottenCount       // add this
}) {
  const [showList, setShowList] = useState(false);
  const randomSticker = STICKER_BUNDLE[Math.floor(Math.random() * STICKER_BUNDLE.length)];

  return (
    <div className={styles.container}>
      <div className={styles.celebrationCard}>
        <h2 className={styles.title}>Great Job!</h2>
        <p>You finished Lesson {currentLesson}!</p>
        
        <img 
          src={randomSticker} 
          alt="Reward Sticker" 
          style={{ width: '180px', height: '180px', objectFit: 'contain', marginBottom: '20px' }}
        />

        <button 
          onClick={() => setShowList(!showList)}
          className={styles.practiceBtn}
          style={{ backgroundColor: '#f3f4f6', color: '#000', width: '250px', marginBottom: '15px' }}        >
          {showList ? "Hide Word List ↑" : "Review Word List ↓"}
        </button>

        {showList && (
          <div style={{ 
            width: '100%', 
            maxWidth: '500px', 
            background: 'white', 
            borderRadius: '15px', 
            padding: '15px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            maxHeight: '300px',
            overflowY: 'auto',
            marginBottom: '15px'
          }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '8px' }}>Hanzi</th>
                  <th style={{ padding: '8px' }}>Pinyin</th>
                  <th style={{ padding: '8px' }}>English</th>
                  <th style={{ padding: '8px' }}>Malay</th>

                </tr>
              </thead>
              <tbody>
                {words.map((word, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #fafafa' }}>
                    <td style={{ padding: '8px', fontSize: '1.2rem' }}>{word.character}</td>
                    <td style={{ padding: '8px', color: '#666' }}>{word.pinyin}</td>
                    <td style={{ padding: '8px' }}>{word.meaning}</td>
                    <td style={{ padding: '8px' }}>{word.meaning_ms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <button 
          className={styles.gotItBtn} 
          onClick={onNextLesson}
          style={{ marginTop: showList ? '0' : '15px' }}  // adjust if table is hidden
        >
          Next Lesson 🚀
        </button>
        
        <button 
          className={styles.backBtn} 
          style={{ position: 'static', marginTop: '15px' }} 
          onClick={onBackToMenu}
        >
          Back to Menu
        </button>
        <button 
          className={styles.practiceBtn}
          onClick={onReviewForgotten}
          style={{ backgroundColor: '#ff6b6b', color: 'white', marginBottom: '10px' }}
        >
          Review Forgotten Words ({forgottenCount})
        </button>
      </div>
    </div>
  );
}