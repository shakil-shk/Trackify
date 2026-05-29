import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { LuDownload, LuPlus } from 'react-icons/lu'

const ExpenseList = ({ data, onDelete, onDownload, onAdd }) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title">Expense History</h3>
        <div className="flex gap-2">
          <button onClick={onDownload} className="btn-secondary flex items-center gap-1.5 text-xs py-1.5 px-3">
            <LuDownload size={13} /> Export
          </button>
          <button onClick={onAdd} className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-xl bg-danger/15 text-danger border border-danger/20 hover:bg-danger/25 transition-colors">
            <LuPlus size={13} /> Add
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-text-muted">
            <span className="text-3xl mb-2">💸</span>
            <p className="text-sm">No expense records yet</p>
          </div>
        ) : (
          data.map((item) => (
            <TransactionInfoCard key={item.id} item={item} type="expense" onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  )
}

export default ExpenseList
