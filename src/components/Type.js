const Type = ({
  words,
  currentWordIndex,
  currentWordRef,
  caretRef,
  currentExtraLetter,
  typedWords,
}) => {
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
