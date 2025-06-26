import React, { useState } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  const fetchDefinition = async () => {
    setError(null);
    setDefinition(null);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Word not found or API error');
      }
      const data = await response.json();
      setDefinition(data[0]);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dictionary App</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button onClick={fetchDefinition}>Get Definition</button>

        {error && <p className="error">{error}</p>}

        {definition && (
          <div className="definition-card">
            <h2>{definition.word}</h2>
            {definition.phonetics && definition.phonetics.map((phonetic, index) => (
              <div key={index}>
                {phonetic.text && <p>{phonetic.text}</p>}
                {phonetic.audio && <audio controls src={phonetic.audio}>Your browser does not support the audio element.</audio>}
              </div>
            ))}
            {definition.meanings && definition.meanings.map((meaning, index) => (
              <div key={index}>
                <h3>{meaning.partOfSpeech}</h3>
                {meaning.definitions && meaning.definitions.map((def, idx) => (
                  <div key={idx}>
                    <p>- {def.definition}</p>
                    {def.example && <p><em>Example: {def.example}</em></p>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;