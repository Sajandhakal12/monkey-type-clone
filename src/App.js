import Footer from "./components/Footer";
import Header from "./components/Header";
import Type from "./components/Type";
import useTyping from "./hooks/useTyping";

import shuffleWord from "./word";

function App() {
  const {
    words,
    timer,
    currentWordIndex,
    currentWordRef,
    caretRef,
    currentExtraLetter,
    typedWords,
    resetAll,
    result,
  } = useTyping(shuffleWord);

  return (
    <div className="app">
      <Header timer={timer} />
      {result ? (
        <div className="result">
          <h2>Your result</h2>
          <p>Speed: {result.correct * 2}wpm</p>
          <p>Correct words: {result.correct}</p>
          <p>Wrong words: {result.wrong}</p>
          <p>Correct Characters: {result.correctCharacters}</p>
          <p>Wrong Characters: {result.wrongCharacters}</p>
          <div className="restart" onClick={resetAll}>
            Restart
          </div>
        </div>
      ) : (
        <Type
          words={words}
          currentWordIndex={currentWordIndex}
          currentWordRef={currentWordRef}
          caretRef={caretRef}
          currentExtraLetter={currentExtraLetter}
          typedWords={typedWords}
          timer={timer}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
