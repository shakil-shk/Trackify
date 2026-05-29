package com.trackify.dto;

import com.trackify.entity.Income;
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
public class IncomeResponse {
    private Long id;
    private String icon;
    private String source;
    private BigDecimal amount;
    private LocalDate date;
    private String type = "income";

    public static IncomeResponse from(Income income) {
        return IncomeResponse.builder()
                .id(income.getId())
                .icon(income.getIcon())
                .source(income.getSource())
                .amount(income.getAmount())
                .date(income.getDate())
                .type("income")
                .build();
    }
}
