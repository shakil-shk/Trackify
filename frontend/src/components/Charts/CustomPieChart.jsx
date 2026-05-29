import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#7C3AED', '#06B6D4', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#EC4899']

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-card border border-border rounded-xl px-3 py-2 shadow-card">
        <p className="text-text-primary text-xs font-semibold">{payload[0].name}</p>
        <p className="text-primary font-mono text-sm">৳{Number(payload[0].value).toLocaleString()}</p>
      </div>
    )
  }
  return null
}

const CustomPieChart = ({ data, nameKey = 'category', valueKey = 'amount' }) => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          dataKey={valueKey}
          nameKey={nameKey}
          paddingAngle={3}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => <span style={{ color: '#A0A0C0', fontSize: 11 }}>{value}</span>}
          iconSize={8}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart
