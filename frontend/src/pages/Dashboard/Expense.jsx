import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import ExpenseList from '../../components/Expense/ExpenseList'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import Modal from '../../components/Modal'
import DeleteAlert from '../../components/DeleteAlert'

const Expense = () => {
  useUserAuth()
  const [expenses, setExpenses] = useState([])
  const [totalExpense, setTotalExpense] = useState(0)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchExpenses = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
      setExpenses(data)
      setTotalExpense(data.reduce((sum, e) => sum + Number(e.amount), 0))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchExpenses() }, [])

  const handleAdd = async (formData) => {
    setLoading(true)
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, formData)
      setShowAddModal(false)
      fetchExpenses()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setDeleteId(null)
      fetchExpenses()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDownload = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'expense_details.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="page-title">Expenses</h1>
          <p className="text-text-muted text-sm mt-1">Manage and track your spending</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <ExpenseOverview
            data={expenses}
            totalExpense={totalExpense}
            onAdd={() => setShowAddModal(true)}
          />
          <ExpenseList
            data={expenses}
            onDelete={(id) => setDeleteId(id)}
            onDownload={handleDownload}
            onAdd={() => setShowAddModal(true)}
          />
        </div>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Expense">
        <AddExpenseForm onAdd={handleAdd} loading={loading} />
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <DeleteAlert onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />
      </Modal>
    </DashboardLayout>
  )
}

export default Expense
