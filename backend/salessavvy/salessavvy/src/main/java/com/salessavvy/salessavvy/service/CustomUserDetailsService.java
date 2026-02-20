package com.salessavvy.salessavvy.service;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.salessavvy.salessavvy.model.User;
import com.salessavvy.salessavvy.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        return new CustomUserDetails(user);
    }

}
