import { useState } from 'react';
import { QuizzicalEntry } from './components/QuizzicalEntry';
import './App.css';
import QuizzMain from './components/QuizzMain';

function App() {
  const [showMain, setShowMain] = useState(false)

  const handleStartClick = () => {
    setShowMain(true)
  };

  return (
    <>
      {!showMain && <QuizzicalEntry onStartClick={handleStartClick} />} {/* Mostrar QuizzicalEntry si showMain es falso */}
      {showMain && <QuizzMain />} {/* Mostrar QuizzMain si showMain es verdadero */}
    </>
  );
}

export default App;