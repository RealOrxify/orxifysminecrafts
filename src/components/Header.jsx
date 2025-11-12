import React from 'react'

function Header({ onToggleAdmin }) {
  return (
    <header className="glass rounded-2xl p-6 mb-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
        Minecraft Downloads
      </h1>
      <p className="text-white/80 text-lg">Instances & Resource Packs</p>
      <button
        onClick={onToggleAdmin}
        className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
      >
        Admin Panel
      </button>
    </header>
  )
}

export default Header

