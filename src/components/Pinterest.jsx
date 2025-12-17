import React from 'react'
import Infinitegallery from './infinitegallery/Inifinitegallery'

function Pinterest() {
  const items = [
    {
      image: './gallery/1.jpg',
    },
    {
      image: './gallery/2.jpg',
    },
    {
      image: './gallery/3.jpg',
    },
    {
      image: './gallery/4.jpg',
    },
    {
      image: './gallery/5.jpg',
    },
    {
      image: './gallery/6.jpg',
    },
    {
      image: './gallery/7.jpg',
    },
    {
      image: './gallery/8.jpg',
    },
    {
      image: './gallery/9.jpg',
    },
    {
      image: './gallery/10.jpg',
    },
    {
      image: './gallery/11.jpg',
    },
    {
      image: './gallery/12.jpg',
    },
    {
      image: './gallery/13.jpg',
    },
    {
      image: './gallery/14.jpg',
    },
    {
      image: './gallery/15.jpg',
    },
    {
      image: './gallery/16.jpg',
    },
    {
      image: './gallery/17.jpg',
    },
    {
      image: './gallery/18.jpg',
    },
    {
      image: './gallery/19.jpg',
    },
    {
      image: './gallery/20.jpg',
    },
    {
      image: './gallery/21.jpg',
    },
    {
      image: './gallery/22.jpg',
    },
    {
      image: './gallery/23.jpg',
    },

  ];

  return (
    <div className='absolute inset-0 -m-4 -mt-16 w-screen h-screen bg-black flex flex-col overflow-hidden'>
      <div className='flex-1 w-full h-full relative'>
        <Infinitegallery items={items} />
      </div>
      <div className='absolute bottom-4 left-0 right-0 text-white text-center text-sm opacity-70 pointer-events-none z-10'>
        tap and hold
      </div>
    </div>
  )
}

export default Pinterest
