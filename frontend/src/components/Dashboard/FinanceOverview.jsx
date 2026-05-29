import CustomBarChart from '../Charts/CustomBarChart'
import CustomPieChart from '../Charts/CustomPieChart'
import { prepareIncomeBarChartData, prepareExpenseBarChartData } from '../../utils/helper'

const FinanceOverview = ({ incomeData, expenseData }) => {
  const incomeChartData = prepareIncomeBarChartData(incomeData || [])
  const expenseChartData = prepareExpenseBarChartData(expenseData || []).slice(0, 6)

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div className="card">
        <h3 className="section-title mb-1">Income Trend</h3>
        <p className="text-text-muted text-xs mb-4">Last 60 days</p>
        {incomeChartData.length > 0 ? (
          <CustomBarChart data={incomeChartData} dataKey="amount" xKey="month" color="#10B981" />
        ) : (
          <div className="h-40 flex items-center justify-center text-text-muted text-sm">No income data</div>
        )}
      </div>
      <div className="card">
        <h3 className="section-title mb-1">Expense Breakdown</h3>
        <p className="text-text-muted text-xs mb-4">By category</p>
        {expenseChartData.length > 0 ? (
          <CustomPieChart data={expenseChartData} nameKey="category" valueKey="amount" />
        ) : (
          <div className="h-40 flex items-center justify-center text-text-muted text-sm">No expense data</div>
        )}
      </div>
    </div>
  )
}

export default FinanceOverview
