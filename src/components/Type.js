import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import words from "../word";

const Type = () => {
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const currentWordRef = useRef(null);
  const caretRef = useRef(null);

  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.key.length === 1 || e.key === "Backspace" || e.key === "Tab") {
        const currentWord = currentWordRef.current?.innerText
          ?.replace(/[\n\r]+|[\s]{2,}/g, "")
          .replace("|", "");

        const currentWordLength = currentWord.length;
        const width = 100 / currentWordLength;
        console.log(currentWordRef.current.clientWidth, width);
        // recordTest(e.key, e.ctrlKey);
        if (e.key === currentWord[typedWord.length]) {
          caretRef.current.style.left = `calc(${
            (typedWord.length + 1) * width
          }% - 8px)`;
          setTypedWord(typedWord + e.key);
        } else if (e.key === " " && typedWord.length >= 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setTypedWord("");
        }
        e.preventDefault();
      }
    };
    return () => {
      window.onkeydown = null;
    };
  }, [currentWordIndex, typedWord]);

  return (
    <div className="content">
      {words.map((word, idx) => (
        <>
          <span
            ref={idx === currentWordIndex ? currentWordRef : null}
            key={idx}
            className="word"
          >
            {word?.split("")?.map((letter, lIdx) => (
              <>
                {idx === currentWordIndex && lIdx === 0 && (
                  <span
                    className="caret"
                    ref={caretRef}
                    style={{ left: "-8px" }}
                  >
                    {"|"}
                  </span>
                )}
                <span key={lIdx} className="letter">
                  {letter}
                </span>
              </>
            ))}
          </span>
        </>
      ))}
    </div>
  );
};

export default Type;
