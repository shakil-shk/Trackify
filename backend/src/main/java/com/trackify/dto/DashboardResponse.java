package com.trackify.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private BigDecimal totalBalance;
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private Last30Days last30DaysExpenses;
    private Last60Days last60DaysIncome;
    private List<Object> recentTransactions;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Last30Days {
        private BigDecimal total;
        private List<ExpenseResponse> transactions;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Last60Days {
        private BigDecimal total;
        private List<IncomeResponse> transactions;
    }
}
