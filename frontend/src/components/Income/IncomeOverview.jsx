import { LuWalletMinimal, LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'

const IncomeOverview = ({ data, totalIncome, onAdd }) => {
  const chartData = prepareIncomeBarChartData(data)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="section-title">Income Overview</h3>
          <p className="text-text-muted text-xs mt-0.5">Last 60 days activity</p>
        </div>
        <button onClick={onAdd} className="flex items-center gap-1.5 text-xs py-2 px-4 rounded-xl bg-success/15 text-success border border-success/20 hover:bg-success/25 transition-colors font-display font-medium">
          <LuPlus size={13} /> Add Income
        </button>
      </div>
      <div className="flex items-center gap-3 mb-5 p-4 rounded-xl bg-success/10 border border-success/20">
        <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
          <LuWalletMinimal size={18} className="text-success" />
        </div>
        <div>
          <p className="text-text-muted text-xs">Total Income</p>
          <p className="text-success text-xl font-display font-bold">৳{Number(totalIncome || 0).toLocaleString()}</p>
        </div>
      </div>
      {chartData.length > 0 ? (
        <CustomBarChart data={chartData} dataKey="amount" xKey="month" color="#10B981" />
      ) : (
        <div className="h-40 flex items-center justify-center text-text-muted text-sm">No data to display</div>
      )}
    </div>
  )
}

export default IncomeOverview
