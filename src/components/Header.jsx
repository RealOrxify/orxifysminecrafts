import React from 'react'

function Header({ onToggleAdmin, isAdmin }) {
  return (
    <header className="glass rounded-2xl p-8 mb-10 text-center shadow-2xl">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
        🎮 Minecraft Downloads
      </h1>
      <p className="text-white/90 text-xl mb-6">Instances & Resource Packs</p>
      <button
        onClick={onToggleAdmin}
        className={`px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg transform hover:scale-105 ${
          isAdmin 
            ? 'bg-red-500/30 hover:bg-red-500/40 text-white border border-red-400/30' 
            : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
        }`}
      >
        {isAdmin ? '👁️ View Mode' : '⚙️ Admin Panel'}
      </button>
    </header>
  )
}

export default Header

