package com.example.service;

import com.example.entity.User;
import com.example.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // SIGNUP
    public String registerUser(String username, String email, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            return "Username already exists!";
        }
        if (userRepository.findByEmail(email).isPresent()) {
            return "Email already exists!";
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password); // plain text for now

        userRepository.save(user);
        return "User registered successfully!";
    }

    // LOGIN
    public String loginUser(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password)) // plain text check
                .map(u -> "Login successful!")
                .orElse("Invalid username or password");
    }
}
