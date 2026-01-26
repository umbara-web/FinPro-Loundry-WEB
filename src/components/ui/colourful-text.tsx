'use client';
import React from 'react';
import { motion } from 'framer-motion';

export function ColourfulText({ text }: { text: string }) {
  const colors = [
    'rgb(255, 99, 71)', // Tomato
    'rgb(65, 105, 225)', // RoyalBlue
    'rgb(50, 205, 50)', // LimeGreen
    'rgb(255, 69, 0)', // OrangeRed
    'rgb(147, 112, 219)', // MediumPurple
    'rgb(255, 215, 0)', // Gold
    'rgb(0, 191, 255)', // DeepSkyBlue
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const shuffle = (array: string[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const interval = setInterval(() => {
      setCurrentColors((prev) => shuffle([...prev]));
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-row items-center'>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{
            y: 0,
          }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.05, 1],
            filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
          className='inline-block font-sans tracking-tight whitespace-pre'
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
