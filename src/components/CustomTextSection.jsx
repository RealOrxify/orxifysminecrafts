import React from 'react'

function CustomTextSection({ text }) {
  if (!text || !text.trim()) {
    return null
  }

  // Simple markdown-like formatting
  const formatText = (text) => {
    let formatted = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-white mb-3 mt-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-white mb-4 mt-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-white mb-5 mt-8">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-300 hover:text-blue-200 underline">$1</a>')
      // Line breaks
      .replace(/\n/g, '<br>')
    
    return formatted
  }

  return (
    <div className="glass rounded-2xl p-8 mb-10 shadow-xl">
      <div
        className="text-white/90 prose prose-invert max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatText(text) }}
      />
    </div>
  )
}

export default CustomTextSection

