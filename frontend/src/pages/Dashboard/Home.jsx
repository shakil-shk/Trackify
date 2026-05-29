import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { formatCurrency } from '../../utils/helper'
import InfoCard from '../../components/Cards/InfoCard'
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
import { LuWalletMinimal, LuHandCoins, LuScale, LuRefreshCw } from 'react-icons/lu'

const Home = () => {
  useUserAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const { data: res } = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA)
      setData(res)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDashboard() }, [])

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="text-text-muted text-sm mt-1">Your financial overview at a glance</p>
          </div>
          <button onClick={fetchDashboard} className="btn-secondary flex items-center gap-1.5 text-xs py-2 px-3">
            <LuRefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <InfoCard
            title="Total Balance"
            value={formatCurrency(data?.totalBalance)}
            icon={LuScale}
            color="purple"
          />
          <InfoCard
            title="Total Income"
            value={formatCurrency(data?.totalIncome)}
            icon={LuWalletMinimal}
            color="green"
          />
          <InfoCard
            title="Total Expenses"
            value={formatCurrency(data?.totalExpenses)}
            icon={LuHandCoins}
            color="red"
          />
        </div>

        {/* Charts */}
        <div className="mb-6">
          <FinanceOverview
            incomeData={data?.last60DaysIncome?.transactions || []}
            expenseData={data?.last30DaysExpenses?.transactions || []}
          />
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Last30DaysExpenses
            data={data?.last30DaysExpenses?.transactions || []}
            total={data?.last30DaysExpenses?.total}
          />
          <RecentTransactions transactions={data?.recentTransactions || []} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
