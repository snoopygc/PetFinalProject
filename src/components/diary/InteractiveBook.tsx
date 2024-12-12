'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const bookStyles = `
.book {
  perspective: 1000px;
  transition: opacity 0.4s 0.2s;
  font-size: 0.75rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.book h1 {
  font-size: 1.25rem;
}

.book h2 {
  font-size: 1rem;
}

.page {
  width: 50%;
  height: 100%;
  background-color: #FFF0DC;
  float: left;
  margin-bottom: 0.5em;
  background: left top no-repeat;
  background-size: cover;
  border: 2px solid #543A14;
  border-radius: 4px;
  overflow: hidden;
}

.page:nth-child(even) {
  clear: both;
}

.book .pages {
  width: 100%;
  height: 400px;
  position: relative;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  border-radius: 4px;
}

.book .page {
  float: none;
  clear: none;
  margin: 0;
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  transform-origin: 0 0;
  transition: transform 1.4s;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  cursor: pointer;
  user-select: none;
  background-color: #FFF0DC;
}

.book .page:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  transition: background 0.7s;
  z-index: 2;
}

.book .page:nth-child(odd) {
  pointer-events: all;
  transform: rotateY(0deg);
  right: 0;
  border-radius: 0 4px 4px 0;
  background-image: linear-gradient(to right, rgba(84,58,20,.15) 0%, rgba(84,58,20,0) 10%);
}

.book .page:nth-child(odd):hover {
  transform: rotateY(-15deg);
}

.book .page:nth-child(odd):hover:before {
  background: rgba(84,58,20, 0.03);
}

.book .page:nth-child(odd):before {
  background: rgba(84,58,20, 0);
}

.book .page:nth-child(even) {
  pointer-events: none;
  transform: rotateY(180deg);
  transform-origin: 100% 0;
  left: 0;
  border-radius: 4px 0 0 4px;
  border-color: #543A14;
  background-image: linear-gradient(to left, rgba(84,58,20,.12) 0%, rgba(84,58,20,0) 10%);
}

.book .page:nth-child(even):before {
  background: rgba(84,58,20, 0.2);
}

.book .page.grabbing {
  transition: none;
}

.book .page.flipped:nth-child(odd) {
  pointer-events: none;
  transform: rotateY(-180deg);
}

.book .page.flipped:nth-child(odd):before {
  background: rgba(84,58,20, 0.2);
}

.book .page.flipped:nth-child(even) {
  pointer-events: all;
  transform: rotateY(0deg);
}

.book .page.flipped:nth-child(even):hover {
  transform: rotateY(15deg);
}

.book .page.flipped:nth-child(even):hover:before {
  background: rgba(84,58,20, 0.03);
}

.book .page.flipped:nth-child(even):before {
  background: rgba(84,58,20, 0);
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(84,58,20, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.fullscreen .book {
  transform: scale(1.5);
}

.exit-fullscreen {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #FFF0DC;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  color: #543A14;
}
`;

interface InteractiveBookProps {
  pages: (React.ReactNode | null)[];
}

export const InteractiveBook: React.FC<InteractiveBookProps> = ({ pages = [] }) => {
  const pagesRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const pagesElement = pagesRef.current;
    if (!pagesElement) return;

    const pageElements = pagesElement.children;
    
    // Set initial z-index
    for (let i = 0; i < pageElements.length; i++) {
      const page = pageElements[i] as HTMLDivElement;
      if (i % 2 === 0) {
        page.style.zIndex = String(pageElements.length - i);
      }
    }

    // Add click event listeners
    const handlePageClick = function(this: HTMLDivElement) {
      const pageNum = Array.from(pageElements).indexOf(this) + 1;
      
      if (pageNum % 2 === 0) {
        this.classList.remove('flipped');
        (this.previousElementSibling as HTMLDivElement)?.classList.remove('flipped');
      } else {
        this.classList.add('flipped');
        (this.nextElementSibling as HTMLDivElement)?.classList.add('flipped');
      }
    };

    const pageArray = Array.from(pageElements);
    pageArray.forEach((page) => {
      page.addEventListener('click', handlePageClick);
    });

    // Cleanup event listeners
    return () => {
      pageArray.forEach((page) => {
        page.removeEventListener('click', handlePageClick);
      });
    };
  }, [pages]);

  const generatePages = () => {
    const totalPages = Math.max(32, Math.ceil(pages.length / 2) * 2);
    const pageElements = [];

    for (let i = 0; i < totalPages; i++) {
      const pageContent = pages[i] || null;
      pageElements.push(
        <div key={i} className="page">
          {pageContent}
        </div>
      );
    }

    return pageElements;
  };

  return (
    <>
      <style>{bookStyles}</style>
      <div className={isFullscreen ? 'fullscreen' : ''}>
        <div className="book">
          <div ref={pagesRef} className="pages">
            {generatePages()}
          </div>
        </div>
        {isFullscreen && (
          <button className="exit-fullscreen" onClick={() => setIsFullscreen(false)}>
            Exit Fullscreen
          </button>
        )}
      </div>
      {!isFullscreen && (
        <Button onClick={() => setIsFullscreen(true)} className="mt-4 bg-[#F0BB78] text-[#543A14] hover:bg-[#FADA7A]">
          View Fullscreen
        </Button>
      )}
    </>
  );
};

