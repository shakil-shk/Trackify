import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { LuArrowRight } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

const RecentTransactions = ({ transactions }) => {
  const navigate = useNavigate()
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title">Recent Transactions</h3>
        <button onClick={() => navigate('/income')} className="text-primary text-xs flex items-center gap-1 hover:gap-2 transition-all">
          View all <LuArrowRight size={12} />
        </button>
      </div>
      {(!transactions || transactions.length === 0) ? (
        <div className="flex flex-col items-center justify-center h-24 text-text-muted">
          <p className="text-sm">No recent transactions</p>
        </div>
      ) : (
        transactions.slice(0, 8).map((item, i) => (
          <TransactionInfoCard key={`${item.type}-${item.id}-${i}`} item={item} type={item.type} />
        ))
      )}
    </div>
  )
}

export default RecentTransactions
