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
  } = useTyping(shuffleWord);

  return (
    <div className="app">
      <Header timer={timer} />
      <Type
        words={words}
        currentWordIndex={currentWordIndex}
        currentWordRef={currentWordRef}
        caretRef={caretRef}
        currentExtraLetter={currentExtraLetter}
        typedWords={typedWords}
        timer={timer}
      />
      <Footer />
    </div>
  );
}

export default App;
