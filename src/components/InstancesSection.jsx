import React from 'react'

function InstancesSection({ instances, onDelete }) {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Minecraft Instances
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instances.length === 0 ? (
          <p className="text-white/60 text-center col-span-full">
            No instances added yet.
          </p>
        ) : (
          instances.map((instance) => (
            <div key={instance.id} className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {instance.name}
              </h3>
              <p className="text-white/80 mb-3 text-sm">
                {instance.description || ''}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">
                  {instance.version || 'N/A'}
                </span>
                <a
                  href={instance.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg transition text-sm"
                >
                  Download
                </a>
              </div>
              <button
                onClick={() => onDelete(instance.id)}
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

export default InstancesSection

