package com.trackify.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ExpenseRequest {
    private String icon;
    private String category;
    private BigDecimal amount;
    private LocalDate date;
}
