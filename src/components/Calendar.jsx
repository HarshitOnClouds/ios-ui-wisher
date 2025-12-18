import React, { useState } from 'react'

function Calendar() {
  const [emojis, setEmojis] = useState([])

  const birthdayEmojis = ['🎉', '🎂', '🎈', '✨', '🥳']

  const handleClick = () => {
    const newEmojis = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      emoji: birthdayEmojis[Math.floor(Math.random() * birthdayEmojis.length)],
      left: Math.random() * 100,
      duration: 2 + Math.random() * 2,
    }))

    setEmojis(prev => [...prev, ...newEmojis])

    setTimeout(() => {
      setEmojis(prev => prev.slice(newEmojis.length))
    }, 4000)
  }

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black text-white px-4 py-6 overflow-hidden">

      {/* CSS only for this file */}
      <style>{`
        @keyframes fall {
          from {
            transform: translateY(-20px);
            opacity: 1;
          }
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .fall {
          position: absolute;
          top: 0;
          font-size: 2rem;
          animation-name: fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          pointer-events: none;
        }
      `}</style>

      {/* Falling emojis */}
      {emojis.map(e => (
        <span
          key={e.id}
          className="fall"
          style={{
            left: `${e.left}%`,
            animationDuration: `${e.duration}s`,
          }}
        >
          {e.emoji}
        </span>
      ))}

      {/* Date card */}
      <div
        onClick={handleClick}
        className="cursor-pointer bg-white h-32 w-32 flex flex-col items-center justify-center rounded-2xl active:scale-95 transition"
      >
        <p className="text-red-600 font-serif text-4xl">19</p>
        <p className="text-red-600 font-serif text-xl">December</p>
      </div>

      <div className="text-center h-20 flex flex-col items-center justify-center mt-4">
        <p>kya kregi calendar dekh ke</p>
        <p>only today's date matters, because its your birthday</p>
        <p>tap the date card for confetti hehe</p>
      </div>
    </div>
  )
}

export default Calendar
