import React from 'react'

function ResourcePacksSection({ packs, onDelete, isAdmin = false }) {
  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
        🎨 Resource Packs
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-white/60 text-lg">
              No resource packs added yet.
            </p>
            <p className="text-white/40 text-sm mt-2">
              Use the Admin Panel to add your first resource pack
            </p>
          </div>
        ) : (
          packs.map((pack) => (
            <div key={pack.id} className="glass-card rounded-xl p-6 flex flex-col">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">
                    {pack.name}
                  </h3>
                  {pack.version && (
                    <span className="px-2 py-1 bg-white/20 rounded text-white/80 text-xs font-medium">
                      v{pack.version}
                    </span>
                  )}
                </div>
                {pack.description && (
                  <p className="text-white/70 mb-4 text-sm leading-relaxed">
                    {pack.description}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <a
                  href={pack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gradient-to-r from-white/30 to-white/20 hover:from-white/40 hover:to-white/30 text-white rounded-lg transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  ⬇️ Download
                </a>
                {isAdmin && (
                  <button
                    onClick={() => onDelete(pack.id)}
                    className="px-3 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition text-sm"
                    title="Delete resource pack"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default ResourcePacksSection

