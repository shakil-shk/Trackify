import moment from 'moment'

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const getInitials = (name) => {
  if (!name) return ''
  const words = name.split(' ')
  let initials = ''
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i][0]) initials += words[i][0]
  }
  return initials.toUpperCase()
}

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return '0'
  const [int, frac] = num.toString().split('.')
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return frac ? `${formatted}.${frac}` : formatted
}

export const formatCurrency = (amount) => {
  return String.fromCharCode(2547) + addThousandsSeparator(Number(amount || 0).toFixed(2))
}

export const prepareIncomeBarChartData = (data = []) => {
  return [...data]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => ({
      month: moment(item.date).format('D MMM'),
      amount: Number(item.amount),
      source: item.source,
    }))
}

export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item) => ({
    category: item.category,
    amount: Number(item.amount),
  }))
}

export const prepareExpenseLineChartData = (data = []) => {
  return [...data]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => ({
      date: moment(item.date).format('D MMM'),
      amount: Number(item.amount),
      category: item.category,
    }))
}
