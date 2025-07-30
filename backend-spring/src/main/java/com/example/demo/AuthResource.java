package com.example.demo;

import com.example.demo.Service.AuthService;
import com.example.demo.model.LoginRequest;
import com.example.demo.model.RegisterRequest;
import com.example.demo.security.JwtTokenUtil;
import com.example.demo.model.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Auth")
public class AuthResource {

    private final AuthService authService;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthResource(AuthService authService, JwtTokenUtil jwtTokenUtil) {
        this.authService = authService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        boolean isValid = authService.validateUser(request.getUsername(), request.getPassword());
        if (isValid) {
            String token = jwtTokenUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, "Login successful"));
        } else {
            return ResponseEntity.status(401).body(new AuthResponse(null, "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (authService.userExists(request.getUsername())) {
            return ResponseEntity.status(409).body(new AuthResponse(null, "Username already exists"));
        }
        authService.registerUser(request.getUsername(), request.getPassword(), request.getApartmentName());
        return ResponseEntity.ok(new AuthResponse(null, "User registered successfully"));
    }
}
