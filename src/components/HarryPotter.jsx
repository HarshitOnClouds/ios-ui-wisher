import React, { useState, useEffect, useRef } from 'react';
import { Zap, Heart, Trophy, X } from 'lucide-react';

const spellPatterns = [
  { id: 1, pattern: ['↑', '↓'], name: 'Expelliarmus', color: 'from-red-500 to-pink-500', damage: 15 },
  { id: 2, pattern: ['←', '→'], name: 'Stupefy', color: 'from-purple-500 to-indigo-500', damage: 20 },
  { id: 3, pattern: ['↑', '↑'], name: 'Protego', color: 'from-blue-500 to-cyan-500', heal: 10 },
  { id: 4, pattern: ['↓', '↓'], name: 'Incendio', color: 'from-orange-500 to-red-500', damage: 25 },
  { id: 5, pattern: ['←', '↑'], name: 'Bombarda', color: 'from-yellow-500 to-orange-500', damage: 30 },
  { id: 6, pattern: ['→', '↓'], name: 'Petrificus', color: 'from-green-500 to-teal-500', damage: 22 },
  { id: 7, pattern: ['↑', '→', '↓'], name: 'Sectumsempra', color: 'from-red-600 to-purple-600', damage: 40 },
  { id: 8, pattern: ['←', '↓', '→'], name: 'Crucio', color: 'from-gray-700 to-red-700', damage: 35 }
];

const directions = ['↑', '↓', '←', '→'];

const enemies = [
  { name: 'Dark Wizard', emoji: '🧙‍♂️', hp: 80, speed: 2500, damage: 12 },
  { name: 'Death Eater', emoji: '💀', hp: 100, speed: 2200, damage: 15 },
  { name: 'Dementor', emoji: '👻', hp: 120, speed: 2000, damage: 18 },
  { name: 'Basilisk', emoji: '🐍', hp: 150, speed: 1800, damage: 22 },
  { name: 'Voldemort', emoji: '🐉', hp: 200, speed: 1500, damage: 25 }
];

