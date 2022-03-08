import Footer from "./components/Footer";
import Header from "./components/Header";
import Type from "./components/Type";
import useTyping from "./hooks/useTyping";

import words from "./word";

function App() {
  const {
    currentWordIndex,
    currentWordRef,
    caretRef,
    currentExtraLetter,
    typedWords,
  } = useTyping(words);

  return (
    <div className="app">
      <Header />
      <Type
        words={words}
        currentWordIndex={currentWordIndex}
        currentWordRef={currentWordRef}
        caretRef={caretRef}
        currentExtraLetter={currentExtraLetter}
        typedWords={typedWords}
      />
      <Footer />
    </div>
  );
}

export default App;
