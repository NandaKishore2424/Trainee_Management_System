package org.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @GetMapping("/public")
    public Map<String, String> publicAccess() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Public Content.");
        return response;
    }
    
    @GetMapping("/auth")
    public Map<String, String> authenticatedAccess() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Auth Content - requires authentication.");
        return response;
    }
}