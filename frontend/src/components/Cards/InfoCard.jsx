import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu'

const InfoCard = ({ title, value, icon: Icon, color = 'purple', trend }) => {
  const colorMap = {
    purple: { bg: 'bg-primary/15', border: 'border-primary/20', text: 'text-primary', gradient: 'from-primary to-primary-dark' },
    cyan: { bg: 'bg-secondary/15', border: 'border-secondary/20', text: 'text-secondary', gradient: 'from-secondary to-cyan-600' },
    green: { bg: 'bg-success/15', border: 'border-success/20', text: 'text-success', gradient: 'from-success to-emerald-600' },
    red: { bg: 'bg-danger/15', border: 'border-danger/20', text: 'text-danger', gradient: 'from-danger to-red-600' },
  }
  const c = colorMap[color] || colorMap.purple

  return (
    <div className={`card border ${c.border}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
          {Icon && <Icon size={18} className={c.text} />}
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-mono ${trend >= 0 ? 'text-success' : 'text-danger'}`}>
            {trend >= 0 ? <LuTrendingUp size={12} /> : <LuTrendingDown size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-text-muted text-xs font-display uppercase tracking-wider mb-1">{title}</p>
      <p className="text-text-primary text-2xl font-display font-bold tracking-tight">{value}</p>
    </div>
  )
}

export default InfoCard
