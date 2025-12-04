import React, { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const operators = ["+", "-", "*", "/"];

  const handleButtonClick = (value) => {
    if (input === "" && operators.includes(value) && value !== "-") return;

    const lastChar = input[input.length - 1];
    if (operators.includes(lastChar) && operators.includes(value)) {
      setInput(input.slice(0, -1) + value);
      return;
    }

    setInput((prev) => prev + value);
  };

  const handleClear = () => setInput("");
  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));

  const handleEqual = () => {
    if (!input) return;

    if (input === "19/12/2007") {
      setInput("Happy birthday Pookie");
      return;
    }

    try {
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${input})`)();
      setInput(String(result));
    } catch {
      setInput("Error");
      setTimeout(() => setInput(""), 1000);
    }
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <>
      <div className="text-white text-sm sm:text-base text-center mt-4">
        pro tip - enter your birthdate
      </div>

      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-black text-white px-4 py-6">
        
        {/* iOS-like calculator shell with tablet scaling */}
        <div className="
          w-full 
          max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
          rounded-[2.5rem] 
          bg-black/90 border border-white/0 
          shadow-[0_20px_60px_rgba(0,0,0,0.8)] 
          flex flex-col gap-4 p-6
        ">

          {/* Display */}
          <div className="
            h-24 sm:h-28 md:h-32 
            px-4 
            flex items-end justify-end
            bg-slate-900
            rounded-2xl
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
            font-light tracking-wide overflow-x-auto
          ">
            {input || "0"}
          </div>

          {/* Top controls */}
          <div className="flex gap-3 mb-2">
            <button
              onClick={handleClear}
              className="
                flex-1 
                h-12 sm:h-14 md:h-16 
                rounded-full 
                bg-neutral-500 text-black 
                text-xs sm:text-sm md:text-lg font-semibold
                active:scale-95 active:brightness-110
                transition-transform duration-100 ease-out
              "
            >
              C
            </button>

            <button
              onClick={handleBackspace}
              className="
                flex-1 
                h-12 sm:h-14 md:h-16 
                rounded-full 
                bg-neutral-600 
                text-xs sm:text-sm md:text-lg
                active:scale-95 active:brightness-110
                transition-transform duration-100 ease-out
              "
            >
              ⌫
            </button>
          </div>

          {/* Buttons grid */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.flat().map((btn) => {
              const isOp = ["+", "-", "*", "/"].includes(btn);
              const isEqual = btn === "=";

              return (
                <button
                  key={btn}
                  onClick={() =>
                    btn === "=" ? handleEqual() : handleButtonClick(btn)
                  }
                  className={`
                    aspect-square 
                    rounded-full 
                    text-lg sm:text-xl md:text-3xl 
                    flex items-center justify-center 
                    select-none
                    active:scale-95 active:brightness-110
                    transition-transform duration-100 ease-out
                    ${
                      isEqual
                        ? "bg-orange-500 text-white font-semibold"
                        : isOp
                        ? "bg-orange-600 text-white"
                        : "bg-neutral-700 text-white"
                    }
                  `}
                >
                  {btn}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}

export default Calculator;
