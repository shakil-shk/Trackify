import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'

const EmojiPickerPopup = ({ onSelect, selectedEmoji }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-4">
      <label className="label">Icon (Emoji)</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-xl bg-surface-2 border border-border hover:border-primary transition-colors flex items-center justify-center text-2xl"
        >
          {selectedEmoji || '😀'}
        </button>
        {open && (
          <div className="absolute top-14 left-0 z-50">
            <EmojiPicker
              onEmojiClick={(data) => { onSelect(data.emoji); setOpen(false) }}
              theme="dark"
              height={350}
              width={300}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default EmojiPickerPopup
