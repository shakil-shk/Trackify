package com.trackify.controller;

import com.trackify.dto.AuthResponse;
import com.trackify.dto.LoginRequest;
import com.trackify.dto.RegisterRequest;
import com.trackify.dto.UserResponse;
import com.trackify.entity.User;
import com.trackify.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/getUser")
    public ResponseEntity<UserResponse> getUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(authService.getUserInfo(user.getId()));
    }

    @PostMapping("/upload-image")
    public ResponseEntity<Map<String, String>> uploadImage(
            @RequestParam("image") MultipartFile file,
            @AuthenticationPrincipal User user) {
        String imageUrl = authService.uploadImage(file, user.getId());
        return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    }
}
