import React from 'react'

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between bg-slate-700 text-white py-4 px-6">

        <div className="logo">
            <span className="font-bold text-xl mx-9 cursor-pointer">iTask</span>
        </div>
        <ul className="flex gap-8 mx-9 ">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
        
    </nav>
      
    
  )
}

export default Navbar
