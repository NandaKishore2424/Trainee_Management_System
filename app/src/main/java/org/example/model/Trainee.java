package org.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "trainees")
public class Trainee {
    
    @Id
    private String id;
    
    private long traineeId;
    private String name;
    
    @Indexed(unique = true)
    private String email;
    
    public Trainee() {
    }
    
    public Trainee(long traineeId, String name, String email) {
        this.traineeId = traineeId;
        this.name = name;
        this.email = email;
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public long getTraineeId() {
        return traineeId;
    }
    
    public void setTraineeId(long traineeId) {
        this.traineeId = traineeId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    @Override
    public String toString() {
        return "Trainee{" +
                "id='" + id + '\'' +
                ", traineeId=" + traineeId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}