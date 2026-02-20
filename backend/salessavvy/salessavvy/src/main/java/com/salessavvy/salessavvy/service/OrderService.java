package com.salessavvy.salessavvy.service;

import java.util.List;

import com.salessavvy.salessavvy.model.Order;

public interface OrderService {
	
	List<Order> getUserOrders(Long userId);

	List<Order> getOrdersByUser(Long userId);

    Order placeOrder(Long userId);

    Order getOrderById(Long orderId);
    

    List<Order> getAllOrders();

	Order placeOrder();

}
