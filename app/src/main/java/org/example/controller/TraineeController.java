package org.example.controller;

import org.example.model.Trainee;
import org.example.model.ServiceResponse;
import org.example.service.TraineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/")
public class TraineeController {

    private final TraineeService traineeService;

    @Autowired
    public TraineeController(TraineeService traineeService) {
        this.traineeService = traineeService;
    }

    @GetMapping("/trainees")
    public ResponseEntity<Map<String, Object>> getAllTrainees() {
        List<Trainee> trainees = traineeService.getAllTrainees();

        Map<String, Object> response = new HashMap<>();
        response.put("trainees", trainees);
        response.put("count", trainees.size());
        response.put("success", true);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/getTrainee")
    public ResponseEntity<Map<String, Object>> getTraineeById(@RequestParam("id") long id) {
        ServiceResponse<Trainee> serviceResponse = traineeService.getTraineeById(id);

        Map<String, Object> response = new HashMap<>();
        response.put("success", serviceResponse.isSuccess());
        response.put("message", serviceResponse.getMessage());

        if (serviceResponse.isSuccess()) {
            response.put("trainee", serviceResponse.getData());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/addTrainee")
    public ResponseEntity<Map<String, Object>> addTrainee(@RequestBody Trainee trainee) {
        ServiceResponse<Trainee> serviceResponse = traineeService.addTrainee(trainee);

        Map<String, Object> response = new HashMap<>();
        response.put("success", serviceResponse.isSuccess());
        response.put("message", serviceResponse.getMessage());

        if (serviceResponse.isSuccess()) {
            response.put("trainee", serviceResponse.getData());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PutMapping("/updateTrainee/{id}")
    public ResponseEntity<Map<String, Object>> updateTrainee(
            @PathVariable("id") long id,
            @RequestBody Trainee trainee) {

        ServiceResponse<Trainee> serviceResponse = traineeService.updateTrainee(id, trainee);

        Map<String, Object> response = new HashMap<>();
        response.put("success", serviceResponse.isSuccess());
        response.put("message", serviceResponse.getMessage());

        if (serviceResponse.isSuccess()) {
            response.put("trainee", serviceResponse.getData());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @DeleteMapping("/deleteTrainee/{id}")
    public ResponseEntity<Map<String, Object>> deleteTrainee(@PathVariable("id") long id) {
        ServiceResponse<Void> serviceResponse = traineeService.deleteTrainee(id);

        Map<String, Object> response = new HashMap<>();
        response.put("success", serviceResponse.isSuccess());
        response.put("message", serviceResponse.getMessage());

        if (serviceResponse.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
