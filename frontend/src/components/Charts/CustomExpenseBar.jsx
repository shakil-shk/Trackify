import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-surface-card border border-border rounded-xl px-4 py-3 shadow-card">
        <p className="text-text-muted text-xs font-mono mb-1">{label}</p>
        <p className="text-danger text-sm font-display font-bold">
          ${Number(payload[0].value).toFixed(2)}
        </p>
      </div>
    )
  }
  return null
}

const CustomExpenseBar = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2D2D4A" vertical={false} />
        <XAxis
          dataKey="category"
          tick={{ fill: '#6B6B8A', fontSize: 11, fontFamily: 'JetBrains Mono' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#6B6B8A', fontSize: 11, fontFamily: 'JetBrains Mono' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(239,68,68,0.08)' }} />
        <Bar dataKey="amount" fill="url(#expenseGrad)" radius={[6, 6, 0, 0]} />
        <defs>
          <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#DC2626" stopOpacity={0.6} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CustomExpenseBar
