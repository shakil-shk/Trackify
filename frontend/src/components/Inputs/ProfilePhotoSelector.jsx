import { useRef, useState } from 'react'
import { LuCamera, LuUser, LuX } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage }) => {
  const fileRef = useRef(null)
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleRemove = () => {
    setImage(null)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative group">
        <div
          onClick={() => fileRef.current?.click()}
          className="w-20 h-20 rounded-2xl bg-surface-2 border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer flex items-center justify-center overflow-hidden"
        >
          {preview ? (
            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <LuUser size={28} className="text-text-muted" />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
            <LuCamera size={20} className="text-white" />
          </div>
        </div>
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-5 h-5 bg-danger rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <LuX size={10} className="text-white" />
          </button>
        )}
      </div>
      <p className="text-text-muted text-xs mt-2">Click to upload photo</p>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  )
}

export default ProfilePhotoSelector
