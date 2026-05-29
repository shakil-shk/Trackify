import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import IncomeOverview from '../../components/Income/IncomeOverview'
import IncomeList from '../../components/Income/IncomeList'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import Modal from '../../components/Modal'
import DeleteAlert from '../../components/DeleteAlert'

const Income = () => {
  useUserAuth()
  const [incomes, setIncomes] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchIncome = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)
      setIncomes(data)
      setTotalIncome(data.reduce((sum, i) => sum + Number(i.amount), 0))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchIncome() }, [])

  const handleAdd = async (formData) => {
    setLoading(true)
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, formData)
      setShowAddModal(false)
      fetchIncome()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setDeleteId(null)
      fetchIncome()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDownload = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'income_details.xlsx')
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
          <h1 className="page-title">Income</h1>
          <p className="text-text-muted text-sm mt-1">Track all your income sources</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <IncomeOverview
            data={incomes}
            totalIncome={totalIncome}
            onAdd={() => setShowAddModal(true)}
          />
          <IncomeList
            data={incomes}
            onDelete={(id) => setDeleteId(id)}
            onDownload={handleDownload}
            onAdd={() => setShowAddModal(true)}
          />
        </div>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Income">
        <AddIncomeForm onAdd={handleAdd} loading={loading} />
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <DeleteAlert onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />
      </Modal>
    </DashboardLayout>
  )
}

export default Income
