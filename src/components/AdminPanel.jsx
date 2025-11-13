import React, { useState, useEffect } from 'react'

function AdminPanel({
  onAddInstance,
  onAddResourcePack,
  onSaveText,
  onImportFromGitHub,
  instances,
  resourcePacks,
  onDeleteInstance,
  onDeleteResourcePack,
  currentText
}) {
  const [instanceForm, setInstanceForm] = useState({
    name: '',
    description: '',
    url: '',
    version: ''
  })
  const [packForm, setPackForm] = useState({
    name: '',
    description: '',
    url: '',
    version: ''
  })
  const [pageText, setPageText] = useState(currentText)
  const [githubImport, setGithubImport] = useState({
    repoUrl: '',
    type: 'instance'
  })
  const [importing, setImporting] = useState(false)

  useEffect(() => {
    setPageText(currentText)
  }, [currentText])

  const handleGitHubImport = async (e) => {
    e.preventDefault()
    if (!githubImport.repoUrl) {
      alert('Please enter a GitHub repository URL')
      return
    }
    setImporting(true)
    const success = await onImportFromGitHub(githubImport.repoUrl, githubImport.type)
    if (success) {
      setGithubImport({ repoUrl: '', type: 'instance' })
    }
    setImporting(false)
  }

  const handleInstanceSubmit = async (e) => {
    e.preventDefault()
    if (!instanceForm.name || !instanceForm.url) {
      alert('Please fill in at least the name and URL.')
      return
    }
    const success = await onAddInstance(instanceForm)
    if (success) {
      setInstanceForm({ name: '', description: '', url: '', version: '' })
    }
  }

  const handlePackSubmit = async (e) => {
    e.preventDefault()
    if (!packForm.name || !packForm.url) {
      alert('Please fill in at least the name and URL.')
      return
    }
    const success = await onAddResourcePack(packForm)
    if (success) {
      setPackForm({ name: '', description: '', url: '', version: '' })
    }
  }

  const handleSaveText = async () => {
    const success = await onSaveText(pageText)
    if (success) {
      alert('Text saved!')
    }
  }

  return (
    <div className="admin-panel rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Admin Panel</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Instance Form */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Add Instance</h3>
          <form onSubmit={handleInstanceSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Instance Name"
              value={instanceForm.name}
              onChange={(e) => setInstanceForm({ ...instanceForm, name: e.target.value })}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="text"
              placeholder="Description"
              value={instanceForm.description}
              onChange={(e) => setInstanceForm({ ...instanceForm, description: e.target.value })}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="url"
              placeholder="GitHub Download URL"
              value={instanceForm.url}
              onChange={(e) => setInstanceForm({ ...instanceForm, url: e.target.value })}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="text"
              placeholder="Minecraft Version"
              value={instanceForm.version}
              onChange={(e) => setInstanceForm({ ...instanceForm, version: e.target.value })}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg transition"
            >
              Add Instance
            </button>
          </form>
        </div>

        {/* Add Resource Pack Form */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Add Resource Pack</h3>
          <form onSubmit={handlePackSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Resource Pack Name"
              value={packForm.name}
              onChange={(e) => setPackForm({ ...packForm, name: e.target.value })}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="text"
              placeholder="Description"
              value={packForm.description}
              onChange={(e) => setPackForm({ ...packForm, description: e.target.value })}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="url"
              placeholder="GitHub Download URL"
              value={packForm.url}
              onChange={(e) => setPackForm({ ...packForm, url: e.target.value })}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="text"
              placeholder="Pack Version"
              value={packForm.version}
              onChange={(e) => setPackForm({ ...packForm, version: e.target.value })}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg transition"
            >
              Add Resource Pack
            </button>
          </form>
        </div>
      </div>

      {/* GitHub Import */}
      <div className="glass-card rounded-xl p-6 mt-6">
        <h3 className="text-xl font-semibold text-white mb-4">Import from GitHub</h3>
        <form onSubmit={handleGitHubImport} className="space-y-4">
          <input
            type="url"
            placeholder="GitHub Repository URL (e.g., https://github.com/owner/repo)"
            value={githubImport.repoUrl}
            onChange={(e) => setGithubImport({ ...githubImport, repoUrl: e.target.value })}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <div className="flex items-center gap-4">
            <label className="text-white/80 flex items-center gap-2">
              <input
                type="radio"
                name="importType"
                value="instance"
                checked={githubImport.type === 'instance'}
                onChange={(e) => setGithubImport({ ...githubImport, type: e.target.value })}
                className="accent-white/50"
              />
              Instance
            </label>
            <label className="text-white/80 flex items-center gap-2">
              <input
                type="radio"
                name="importType"
                value="pack"
                checked={githubImport.type === 'pack'}
                onChange={(e) => setGithubImport({ ...githubImport, type: e.target.value })}
                className="accent-white/50"
              />
              Resource Pack
            </label>
          </div>
          <button
            type="submit"
            disabled={importing}
            className="w-full px-4 py-2 bg-white/30 hover:bg-white/40 disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-lg transition"
          >
            {importing ? 'Importing...' : 'Import from GitHub'}
          </button>
        </form>
      </div>

      {/* Edit Text Content */}
      <div className="glass-card rounded-xl p-6 mt-6">
        <h3 className="text-xl font-semibold text-white mb-4">Edit Page Text</h3>
        <textarea
          rows="4"
          placeholder="Add custom text/content for the page..."
          value={pageText}
          onChange={(e) => setPageText(e.target.value)}
          className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          onClick={handleSaveText}
          className="mt-4 px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg transition"
        >
          Save Text
        </button>
      </div>

      {/* Manage Items */}
      <div className="glass-card rounded-xl p-6 mt-6">
        <h3 className="text-xl font-semibold text-white mb-4">Manage Items</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {instances.length === 0 && resourcePacks.length === 0 ? (
            <p className="text-white/60">No items to manage.</p>
          ) : (
            <>
              {instances.map((instance) => (
                <div key={instance.id} className="flex items-center justify-between glass-card rounded-lg p-3">
                  <span className="text-white">{instance.name} (instance)</span>
                  <button
                    onClick={() => onDeleteInstance(instance.id)}
                    className="px-3 py-1 bg-red-500/30 hover:bg-red-500/40 text-white rounded transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {resourcePacks.map((pack) => (
                <div key={pack.id} className="flex items-center justify-between glass-card rounded-lg p-3">
                  <span className="text-white">{pack.name} (pack)</span>
                  <button
                    onClick={() => onDeleteResourcePack(pack.id)}
                    className="px-3 py-1 bg-red-500/30 hover:bg-red-500/40 text-white rounded transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel

