import React from 'react'

export default function Counter({label, value, setValue, minValue, maxValue}) {
    function increment() {
        setValue(prevValue => Number(prevValue) + 1)
    }
    function decrement() {
      setValue((prevValue) => Number(prevValue) - 1);
    }
  return (
    <div className="counter text-center">
      <label className="text-md">{label}</label>
      <div className="counter-input">
        <button
          disabled={value <= minValue}
          onClick={decrement}
          type="button"
          className="counter-btn btn"
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
        <span className='counter-value'>
          {value}
        </span>
        <button
          disabled={value >= maxValue}
          onClick={increment}
          type="button"
          className="counter-btn btn"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}
