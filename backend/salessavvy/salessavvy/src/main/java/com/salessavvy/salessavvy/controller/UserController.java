package com.salessavvy.salessavvy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.salessavvy.salessavvy.model.User;
import com.salessavvy.salessavvy.dto.LoginRequest;
import com.salessavvy.salessavvy.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }
    
    @PostMapping("/login")
    public java.util.Map<String, String> login(
            @RequestBody LoginRequest request) {

        String token = userService.loginUser(request);

        return java.util.Map.of("token", token);
    }


    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }
    
    @GetMapping("/profile")
    public User getProfile() {

        String email = (String) org.springframework.security.core.context
                .SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        return userService.findByEmail(email);
    }
    
}
