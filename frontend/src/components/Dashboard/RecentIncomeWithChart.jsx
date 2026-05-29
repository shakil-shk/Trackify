import React from 'react'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData, addThousandsSeparator } from '../../utils/helper'

const RecentIncomeWithChart = ({ data = [], total = 0 }) => {
  const chartData = prepareIncomeBarChartData(data)

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="section-title">Income (Last 60 Days)</h3>
          <p className="text-text-muted text-xs font-body mt-0.5">Income trend over time</p>
        </div>
        <div className="text-right">
          <p className="text-text-muted text-[10px] font-display uppercase tracking-wider">Total</p>
          <p className="text-success text-lg font-display font-bold">
            ${addThousandsSeparator(Number(total).toFixed(2))}
          </p>
        </div>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  )
}

export default RecentIncomeWithChart
