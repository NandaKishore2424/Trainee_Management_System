package org.example.repository;

import org.example.model.Trainee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TraineeRepository extends MongoRepository<Trainee, String> {
    Optional<Trainee> findByTraineeId(long traineeId);
    boolean existsByEmail(String email);
    
    // Improved query that correctly uses MongoDB _id field
    @Query("{'email': ?0, '_id': {$ne: ?1}}")
    boolean existsByEmailAndIdNot(String email, String id);
    
    Optional<Trainee> findByEmail(String email);
}