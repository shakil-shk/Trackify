import { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({ onAdd, loading }) => {
  const [icon, setIcon] = useState('💸')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!category || !amount || !date) { setError('All fields are required.'); return }
    if (isNaN(amount) || Number(amount) <= 0) { setError('Amount must be a positive number.'); return }
    setError('')
    onAdd({ icon, category, amount: Number(amount), date })
    setCategory(''); setAmount(''); setDate(''); setIcon('💸')
  }

  return (
    <form onSubmit={handleSubmit}>
      <EmojiPickerPopup selectedEmoji={icon} onSelect={setIcon} />
      <Input label="Category" placeholder="e.g. Food, Rent, Groceries" value={category} onChange={e => setCategory(e.target.value)} />
      <Input label="Amount (৳)" placeholder="0.00" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} />
      {error && <p className="text-danger text-xs mb-3">{error}</p>}
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  )
}

export default AddExpenseForm
