import React, { useState } from 'react';

export default function Question({ data, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const submit = () => {
    if (selected === null) return;
    onAnswer(selected);
    setSelected(null);
  };

  return (
    <div>
      <h3>{data.text}</h3>
      {data.options.map((opt, idx) => (
        <div key={idx}>
          <label>
            <input
              type="radio"
              checked={selected === idx}
              onChange={() => setSelected(idx)}
            />
            {opt}
          </label>
        </div>
      ))}
      <button onClick={submit} disabled={selected === null}>
        Submit
      </button>
    </div>
  );
}
