import { LuHandCoins, LuPlus } from 'react-icons/lu'
import CustomPieChart from '../Charts/CustomPieChart'
import { prepareExpenseBarChartData } from '../../utils/helper'

const ExpenseOverview = ({ data, totalExpense, onAdd }) => {
  const chartData = prepareExpenseBarChartData(data).slice(0, 8)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="section-title">Expense Overview</h3>
          <p className="text-text-muted text-xs mt-0.5">By category breakdown</p>
        </div>
        <button onClick={onAdd} className="flex items-center gap-1.5 text-xs py-2 px-4 rounded-xl bg-danger/15 text-danger border border-danger/20 hover:bg-danger/25 transition-colors font-display font-medium">
          <LuPlus size={13} /> Add Expense
        </button>
      </div>
      <div className="flex items-center gap-3 mb-5 p-4 rounded-xl bg-danger/10 border border-danger/20">
        <div className="w-10 h-10 rounded-xl bg-danger/20 flex items-center justify-center">
          <LuHandCoins size={18} className="text-danger" />
        </div>
        <div>
          <p className="text-text-muted text-xs">Total Expenses</p>
          <p className="text-danger text-xl font-display font-bold">৳{Number(totalExpense || 0).toLocaleString()}</p>
        </div>
      </div>
      {chartData.length > 0 ? (
        <CustomPieChart data={chartData} nameKey="category" valueKey="amount" />
      ) : (
        <div className="h-40 flex items-center justify-center text-text-muted text-sm">No data to display</div>
      )}
    </div>
  )
}

export default ExpenseOverview