export default function HarryPotter() {
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(80);
  const [currentEnemy, setCurrentEnemy] = useState(enemies[0]);
  const [enemyLevel, setEnemyLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentInput, setCurrentInput] = useState([]);
  const [availableSpells, setAvailableSpells] = useState([]);
  const [showSpellCast, setShowSpellCast] = useState(null);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [playerHit, setPlayerHit] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);
  const [message, setMessage] = useState('');
  const [difficulty, setDifficulty] = useState('normal');
  const [reactionTime, setReactionTime] = useState(null);
  const inputStartTime = useRef(null);
  const enemyTimer = useRef(null);
  const isProcessingAttack = useRef(false);

  useEffect(() => {
    if (gameActive && !gameOver) {
      startEnemyAttackCycle();
    }
    return () => {
      if (enemyTimer.current) clearTimeout(enemyTimer.current);
    };
  }, [gameActive, gameOver, currentEnemy]);

  useEffect(() => {
    if (gameActive) {
      const unlocked = difficulty === 'easy' ? spellPatterns.slice(0, 4) : 
                       difficulty === 'normal' ? spellPatterns.slice(0, 6) : 
                       spellPatterns;
      setAvailableSpells(unlocked);
    }
  }, [difficulty, gameActive]);

  const startGame = (diff) => {
    setDifficulty(diff);
    setGameActive(true);
    setGameOver(false);
    setPlayerHP(100);
    setEnemyHP(enemies[0].hp);
    setCurrentEnemy(enemies[0]);
    setEnemyLevel(0);
    setScore(0);
    setCombo(0);
    setCurrentInput([]);
    setMessage('Cast spells by pressing arrow keys!');
    isProcessingAttack.current = false;
  };

  const startEnemyAttackCycle = () => {
    if (enemyTimer.current) clearTimeout(enemyTimer.current);
    const attackSpeed = currentEnemy.speed * (difficulty === 'easy' ? 1.3 : difficulty === 'hard' ? 0.7 : 1);
    enemyTimer.current = setTimeout(() => {
      if (gameActive && !gameOver && !isProcessingAttack.current) {
        performEnemyAttack();
      }
    }, attackSpeed);
  };

  const performEnemyAttack = () => {
    if (isProcessingAttack.current) return;
    isProcessingAttack.current = true;
    
    setEnemyAttacking(true);
    
    setTimeout(() => {
      setPlayerHP(prevHP => {
        const varianceMin = Math.floor(currentEnemy.damage * 0.8);
        const varianceMax = Math.floor(currentEnemy.damage * 1.2);
        const damage = Math.floor(Math.random() * (varianceMax - varianceMin + 1)) + varianceMin;
        const newHP = Math.max(0, prevHP - damage);
        
        setMessage(`${currentEnemy.name} attacks! -${damage} HP`);
        setPlayerHit(true);
        
        setTimeout(() => setPlayerHit(false), 400);
        
        if (newHP === 0) {
          setTimeout(() => endGame(false), 500);
        } else {
          setTimeout(() => {
            isProcessingAttack.current = false;
            if (gameActive && !gameOver) {
              startEnemyAttackCycle();
            }
          }, 500);
        }
        
        return newHP;
      });
      
      setEnemyAttacking(false);
    }, 300);
  };

  const handleKeyPress = (direction) => {
    if (!gameActive || gameOver) return;

    if (currentInput.length === 0) {
      inputStartTime.current = Date.now();
    }

    const newInput = [...currentInput, direction];
    setCurrentInput(newInput);

    const matchedSpell = availableSpells.find(spell => {
      if (spell.pattern.length !== newInput.length) return false;
      return spell.pattern.every((dir, idx) => dir === newInput[idx]);
    });

    if (matchedSpell) {
      castSpell(matchedSpell);
    } else {
      const possibleSpells = availableSpells.filter(spell => 
        spell.pattern.slice(0, newInput.length).every((dir, idx) => dir === newInput[idx])
      );

      if (possibleSpells.length === 0) {
        setMessage('Wrong pattern! Try again!');
        setCurrentInput([]);
        setCombo(0);
        inputStartTime.current = null;
      }
    }
  };

  const castSpell = (spell) => {
    const timeTaken = Date.now() - inputStartTime.current;
    const speedBonus = timeTaken < 500 ? 1.5 : timeTaken < 1000 ? 1.2 : 1;
    
    setShowSpellCast(spell);
    setCurrentInput([]);
    inputStartTime.current = null;

    setTimeout(() => {
      if (spell.heal) {
        setPlayerHP(prevHP => {
          const healAmount = Math.floor(spell.heal * speedBonus);
          const newHP = Math.min(100, prevHP + healAmount);
          setMessage(`${spell.name}! +${healAmount} HP`);
          setReactionTime(timeTaken);
          return newHP;
        });
      } else {
        setEnemyHit(true);
        setTimeout(() => setEnemyHit(false), 400);
        
        setEnemyHP(prevEnemyHP => {
          const totalDamage = Math.floor(spell.damage * speedBonus * (1 + combo * 0.1));
          const newEnemyHP = Math.max(0, prevEnemyHP - totalDamage);
          
          setCombo(combo + 1);
          setScore(prevScore => prevScore + totalDamage + Math.floor(combo * 5));
          setMessage(`${spell.name}! -${totalDamage} HP ${speedBonus > 1 ? '⚡ FAST!' : ''}`);
          setReactionTime(timeTaken);

          if (newEnemyHP === 0) {
            setTimeout(() => defeatEnemy(), 500);
          }
          
          return newEnemyHP;
        });
      }
    }, 200);

    setTimeout(() => {
      setShowSpellCast(null);
      setReactionTime(null);
    }, 1200);
  };

  const defeatEnemy = () => {
    if (enemyTimer.current) clearTimeout(enemyTimer.current);
    isProcessingAttack.current = false;
    
    const nextLevel = enemyLevel + 1;
    if (nextLevel >= enemies.length) {
      endGame(true);
    } else {
      setTimeout(() => {
        const nextEnemy = enemies[nextLevel];
        setCurrentEnemy(nextEnemy);
        setEnemyHP(nextEnemy.hp);
        setEnemyLevel(nextLevel);
        setMessage(`${nextEnemy.name} appears!`);
        setCombo(0);
      }, 1500);
    }
  };

  const endGame = (victory) => {
    setGameOver(true);
    setGameActive(false);
    if (enemyTimer.current) clearTimeout(enemyTimer.current);
    isProcessingAttack.current = false;
    setMessage(victory ? '🎉 Victory! You defeated all enemies!' : '💀 Defeated! Try again!');
  };

  const exitGame = () => {
    if (enemyTimer.current) clearTimeout(enemyTimer.current);
    isProcessingAttack.current = false;
    setGameActive(false);
    setGameOver(false);
    setCurrentInput([]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive || gameOver) return;
      
      const keyMap = {
        'ArrowUp': '↑',
        'ArrowDown': '↓',
        'ArrowLeft': '←',
        'ArrowRight': '→',
        'w': '↑',
        'W': '↑',
        's': '↓',
        'S': '↓',
        'a': '←',
        'A': '←',
        'd': '→',
        'D': '→'
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        handleKeyPress(keyMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, gameOver, currentInput, availableSpells, combo]);

  return (
    <div className="absolute inset-0 -m-4 -mt-16 w-screen h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-start justify-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-3xl bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 border-2 border-purple-400 shadow-2xl my-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex-1"></div>
          <div className="text-center flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-300 mb-1 font-serif">
              Wand Dueling
            </h1>
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400 mx-auto animate-pulse" />
          </div>
          <div className="flex-1 flex justify-end gap-2">
            {gameActive && (
              <button
                onClick={exitGame}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        {gameActive && (
          <div className="grid grid-cols-4 gap-1 sm:gap-2 mb-2 sm:mb-4">
            <div className="bg-yellow-900 bg-opacity-60 rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-center">
              <div className="text-yellow-300 text-[10px] sm:text-xs">Score</div>
              <div className="text-white font-bold text-sm sm:text-lg">{score}</div>
            </div>
            <div className="bg-orange-900 bg-opacity-60 rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-center">
              <div className="text-orange-300 text-[10px] sm:text-xs">Combo</div>
              <div className="text-white font-bold text-sm sm:text-lg">{combo}x</div>
            </div>
            <div className="bg-purple-900 bg-opacity-60 rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-center">
              <div className="text-purple-300 text-[10px] sm:text-xs">Enemy</div>
              <div className="text-white font-bold text-xs sm:text-sm">{enemyLevel + 1}/5</div>
            </div>
            <div className="bg-blue-900 bg-opacity-60 rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-center">
              <div className="text-blue-300 text-[10px] sm:text-xs">Speed</div>
              <div className="text-white font-bold text-xs sm:text-sm">
                {reactionTime ? `${reactionTime}ms` : '-'}
              </div>
            </div>
          </div>
        )}

        {/* Battle Arena */}
        {gameActive && (
          <div className="space-y-2 sm:space-y-4 mb-2 sm:mb-4">
            {/* Enemy */}
            <div className={`bg-gradient-to-br from-red-900 to-red-700 rounded-xl sm:rounded-2xl p-2 sm:p-4 text-center border-2 border-red-500 transition-all duration-300 ${
              enemyAttacking ? 'scale-110 shadow-2xl brightness-125' : ''
            } ${
              enemyHit ? 'animate-shake brightness-50' : ''
            }`}>
              <div className="text-4xl sm:text-5xl md:text-7xl mb-1 sm:mb-2">{currentEnemy.emoji}</div>
              <h3 className="text-white font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">{currentEnemy.name}</h3>
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-300 flex-shrink-0" />
                <div className="w-24 sm:w-36 md:w-48 h-3 sm:h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${(enemyHP / currentEnemy.hp) * 100}%` }}
                  />
                </div>
                <span className="text-white font-bold text-xs sm:text-sm">{enemyHP}/{currentEnemy.hp}</span>
              </div>
            </div>

            {/* Spell Cast Animation */}
            {showSpellCast && (
              <div className={`bg-gradient-to-br ${showSpellCast.color} rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center border-2 border-white shadow-2xl transform scale-105`}>
                <div className="text-2xl sm:text-4xl mb-1 sm:mb-2 animate-bounce">✨</div>
                <p className="text-white font-bold text-lg sm:text-2xl">{showSpellCast.name}!</p>
                {reactionTime && reactionTime < 500 && (
                  <p className="text-yellow-300 text-xs sm:text-sm mt-1 sm:mt-2 animate-pulse">⚡ LIGHTNING FAST!</p>
                )}
              </div>
            )}

            {/* Player */}
            <div className={`bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl sm:rounded-2xl p-2 sm:p-4 text-center border-2 border-blue-500 transition-all duration-300 ${
              playerHit ? 'animate-shake brightness-50 scale-95' : ''
            }`}>
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
                <div className="w-24 sm:w-36 md:w-48 h-3 sm:h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${playerHP}%` }}
                  />
                </div>
                <span className="text-white font-bold text-xs sm:text-sm">{playerHP}/100</span>
              </div>
              <div className="text-3xl sm:text-4xl md:text-6xl mb-1 sm:mb-2">🧙‍♂️</div>
              <h3 className="text-white font-bold text-sm sm:text-lg">You</h3>
            </div>
          </div>
        )}

        {/* Current Input */}
        {gameActive && (
          <div className="bg-purple-900 bg-opacity-50 rounded-lg sm:rounded-xl p-2 sm:p-4 mb-2 sm:mb-4 min-h-14 sm:min-h-20">
            <p className="text-purple-300 text-xs sm:text-sm text-center mb-1 sm:mb-2">Current Pattern:</p>
            <div className="flex justify-center gap-1 sm:gap-2">
              {currentInput.length > 0 ? (
                currentInput.map((dir, idx) => (
                  <div key={idx} className="text-2xl sm:text-4xl text-yellow-300 animate-pulse">
                    {dir}
                  </div>
                ))
              ) : (
                <span className="text-gray-400 text-xs sm:text-sm">Press arrow keys or WASD...</span>
              )}
            </div>
          </div>
        )}

        {/* Spell Book */}
        {gameActive && (
          <div className="bg-amber-900 bg-opacity-40 rounded-lg sm:rounded-xl p-2 sm:p-4 mb-2 sm:mb-4">
            <h3 className="text-amber-300 text-xs sm:text-sm font-bold text-center mb-2 sm:mb-3">Spell Book:</h3>
            <div className="grid grid-cols-4 gap-1 sm:gap-2">
              {availableSpells.map(spell => (
                <div 
                  key={spell.id}
                  className={`bg-gradient-to-br ${spell.color} rounded-md sm:rounded-lg p-1 sm:p-2 text-center`}
                >
                  <div className="text-[8px] sm:text-xs text-white font-bold mb-0.5 sm:mb-1 truncate">{spell.name}</div>
                  <div className="text-sm sm:text-xl md:text-2xl text-white mb-0.5 sm:mb-1">
                    {spell.pattern.join(' ')}
                  </div>
                  <div className="text-[8px] sm:text-xs text-white opacity-75">
                    {spell.heal ? `+${spell.heal}` : `-${spell.damage}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Touch Controls */}
        {gameActive && (
          <div className="grid grid-cols-4 gap-1 sm:gap-2 mb-2 sm:mb-4">
            {directions.map(dir => (
              <button
                key={dir}
                onClick={() => handleKeyPress(dir)}
                className="bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg sm:rounded-xl p-2 sm:p-4 text-xl sm:text-2xl md:text-3xl font-bold transition-all transform active:scale-95 shadow-lg touch-manipulation"
              >
                {dir}
              </button>
            ))}
          </div>
        )}

        {/* Message */}
        {message && (
          <div className="bg-yellow-900 bg-opacity-50 rounded-lg sm:rounded-xl p-2 sm:p-3 mb-2 sm:mb-4 text-center border border-yellow-600">
            <p className="text-yellow-100 font-semibold text-xs sm:text-sm">{message}</p>
          </div>
        )}

        {/* Start Menu */}
        {!gameActive && !gameOver && (
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={() => startGame('easy')}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg sm:rounded-xl p-3 sm:p-4 font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
            >
              🌱 Easy Mode
              <div className="text-[10px] sm:text-xs opacity-75 mt-1">4 spells • Slower enemies</div>
            </button>
            <button
              onClick={() => startGame('normal')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl p-3 sm:p-4 font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
            >
              ⚡ Normal Mode
              <div className="text-[10px] sm:text-xs opacity-75 mt-1">6 spells • Balanced pace</div>
            </button>
            <button
              onClick={() => startGame('hard')}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl p-3 sm:p-4 font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
            >
              🔥 Hard Mode
              <div className="text-[10px] sm:text-xs opacity-75 mt-1">8 spells • Fast enemies</div>
            </button>
          </div>
        )}

        {/* Game Over */}
        {gameOver && (
          <div className="space-y-2 sm:space-y-4">
            <div className={`rounded-lg sm:rounded-xl p-4 sm:p-6 text-center border-2 ${
              message.includes('Victory') 
                ? 'bg-green-900 bg-opacity-50 border-green-500' 
                : 'bg-red-900 bg-opacity-50 border-red-500'
            }`}>
              <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">{message.includes('Victory') ? '🏆' : '💀'}</div>
              <p className="text-white font-bold text-lg sm:text-2xl mb-1 sm:mb-2">{message}</p>
              <p className="text-white text-base sm:text-lg">Final Score: {score}</p>
              <p className="text-white text-xs sm:text-sm">Max Combo: {combo}x</p>
            </div>
            <button
              onClick={() => startGame(difficulty)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg sm:rounded-xl p-3 sm:p-4 font-bold text-base sm:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              ⚔️ Duel Again
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-2 sm:mt-4 text-center text-gray-400 text-[10px] sm:text-xs">
          {gameActive ? 'Use arrow keys or WASD to cast spells • Faster = More damage!' : 'Memorize spell patterns and cast them quickly to defeat enemies!'}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}