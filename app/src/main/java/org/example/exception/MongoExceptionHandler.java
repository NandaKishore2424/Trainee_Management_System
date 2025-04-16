package org.example.exception;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class MongoExceptionHandler {

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateKeyException(DuplicateKeyException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "A record with this information already exists");
        
        String errorMessage = ex.getMessage();
        if (errorMessage.contains("email")) {
            response.put("message", "A trainee with this email already exists");
        }
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}