import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-card border border-border rounded-xl px-3 py-2 shadow-card">
        <p className="text-text-muted text-xs mb-1">{label}</p>
        <p className="text-primary font-mono font-semibold text-sm">৳{Number(payload[0].value).toLocaleString()}</p>
      </div>
    )
  }
  return null
}

const CustomBarChart = ({ data, dataKey = 'amount', xKey = 'month', color = '#7C3AED' }) => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2D2D4A" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fill: '#6B6B8A', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#6B6B8A', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CustomBarChart
