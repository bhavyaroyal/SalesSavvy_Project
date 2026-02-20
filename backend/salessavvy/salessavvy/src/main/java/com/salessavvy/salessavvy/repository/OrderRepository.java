package com.salessavvy.salessavvy.repository;

import com.salessavvy.salessavvy.model.Order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	List<Order> findByUserId(Long userId);
	
	


    Order findTopByOrderByIdDesc();

}
