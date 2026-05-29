package com.trackify.dto;

import com.trackify.entity.Expense;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseResponse {
    private Long id;
    private String icon;
    private String category;
    private BigDecimal amount;
    private LocalDate date;
    private String type = "expense";

    public static ExpenseResponse from(Expense expense) {
        return ExpenseResponse.builder()
                .id(expense.getId())
                .icon(expense.getIcon())
                .category(expense.getCategory())
                .amount(expense.getAmount())
                .date(expense.getDate())
                .type("expense")
                .build();
    }
}
