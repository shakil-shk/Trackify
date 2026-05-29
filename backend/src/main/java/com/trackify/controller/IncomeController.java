package com.trackify.controller;

import com.trackify.dto.IncomeRequest;
import com.trackify.dto.IncomeResponse;
import com.trackify.entity.User;
import com.trackify.service.IncomeService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/income")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @PostMapping("/add")
    public ResponseEntity<IncomeResponse> addIncome(
            @RequestBody IncomeRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(incomeService.addIncome(user.getId(), request));
    }

    @GetMapping("/get")
    public ResponseEntity<List<IncomeResponse>> getAllIncome(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(incomeService.getAllIncome(user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.ok(Map.of("message", "Income deleted successfully"));
    }

    @GetMapping("/downloadexcel")
    public ResponseEntity<byte[]> downloadExcel(@AuthenticationPrincipal User user) throws IOException {
        byte[] excelData = incomeService.downloadExcel(user.getId());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=income_details.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelData);
    }
}
