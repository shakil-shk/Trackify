package com.trackify.service;

import com.trackify.dto.DashboardResponse;
import com.trackify.dto.ExpenseResponse;
import com.trackify.dto.IncomeResponse;
import com.trackify.entity.User;
import com.trackify.repository.ExpenseRepository;
import com.trackify.repository.IncomeRepository;
import com.trackify.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public DashboardService(IncomeRepository incomeRepository,
                            ExpenseRepository expenseRepository,
                            UserRepository userRepository) {
        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboardData(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BigDecimal totalIncome = incomeRepository.sumAmountByUser(user);
        BigDecimal totalExpenses = expenseRepository.sumAmountByUser(user);
        BigDecimal totalBalance = totalIncome.subtract(totalExpenses);

        // Last 30 days expenses
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        List<ExpenseResponse> last30DaysExpenses = expenseRepository
                .findByUserAndDateAfterOrderByDateDesc(user, thirtyDaysAgo)
                .stream().map(ExpenseResponse::from).collect(Collectors.toList());

        BigDecimal expensesLast30Total = last30DaysExpenses.stream()
                .map(ExpenseResponse::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Last 60 days income
        LocalDate sixtyDaysAgo = LocalDate.now().minusDays(60);
        List<IncomeResponse> last60DaysIncome = incomeRepository
                .findByUserAndDateAfterOrderByDateDesc(user, sixtyDaysAgo)
                .stream().map(IncomeResponse::from).collect(Collectors.toList());

        BigDecimal incomeLast60Total = last60DaysIncome.stream()
                .map(IncomeResponse::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Recent transactions (last 5 incomes + 5 expenses sorted by date)
        List<Object> recentTransactions = new ArrayList<>();
        incomeRepository.findByUserOrderByDateDesc(user).stream()
                .limit(5).forEach(i -> recentTransactions.add(IncomeResponse.from(i)));
        expenseRepository.findByUserOrderByDateDesc(user).stream()
                .limit(5).forEach(e -> recentTransactions.add(ExpenseResponse.from(e)));

        recentTransactions.sort((a, b) -> {
            LocalDate dateA = a instanceof IncomeResponse ? ((IncomeResponse) a).getDate() : ((ExpenseResponse) a).getDate();
            LocalDate dateB = b instanceof IncomeResponse ? ((IncomeResponse) b).getDate() : ((ExpenseResponse) b).getDate();
            return dateB.compareTo(dateA);
        });

        return DashboardResponse.builder()
                .totalBalance(totalBalance)
                .totalIncome(totalIncome)
                .totalExpenses(totalExpenses)
                .last30DaysExpenses(new DashboardResponse.Last30Days(expensesLast30Total, last30DaysExpenses))
                .last60DaysIncome(new DashboardResponse.Last60Days(incomeLast60Total, last60DaysIncome))
                .recentTransactions(recentTransactions)
                .build();
    }
}
