import moment from 'moment'
import { LuTrash2, LuArrowUpRight, LuArrowDownRight } from 'react-icons/lu'
import { addThousandsSeparator } from '../../utils/helper'

const TransactionInfoCard = ({ item, type, onDelete }) => {
  const isIncome = type === 'income'
  const label = isIncome ? item.source : item.category

  return (
    <div className="flex items-center gap-3 py-3 border-b border-border/60 last:border-0 group">
      {/* Emoji icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${isIncome ? 'bg-success/15' : 'bg-danger/15'}`}>
        {item.icon || (isIncome ? '💰' : '💸')}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-text-primary text-sm font-body font-medium truncate">{label}</p>
        <p className="text-text-muted text-xs">{moment(item.date).format('D MMM YYYY')}</p>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="text-right">
          <p className={`text-sm font-mono font-semibold ${isIncome ? 'text-success' : 'text-danger'}`}>
            {isIncome ? '+' : '-'}৳{addThousandsSeparator(Number(item.amount).toFixed(0))}
          </p>
          <div className={`flex items-center gap-1 justify-end ${isIncome ? 'text-success/60' : 'text-danger/60'}`}>
            {isIncome ? <LuArrowUpRight size={10} /> : <LuArrowDownRight size={10} />}
            <span className="text-xs capitalize">{type}</span>
          </div>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(item.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-danger p-1 rounded-lg hover:bg-danger/10"
          >
            <LuTrash2 size={14} />
          </button>
        )}
      </div>
    </div>
  )
}

export default TransactionInfoCard
