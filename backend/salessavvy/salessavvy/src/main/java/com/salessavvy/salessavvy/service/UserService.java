package com.salessavvy.salessavvy.service;

import com.salessavvy.salessavvy.model.User;
import com.salessavvy.salessavvy.dto.LoginRequest;

public interface UserService {

    User registerUser(User user);
    String loginUser(LoginRequest request);
    void deleteUser(Long id);
	User register(User user);
	User findByEmail(String email);
}
