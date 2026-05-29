package com.trackify.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class IncomeRequest {
    private String icon;
    private String source;
    private BigDecimal amount;
    private LocalDate date;
}
