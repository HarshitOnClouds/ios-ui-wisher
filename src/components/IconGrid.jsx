import React, { useState } from 'react'

const icons = [
    { name: 'calculator', src: '/icons/calculator.png' },
    { name: 'calendar', src: '/icons/calendar.png' },
    { name: 'contacts', src: '/icons/contacts.png' },
    { name: 'music', src: '/icons/music.png' },
    { name: 'pinterest', src: '/icons/pinterest.png' },
    {name: 'notes', src: '/icons/notes.png'},
    {name: 'biryani', src: '/icons/biryani.png'},
    {name: 'harrypotter', src: '/icons/harrypotter.png'}
]

function IconGrid({ onIconClick, currentSelectedApplication }) {

    const handleIconClick = (appName) => {
        onIconClick(appName)
    }

    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            {icons.map((icon) => (
                <div key={icon.name} className='flex flex-col items-center'>
                    <div>
                    <img src={icon.src} alt={icon.name} className='w-16 h-16 mb-2' onClick={() => handleIconClick(icon.name)} />
                    <p className='text-center '>{icon.name}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default IconGrid
