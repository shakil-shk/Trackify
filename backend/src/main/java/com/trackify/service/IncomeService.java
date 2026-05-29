package com.trackify.service;

import com.trackify.dto.IncomeRequest;
import com.trackify.dto.IncomeResponse;
import com.trackify.entity.Income;
import com.trackify.entity.User;
import com.trackify.repository.IncomeRepository;
import com.trackify.repository.UserRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    public IncomeService(IncomeRepository incomeRepository, UserRepository userRepository) {
        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
    }

    public IncomeResponse addIncome(Long userId, IncomeRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Income income = Income.builder()
                .user(user)
                .icon(request.getIcon())
                .source(request.getSource())
                .amount(request.getAmount())
                .date(request.getDate() != null ? request.getDate() : LocalDate.now())
                .build();

        return IncomeResponse.from(incomeRepository.save(income));
    }

    public List<IncomeResponse> getAllIncome(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return incomeRepository.findByUserOrderByDateDesc(user)
                .stream()
                .map(IncomeResponse::from)
                .collect(Collectors.toList());
    }

    public void deleteIncome(Long incomeId) {
        incomeRepository.deleteById(incomeId);
    }

    public byte[] downloadExcel(Long userId) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Income> incomes = incomeRepository.findByUserOrderByDateDesc(user);

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Income");

            // Header style
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Header row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Source", "Amount", "Date", "Icon"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Data rows
            int rowNum = 1;
            for (Income income : incomes) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(income.getSource());
                row.createCell(1).setCellValue(income.getAmount().doubleValue());
                row.createCell(2).setCellValue(income.getDate().toString());
                row.createCell(3).setCellValue(income.getIcon() != null ? income.getIcon() : "");
            }

            // Auto-size columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return out.toByteArray();
        }
    }
}
