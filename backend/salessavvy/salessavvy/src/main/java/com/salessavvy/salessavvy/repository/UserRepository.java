package com.salessavvy.salessavvy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salessavvy.salessavvy.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}
