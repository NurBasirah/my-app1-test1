"use client";

import React, { useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';

interface Props {
  character: string;
}

export default function HanziPractice({ character }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear previous character if it exists
      containerRef.current.innerHTML = '';

      writerRef.current = HanziWriter.create(containerRef.current, character, {
        width: 300,
        height: 300,
        showCharacter: false, // Hide the character so user has to draw it
        padding: 5,
        strokeColor: '#ef4444', // Red strokes
        radicalColor: '#2563eb', // Blue for radicals
      });

      // Start the quiz mode automatically
      writerRef.current.quiz();
    }
  }, [character]);

  const handleHint = () => {
    writerRef.current?.animateCharacter();
  };

  const handleReset = () => {
    writerRef.current?.quiz();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-3xl shadow-inner">
      <div 
        ref={containerRef} 
        className="border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50"
      />
      
      <div className="flex gap-2">
        <button 
          onClick={handleHint}
          className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-sm font-medium"
        >
          💡 Show Hint
        </button>
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-sm font-medium"
        >
          🔄 Reset
        </button>
      </div>
      <p className="text-xs text-zinc-400">Draw the character stroke by stroke!</p>
    </div>
  );
}