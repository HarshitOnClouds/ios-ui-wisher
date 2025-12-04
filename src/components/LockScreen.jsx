import React, { useState, useEffect } from 'react';
import { Wifi, BatteryCharging, Lock, Flashlight, Camera } from 'lucide-react'; // Using Lucide icons for clean iOS feel

// Mock Notification Data
const mockNotifications = [
  {
    id: 1,
    icon: '💬',
    title: 'Messages',
    text: 'John Doe: Hey, are you there? Call me!',
    time: '2 min ago'
  },
  {
    id: 2,
    icon: '🗓️',
    title: 'Calendar',
    text: 'Reminder: Web Dev Stand-up meeting in 10 minutes.',
    time: 'Just now'
  },
  {
    id: 3,
    icon: '📧',
    title: 'Gmail',
    text: 'New mail from Jane Smith about the project budget.',
    time: '15 min ago'
  },
  {
    id: 4,
    icon: '💡',
    title: 'Gemini',
    text: 'Your code review is complete and ready for merge.',
    time: '30 min ago'
  },
];

const LockScreen = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    // Update the date and time every second
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Time format for the status bar (HH:MM, e.g., 14:35)
  const statusTime = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Date format for the large clock display (e.g., Thursday, July 18)
  const dateString = dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Extract hours and minutes for the massive clock display
  const hours = statusTime.substring(0, 2);
  const minutes = statusTime.substring(3, 5);


  // A component to display the current status bar items
  const StatusBar = () => (
    <div className="absolute top-2 left-0 w-full flex justify-between px-6 py-2 text-white font-semibold text-sm z-20">
      {/* Carrier/Time on the left */}
      <span className="opacity-90">{statusTime}</span>

      {/* Icons on the right */}
      <div className="flex items-center space-x-1 opacity-90">
        <Wifi className="w-4 h-4" />
        <span className="font-bold">100%</span>
        {/* Using Lock for an empty space/visual balance */}
        <Lock className="w-4 h-4 opacity-0" />
        <BatteryCharging className="w-4 h-4 transform rotate-90" />
      </div>
    </div>
  );

  // A component for a single notification card
  const NotificationCard = ({ icon, title, text, time }) => (
    <div className="bg-white/40 backdrop-blur-xl p-20 mb-2 rounded-xl shadow-xl w-full max-w-sm mx-auto text-gray-900 border border-white/10 transition-transform duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer">
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{icon}</span>
          <p className="font-bold text-sm">{title}</p>
        </div>
        <span className="text-xs opacity-70 mt-0.5">{time}</span>
      </div>
      <p className="text-sm font-medium line-clamp-1">{text}</p>
    </div>
  );

  // A component for the bottom utility buttons


  return (
    // Outer container: Simulating a mobile frame (max-w-md for tablets/desktop, w-full for actual mobile)
    <div className="flex justify-center items-center min-h-screen p-4 font-['Inter',_sans-serif]">
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-between overflow-hidden rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)]">

        <StatusBar />

        {/* Center Content Area (Time, Date, Notifications) */}
        <div className="flex flex-col items-center pt-20 pb-4 w-full z-10">

          {/* Large Time and Date */}
          <div className="text-white text-center pt-8">
            <div className="flex justify-center items-center text-[5.5rem] leading-none font-extralight tracking-tighter transition-opacity duration-500">
              <span className="drop-shadow-lg">{hours}</span>
              <span className="mx-2 font-light opacity-80 drop-shadow-lg">:</span>
              <span className="drop-shadow-lg">{minutes}</span>
            </div>
            <p className="text-xl font-medium opacity-90 drop-shadow-lg">{dateString}</p>
          </div>

          {/* Notifications Area */}

        </div>
        <div className=" px-4 my-2 pt-4  overflow-y-auto max-h-[40vh] md:max-h-[50vh] custom-scrollbar">
          {mockNotifications.map(n => (
            <NotificationCard key={n.id} {...n} />
          ))}
        </div>

        {/* Bottom Controls and Swipe Indicator */}
        <div className="w-full flex flex-col items-center pb-4 space-y-4 z-10">
          {/* Swipe Indicator Text */}
          <p className="text-white/80 text-sm font-semibold mb-2 drop-shadow-md">
            Swipe up to unlock
          </p>
        </div>

        {/* Custom styles for the scrollbar within the lock screen notification area */}
        <style>
          {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 2px;
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
          }
          /* Fix for the extreme large time font size that Tailwind doesn't easily support */
          .text-\\[5\\.5rem\\] {
            font-size: 5.5rem;
          }
          /* Adjust for small screens */
          @media (max-width: 400px) {
            .text-\\[5\\.5rem\\] {
              font-size: 4.5rem;
            }
          }
          `}
        </style>
      </div>
    </div>
  );
};

export default LockScreen;