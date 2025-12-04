import React, { useState, useRef } from 'react'
import IconGrid from './components/IconGrid'
import { Calculator, Calendar, Contacts, Music, Photos, Recorder, Settings, Store, LockScreen } from './components/index.js'

function App() {
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [appGeometry, setAppGeometry] = useState(null)

  const [islocked, setisLocked] = useState(true)

  const handleIconClick = (appName, geometry) => {
    setSelectedApplication(appName)
    setAppGeometry(geometry)
  }

  const handleCloseApp = () => {
    setSelectedApplication(null)
    setAppGeometry(null)
  }

  const dynamicStyles = appGeometry ? {
    '--tw-app-top': `${appGeometry.top}px`,
    '--tw-app-left': `${appGeometry.left}px`,
    '--tw-app-width': `${appGeometry.width}px`,
    '--tw-app-height': `${appGeometry.height}px`,
  } : {};

  const isOpen = selectedApplication !== null;

  const AppComponentMap = {
    calculator: <Calculator />,
    calendar: <Calendar />,
    contacts: <Contacts />,
    music: <Music />,
    photos: <Photos />,
    recorder: <Recorder />,
    settings: <Settings />,
    store: <Store />,
  };

  const CurrentApp = selectedApplication ? AppComponentMap[selectedApplication] : null;

  const touchStartY = useRef(null)
  const touchEndY = useRef(null)
  const SWIPE_THRESHOLD = 60

  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    touchEndY.current = e.changedTouches[0].clientY

    const diff =  touchStartY.current -touchEndY.current

    if(diff > SWIPE_THRESHOLD){
      setisLocked(false)
    }
  }


  return (
    <>
    
    {islocked && 
      <div className='bg-[url(/wallpapers/lockscreen.jpg)] h-screen w-screen bg-center relative overflow-hidden ' onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} >
        <LockScreen/>
      </div>}

    {!islocked &&
      <div className='bg-[url(/wallpapers/mcWallpaper.jpg)] h-screen w-screen bg-cover relative overflow-hidden'>
      {!isOpen && <IconGrid onIconClick={handleIconClick} />}

      <div
        className={`
          fixed z-50 transition-all duration-500 ease-in-out origin-top-left
          ${isOpen
            ? 'top-0 left-0 w-screen h-screen opacity-100 scale-100 rounded-none'
            : 'top-[var(--tw-app-top)] left-[var(--tw-app-left)] w-[var(--tw-app-width)] h-[var(--tw-app-height)] opacity-0 scale-50 rounded-lg pointer-events-none'
          }
          `}
          style={dynamicStyles}
          >
        {isOpen && (
          <div className="bg-white dark:bg-gray-900 w-full h-full relative overflow-hidden shadow-2xl">
            <button
              onClick={handleCloseApp}
              className='absolute z-10 top-4 right-4 w-8 h-8 bg-black text-white flex items-center justify-center font-semibold rounded-lg shadow-md transition-opacity hover:opacity-75'
              aria-label="Close application"
              >
              X
            </button>
            <div className="pt-16 p-4 h-full w-full">
              {CurrentApp}
            </div>
          </div>
        )}
      </div>
    </div>
}


    </>
  )
}
      export default App
