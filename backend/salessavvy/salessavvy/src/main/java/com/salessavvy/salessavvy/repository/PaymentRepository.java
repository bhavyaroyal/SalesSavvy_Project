package com.salessavvy.salessavvy.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.salessavvy.salessavvy.model.Payment;
import com.salessavvy.salessavvy.model.Order;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByOrder(Order order);
}
