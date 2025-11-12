import React from 'react'

function CustomTextSection({ text }) {
  if (!text || !text.trim()) {
    return null
  }

  return (
    <div className="glass rounded-2xl p-6 mb-8">
      <div
        className="text-white prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }}
      />
    </div>
  )
}

export default CustomTextSection

