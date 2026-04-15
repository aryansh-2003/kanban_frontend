import React, { useContext, useEffect, useRef, useState } from 'react';
import { Search, Plus, Bell, Menu, ArrowLeft, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import DisplayPic from '../DisplayPic';
import HeaderContext from '../context/HeaderContext';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
// import { io } from 'socket.io-client';
// import { getSocket } from '../../../Service/socketIO';

// Logo Icon Component if image fails or isn't used
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4L19 12L5 20V4Z" stroke="#E1AD01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="transparent"/>
    <path d="M5 4L19 12L5 20V4Z" fill="#E1AD01" fillOpacity="0.2"/>
  </svg>
);



      

export default function Header() {
  const userData = useSelector((state) => state.auth.userData);
  const { setSidebarOpen, setinputvalue, sidebarOpen } = useContext(HeaderContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  // const socket = useRef(null)

  useEffect(()=>{

  //    return () => {
  //   socket.disconnect();
  // };
  },[])

  const onsubmit = (data) => {
    setinputvalue(data.Text);
    navigate('/SearchPage');
    setMobileSearchOpen(false);
  };

  const onCLick = () => {
    console.log("Hi")
      // socket.emit("message", `Hi im here${socket.id}`)
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0f0f0f] border-b border-[#272727] z-50 flex items-center justify-between px-4 lg:px-6">
      
      {/* --- LEFT SECTION: Menu & Logo --- */}
      <div className={`flex items-center gap-4 ${mobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
        >
          <Menu size={20} />
        </button>

        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => navigate('/')}
        >
          {/* Use your image or the SVG fallback */}
          <LogoIcon /> 
          <span className="text-xl font-bold text-white tracking-tight hidden sm:block">ChalChitram</span>
        </div>
      </div>

      {/* --- CENTER SECTION: Search Bar --- */}
      <div className="flex-1 max-w-[720px] mx-4 lg:mx-12 flex justify-center">
        {/* Desktop Search */}

        {/* Mobile Search Input (Visible when toggled) */}

      </div>

      {/* --- RIGHT SECTION: Actions --- */}
      <div className={`flex items-center gap-2 sm:gap-3 ${mobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Mobile Search Toggle Icon */}
        <button 
          className="md:hidden p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10"
          onClick={() => setMobileSearchOpen(true)}
        >
          <Search size={20} />
        </button>



        {/* Notification Bell */}
        <button onClick={onCLick} lassName="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors group">
          <Bell size={20} />
          {/* Notification Badge */}
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-[#0f0f0f]">
            3
          </span>
        </button>

        {/* User Profile */}
        <div 
          className="ml-1 cursor-pointer" >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-transparent hover:border-gray-500 transition-all">
            <DisplayPic children={userData} />
          </div>
        </div>
      </div>
    </header>
  );
}