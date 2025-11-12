import React from 'react'

function ResourcePacksSection({ packs, onDelete }) {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Resource Packs
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packs.length === 0 ? (
          <p className="text-white/60 text-center col-span-full">
            No resource packs added yet.
          </p>
        ) : (
          packs.map((pack) => (
            <div key={pack.id} className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {pack.name}
              </h3>
              <p className="text-white/80 mb-3 text-sm">
                {pack.description || ''}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">
                  v{pack.version || 'N/A'}
                </span>
                <a
                  href={pack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg transition text-sm"
                >
                  Download
                </a>
              </div>
              <button
                onClick={() => onDelete(pack.id)}
                className="mt-2 text-red-300 hover:text-red-200 text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default ResourcePacksSection

