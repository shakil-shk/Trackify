import Logo from '../Logo'

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface bg-mesh flex">
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10 max-w-xl mx-auto w-full lg:mx-0">
        <div className="mb-10">
          <Logo size={72} />
        </div>
        <div className="animate-slide-up">{children}</div>
        <p className="mt-10 text-text-muted text-xs text-center">
          &copy; {new Date().getFullYear()} Trackify. All rights reserved.
        </p>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#0e0c1b] justify-center items-center p-12 border-l border-[#232042]/40">
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#10b981]/5 rounded-full blur-[100px]" />

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '44px 44px'
        }} />

        <div className="relative z-10 w-full max-w-md flex flex-col gap-10">
          
          <div className="space-y-4">
            
            <div className="bg-[#181530] border border-[#27234e] rounded-xl p-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#241e46] flex items-center justify-center border border-[#3b346d]">
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <span className="text-[#8c88b0] text-[11px] font-bold tracking-wider uppercase">Total Balance</span>
              </div>
              <p className="text-4xl font-bold tracking-tight text-white">
                ৳3,37,500<span className="text-xl text-slate-400">.00</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              
              <div className="bg-[#181530] border border-[#1b3835]/80 rounded-xl p-5 shadow-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 rounded-md bg-[#16292b] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <span className="text-[#8c88b0] text-[10px] font-bold tracking-wider uppercase">Total Income</span>
                </div>
                <p className="text-xl font-bold text-white">৳4,95,000</p>
              </div>

              <div className="bg-[#181530] border border-[#3c1e2b]/80 rounded-xl p-5 shadow-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 rounded-md bg-[#2b1924] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-[#f43f5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[#8c88b0] text-[10px] font-bold tracking-wider uppercase">Total Expenses</span>
                </div>
                <p className="text-xl font-bold text-white">৳1,57,500</p>
              </div>

            </div>
          </div>

          <div className="space-y-3 text-left px-1">
            <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
              Your financial overview <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-[#10b981]">
                at a glance.
              </span>
            </h2>
            <p className="text-[#8c88b0] text-sm leading-relaxed max-w-xs">
              Track income, manage expenses, and gain deeper insights into your absolute financial health.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout