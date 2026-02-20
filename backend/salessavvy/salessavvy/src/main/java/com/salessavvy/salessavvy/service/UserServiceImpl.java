package com.salessavvy.salessavvy.service;

import com.salessavvy.salessavvy.dto.LoginRequest;
import com.salessavvy.salessavvy.model.User;
import com.salessavvy.salessavvy.repository.UserRepository;
import com.salessavvy.salessavvy.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepo,
                           PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ REGISTER
    @Override
    public User registerUser(User user) {

        // encode password before saving
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        if (user.getRole() == null)
            user.setRole("USER");

        return userRepo.save(user);
    }

    // ✅ LOGIN
    @Override
    public String loginUser(LoginRequest request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 CORRECT PASSWORD CHECK
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException("Invalid password");
        }

        return JwtUtil.generateToken(user.getEmail());
    }

    @Override
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

	@Override
	public User register(User user) {
		// TODO Auto-generated method stub
		return null;
	}
}
