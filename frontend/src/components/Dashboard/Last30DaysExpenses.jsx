import CustomBarChart from '../Charts/CustomBarChart'
import { prepareExpenseLineChartData } from '../../utils/helper'

const Last30DaysExpenses = ({ data, total }) => {
  const chartData = prepareExpenseLineChartData(data || [])
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">Last 30 Days Expenses</h3>
          <p className="text-text-muted text-xs mt-0.5">Daily spending trend</p>
        </div>
        <div className="text-right">
          <p className="text-danger text-lg font-display font-bold">৳{Number(total || 0).toLocaleString()}</p>
          <p className="text-text-muted text-xs">Total spent</p>
        </div>
      </div>
      {chartData.length > 0 ? (
        <CustomBarChart data={chartData} dataKey="amount" xKey="date" color="#EF4444" />
      ) : (
        <div className="h-32 flex items-center justify-center text-text-muted text-sm">No expense data</div>
      )}
    </div>
  )
}

export default Last30DaysExpenses
