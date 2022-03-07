import React, { useRef, useState, useLayoutEffect } from "react";
import words from "../word";

const Type = () => {
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [currentExtraLetter, setCurrentExtraLetter] = useState("");
  const currentWordRef = useRef(null);
  const caretRef = useRef(null);

  useLayoutEffect(() => {
    window.onkeydown = (e) => {
      console.log(e.key);
      if (e.key.length === 1 || e.key === "Backspace") {
        const totalLength = currentWordRef.current?.innerText
          ?.replace(/[\n\r]+|[\s]{2,}/g, "")
          .replace("|", "")?.length;
        const currentWord = words[currentWordIndex];

        currentWordRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        const currentWordLength = currentWord?.length;

        const width = 100 / (totalLength || 1);

        if (currentWord)
          if (e.key === currentWord[typedWord.length]) {
            caretRef.current.style.left = `calc(${
              (typedWord.length + 1) * width
            }% - 8px)`;
            setTypedWord(typedWord + e.key);
            currentWordRef.current.children[typedWord.length + 1].classList.add(
              "correct"
            );
          } else if (e.key === " " && typedWord.length >= 1) {
            setTypedWords([...typedWords, typedWord]);
            setCurrentWordIndex(currentWordIndex + 1);
            setTypedWord("");
            setCurrentExtraLetter("");
          } else if (e.key === "Backspace") {
            console.log(currentWordRef.current.children, typedWord);
            currentWordRef.current.children[typedWord.length].classList.remove(
              "correct",
              "incorrect"
            );
            caretRef.current.style.left = `calc(${Math.max(
              (currentExtraLetter.length > 0
                ? typedWord.length
                : typedWord.length - 1) * width,
              0
            )}% - 8px)`;
            setTypedWord(typedWord.slice(0, typedWord.length - 1));
            if (currentExtraLetter.length > 0) {
              setCurrentExtraLetter(
                currentExtraLetter.slice(0, currentExtraLetter.length - 1)
              );
            }
          } else if (e.key) {
            if (currentWordLength > typedWord.length) {
              currentWordRef.current.children[
                typedWord.length + 1
              ].classList.add("incorrect");
              caretRef.current.style.left = `calc(${
                (typedWord.length + 1) * width
              }% - 8px)`;
              setTypedWord(typedWord + e.key);
            } else {
              caretRef.current.style.left = `calc(${
                typedWord.length * width
              }% - 8px)`;
              setTypedWord(typedWord + e.key);
              setCurrentExtraLetter(currentExtraLetter + e.key);
            }
          }
      }
      e.preventDefault();
    };
    return () => {
      window.onkeydown = null;
    };
  }, [currentExtraLetter, currentWordIndex, typedWord, typedWords]);

  return (
    <div className="content">
      <div className="typing-field">
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
              {idx === currentWordIndex && currentExtraLetter
                ? currentExtraLetter.split("")?.map((letter, lIdx) => (
                    <span
                      key={lIdx + letter}
                      className="letter incorrect extra"
                    >
                      {letter}
                    </span>
                  ))
                : typedWords[idx]
                    ?.substring(word.length)
                    .split("")
                    ?.map((letter, lIdx) => (
                      <span
                        key={lIdx + letter}
                        className="letter incorrect extra"
                      >
                        {letter}
                      </span>
                    ))}
            </span>
          </>
        ))}
      </div>
    </div>
  );
};

export default Type;
