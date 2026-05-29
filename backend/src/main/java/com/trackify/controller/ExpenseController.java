package com.trackify.controller;

import com.trackify.dto.ExpenseRequest;
import com.trackify.dto.ExpenseResponse;
import com.trackify.entity.User;
import com.trackify.service.ExpenseService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/expense")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("/add")
    public ResponseEntity<ExpenseResponse> addExpense(
            @RequestBody ExpenseRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(expenseService.addExpense(user.getId(), request));
    }

    @GetMapping("/get")
    public ResponseEntity<List<ExpenseResponse>> getAllExpenses(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(expenseService.getAllExpenses(user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.ok(Map.of("message", "Expense deleted successfully"));
    }

    @GetMapping("/downloadexcel")
    public ResponseEntity<byte[]> downloadExcel(@AuthenticationPrincipal User user) throws IOException {
        byte[] excelData = expenseService.downloadExcel(user.getId());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=expense_details.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelData);
    }
}
