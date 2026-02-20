package com.salessavvy.salessavvy.service;

import com.salessavvy.salessavvy.exception.ResourceNotFoundException;
import com.salessavvy.salessavvy.model.Order;
import com.salessavvy.salessavvy.model.Payment;
import com.salessavvy.salessavvy.repository.OrderRepository;
import com.salessavvy.salessavvy.repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Payment makePayment(Long orderId, Double amount, String method) {

        // ✅ Get Order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));



        // ✅ Create Payment
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(amount);
        payment.setPaymentMethod(method);
        payment.setPaymentStatus("SUCCESS");

        paymentRepository.save(payment);

        // ✅ Update Order Status
        order.setStatus("PAID");
        orderRepository.save(order);

        return payment;
    }

	@Override
	public Payment makePayment(String method) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Payment makePayment(Long orderId) {
		// TODO Auto-generated method stub
		return null;
	}

}
