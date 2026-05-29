import { LuTriangleAlert } from 'react-icons/lu'

const DeleteAlert = ({ onConfirm, onCancel }) => {
  return (
    <div className="text-center py-2">
      <div className="w-14 h-14 rounded-2xl bg-danger/15 border border-danger/20 flex items-center justify-center mx-auto mb-4">
        <LuTriangleAlert size={26} className="text-danger" />
      </div>
      <h4 className="text-text-primary font-display font-semibold text-base mb-2">Delete this entry?</h4>
      <p className="text-text-muted text-sm mb-6">This action cannot be undone.</p>
      <div className="flex gap-3 justify-center">
        <button onClick={onCancel} className="btn-secondary px-6">Cancel</button>
        <button onClick={onConfirm} className="btn-danger px-6">Delete</button>
      </div>
    </div>
  )
}

export default DeleteAlert
