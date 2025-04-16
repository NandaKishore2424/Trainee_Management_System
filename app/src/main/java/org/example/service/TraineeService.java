package org.example.service;

import org.example.model.Trainee;
import org.example.model.ServiceResponse;
import org.example.repository.TraineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TraineeService {
    
    private final TraineeRepository traineeRepository;
    private long nextId = 1;
    
    @Autowired
    public TraineeService(TraineeRepository traineeRepository) {
        this.traineeRepository = traineeRepository;
        // Initialize nextId based on existing data
        initializeNextId();
    }
    
    private void initializeNextId() {
        List<Trainee> allTrainees = traineeRepository.findAll();
        if (!allTrainees.isEmpty()) {
            nextId = allTrainees.stream()
                    .mapToLong(Trainee::getTraineeId)
                    .max()
                    .orElse(0) + 1;
        }
        System.out.println("Next trainee ID initialized to: " + nextId);
    }
    
    private synchronized long getNextId() {
        List<Trainee> allTrainees = traineeRepository.findAll();
        if (allTrainees.isEmpty()) {
            // Reset the sequence to 1 if no trainees exist
            nextId = 1;
            System.out.println("Collection is empty, resetting sequence to 1");
            return nextId;
        } else {
            // Get the maximum traineeId and add 1
            long maxId = allTrainees.stream()
                    .mapToLong(Trainee::getTraineeId)
                    .max()
                    .orElse(0);
            return maxId + 1;
        }
    }
    
    public List<Trainee> getAllTrainees() {
        try {
            return traineeRepository.findAll();
        } catch (Exception e) {
            System.err.println("Error fetching trainees: " + e.getMessage());
            return List.of(); // Return empty list instead of null
        }
    }
    
    public ServiceResponse<Trainee> getTraineeById(long id) {
        Optional<Trainee> trainee = traineeRepository.findByTraineeId(id);
        
        if (trainee.isPresent()) {
            return new ServiceResponse<>(trainee.get(), true, "Trainee found successfully");
        } else {
            return new ServiceResponse<>(null, false, "Trainee with ID " + id + " does not exist");
        }
    }
    
    public boolean isEmailExists(String email) {
        return traineeRepository.existsByEmail(email);
    }
    
    @Transactional
    public ServiceResponse<Trainee> addTrainee(Trainee trainee) {
        System.out.println("Adding trainee: " + trainee);
        
        // Validate input
        if (trainee == null) {
            return new ServiceResponse<>(null, false, "Trainee cannot be null");
        }
        
        if (trainee.getEmail() == null || trainee.getEmail().trim().isEmpty()) {
            return new ServiceResponse<>(null, false, "Email is required");
        }
        
        if (trainee.getName() == null || trainee.getName().trim().isEmpty()) {
            return new ServiceResponse<>(null, false, "Name is required");
        }
        
        // Check if email already exists
        if (isEmailExists(trainee.getEmail())) {
            return new ServiceResponse<>(null, false, "Email already exists: " + trainee.getEmail());
        }
        
        try {
            trainee.setTraineeId(getNextId());
            // Explicitly set ID to null to ensure MongoDB generates it
            trainee.setId(null);
            System.out.println("About to save trainee with ID: " + trainee.getTraineeId());
            Trainee savedTrainee = traineeRepository.save(trainee);
            System.out.println("Successfully saved trainee: " + savedTrainee + " with MongoDB ID: " + savedTrainee.getId());
            return new ServiceResponse<>(savedTrainee, true, "Trainee added successfully");
        } catch (Exception e) {
            System.err.println("Error saving trainee: " + e.getMessage());
            e.printStackTrace();
            return new ServiceResponse<>(null, false, "Failed to save trainee: " + e.getMessage());
        }
    }
    
    @Transactional
    public ServiceResponse<Trainee> updateTrainee(long id, Trainee updatedTrainee) {
        Optional<Trainee> existingTraineeOpt = traineeRepository.findByTraineeId(id);
        
        if (!existingTraineeOpt.isPresent()) {
            return new ServiceResponse<>(null, false, "Trainee with ID " + id + " does not exist");
        }
        
        Trainee existingTrainee = existingTraineeOpt.get();
        
        // Fix: Only check email uniqueness if email is changing
        if (updatedTrainee.getEmail() != null && 
                !updatedTrainee.getEmail().equals(existingTrainee.getEmail())) {
            // Use try-catch to handle potential failures in email check
            try {
                if (traineeRepository.existsByEmail(updatedTrainee.getEmail())) {
                    return new ServiceResponse<>(null, false, "Email already exists: " + updatedTrainee.getEmail());
                }
            } catch (Exception e) {
                System.err.println("Error checking email uniqueness: " + e.getMessage());
                return new ServiceResponse<>(null, false, "Failed to validate email uniqueness");
            }
        }
        
        // Update existing trainee
        existingTrainee.setName(updatedTrainee.getName());
        existingTrainee.setEmail(updatedTrainee.getEmail());
        
        try {
            Trainee savedTrainee = traineeRepository.save(existingTrainee);
            return new ServiceResponse<>(savedTrainee, true, "Trainee updated successfully");
        } catch (Exception e) {
            System.err.println("Error updating trainee: " + e.getMessage());
            return new ServiceResponse<>(null, false, "Failed to update trainee: " + e.getMessage());
        }
    }
    
    @Transactional
    public ServiceResponse<Void> deleteTrainee(long id) {
        Optional<Trainee> traineeOpt = traineeRepository.findByTraineeId(id);
        
        if (!traineeOpt.isPresent()) {
            return new ServiceResponse<>(null, false, "Trainee with ID " + id + " does not exist");
        }
        
        traineeRepository.delete(traineeOpt.get());
        return new ServiceResponse<>(null, true, "Trainee deleted successfully");
    }

    public void resetIdSequence() {
        this.nextId = 1;
        System.out.println("ID sequence reset to 1");
    }
}