import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import AdminPanel from './components/AdminPanel'
import InstancesSection from './components/InstancesSection'
import ResourcePacksSection from './components/ResourcePacksSection'
import CustomTextSection from './components/CustomTextSection'
import './App.css'

const API_BASE = '/api'

function App() {
  const [instances, setInstances] = useState([])
  const [resourcePacks, setResourcePacks] = useState([])
  const [customText, setCustomText] = useState('')
  const [showAdmin, setShowAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [instancesRes, packsRes, textRes] = await Promise.all([
        axios.get(`${API_BASE}/instances`),
        axios.get(`${API_BASE}/resource-packs`),
        axios.get(`${API_BASE}/custom-text`)
      ])
      setInstances(instancesRes.data)
      setResourcePacks(packsRes.data)
      setCustomText(textRes.data.text || '')
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addInstance = async (instanceData) => {
    try {
      const response = await axios.post(`${API_BASE}/instances`, instanceData)
      setInstances([...instances, response.data])
      return true
    } catch (error) {
      console.error('Error adding instance:', error)
      alert('Failed to add instance')
      return false
    }
  }

  const addResourcePack = async (packData) => {
    try {
      const response = await axios.post(`${API_BASE}/resource-packs`, packData)
      setResourcePacks([...resourcePacks, response.data])
      return true
    } catch (error) {
      console.error('Error adding resource pack:', error)
      alert('Failed to add resource pack')
      return false
    }
  }

  const deleteInstance = async (id) => {
    if (!window.confirm('Are you sure you want to delete this instance?')) {
      return
    }
    try {
      await axios.delete(`${API_BASE}/instances/${id}`)
      setInstances(instances.filter(i => i.id !== id))
    } catch (error) {
      console.error('Error deleting instance:', error)
      alert('Failed to delete instance')
    }
  }

  const deleteResourcePack = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource pack?')) {
      return
    }
    try {
      await axios.delete(`${API_BASE}/resource-packs/${id}`)
      setResourcePacks(resourcePacks.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting resource pack:', error)
      alert('Failed to delete resource pack')
    }
  }

  const saveCustomText = async (text) => {
    try {
      await axios.post(`${API_BASE}/custom-text`, { text })
      setCustomText(text)
      return true
    } catch (error) {
      console.error('Error saving text:', error)
      alert('Failed to save text')
      return false
    }
  }

  const importFromGitHub = async (repoUrl, type) => {
    try {
      const response = await axios.post(`${API_BASE}/import-github`, {
        repoUrl,
        type
      })
      
      if (type === 'instance') {
        setInstances([...instances, response.data])
      } else {
        setResourcePacks([...resourcePacks, response.data])
      }
      
      alert('Successfully imported from GitHub!')
      return true
    } catch (error) {
      console.error('Error importing from GitHub:', error)
      const errorMessage = error.response?.data?.error || 'Failed to import from GitHub'
      alert(errorMessage)
      return false
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center">
          <div className="text-white text-2xl font-semibold mb-2">Loading...</div>
          <div className="text-white/60">Fetching your downloads</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header onToggleAdmin={() => setShowAdmin(!showAdmin)} isAdmin={showAdmin} />
        
        {showAdmin && (
          <AdminPanel
            onAddInstance={addInstance}
            onAddResourcePack={addResourcePack}
            onSaveText={saveCustomText}
            onImportFromGitHub={importFromGitHub}
            instances={instances}
            resourcePacks={resourcePacks}
            onDeleteInstance={deleteInstance}
            onDeleteResourcePack={deleteResourcePack}
            currentText={customText}
          />
        )}

        {customText && <CustomTextSection text={customText} />}

        <InstancesSection instances={instances} onDelete={deleteInstance} isAdmin={showAdmin} />
        <ResourcePacksSection packs={resourcePacks} onDelete={deleteResourcePack} isAdmin={showAdmin} />
      </div>
    </div>
  )
}

export default App

