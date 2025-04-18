/*
 * This source file was generated by the Gradle 'init' task
 */
package org.example;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@RestController
public class App {
    @GetMapping("/")
    public String getMethodName() {
        return "Hello world";
    }
    
    public String getGreeting() {
        return "Hello World!";
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
