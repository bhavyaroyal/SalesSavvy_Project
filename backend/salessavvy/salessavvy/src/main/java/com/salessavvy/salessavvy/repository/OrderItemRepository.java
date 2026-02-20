package com.salessavvy.salessavvy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salessavvy.salessavvy.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
