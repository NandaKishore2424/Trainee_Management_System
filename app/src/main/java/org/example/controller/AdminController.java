package org.example.controller;

import org.example.service.TraineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final TraineeService traineeService;

    @Autowired
    public AdminController(TraineeService traineeService) {
        this.traineeService = traineeService;
    }

    @GetMapping("/reset-sequence")
    public ResponseEntity<Map<String, Object>> resetIdSequence() {
        traineeService.resetIdSequence();
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "ID sequence reset to 1");
        
        return ResponseEntity.ok(response);
    }
}