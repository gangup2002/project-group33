package com.example.usermanagementservice.service.impl;

import com.example.usermanagementservice.model.User;
import com.example.usermanagementservice.repository.UserRepository;
import com.example.usermanagementservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.web.client.RestTemplate;
import java.time.LocalDate;
import com.example.usermanagementservice.model.Notification;



@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;


    @Override
    public User saveUser(User user) {

        User savedUser = userRepository.save(user);

        Notification notification = new Notification();

        notification.setRecipient(savedUser.getEmail());
        notification.setMessage("Welcome to Tourism ERP System");
        notification.setType("EMAIL");
        notification.setStatus("SENT");
        notification.setSentDate(LocalDate.now().toString());

        restTemplate.postForObject(
                "http://localhost:8086/api/notifications",
                notification,
                Notification.class
        );

        return savedUser;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser != null) {
            existingUser.setFullName(user.getFullName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setRole(user.getRole());

            return userRepository.save(existingUser);
        }

        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}