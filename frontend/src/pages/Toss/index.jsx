import React, { useState } from 'react'

export default function Toss() {
    const [result, setResult] = useState("head")
    const [isSpinning, setIsSpinning] = useState(false)

    function tossCoin() {
        setResult("")
        setIsSpinning(true)

        setTimeout(() => {
            const tossResult = Math.random() < 0.5 ? "heads" : "tails"
            setResult(tossResult)
            setIsSpinning(false)
        }, 3000)
    }
  return (
    <div className='container-sm'>
      <div className="toss-container">
        <div className={`coin ${isSpinning ? "spinning" : result}`}>
            <div className="face heads">Heads</div>
            <div className="face tails">Tails</div>
        </div>
        <button disabled={isSpinning} className='btn text-md-bold' onClick={tossCoin}>
            Toss Coin
        </button>
      </div>
    </div>
  )
}
