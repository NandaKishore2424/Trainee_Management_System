package org.example.controller;

import org.bson.Document;
import org.example.model.Trainee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/health")
public class HealthCheckController {
    
    @Autowired
    private MongoTemplate mongoTemplate;
    
    @GetMapping("/mongodb")
    public ResponseEntity<Map<String, Object>> checkMongoConnection() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Document pingResult = mongoTemplate.executeCommand(new Document("ping", 1));
            boolean isOk = pingResult.getDouble("ok") == 1.0;
            
            if (isOk) {
                response.put("status", "UP");
                response.put("message", "MongoDB connection successful");
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "DOWN");
                response.put("message", "MongoDB ping command failed");
                return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
            }
        } catch (Exception e) {
            response.put("status", "DOWN");
            response.put("message", "MongoDB connection failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
        }
    }

    @PostMapping("/mongodb/test-save")
    public ResponseEntity<Map<String, Object>> testMongoSave() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Create a test trainee
            Trainee testTrainee = new Trainee();
            testTrainee.setTraineeId(999);
            testTrainee.setName("Test MongoDB");
            testTrainee.setEmail("test" + System.currentTimeMillis() + "@test.com");
            
            Trainee saved = mongoTemplate.save(testTrainee, "trainees");
            
            response.put("status", "SUCCESS");
            response.put("message", "Test trainee saved successfully");
            response.put("trainee", saved);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("message", "Failed to save test trainee: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}