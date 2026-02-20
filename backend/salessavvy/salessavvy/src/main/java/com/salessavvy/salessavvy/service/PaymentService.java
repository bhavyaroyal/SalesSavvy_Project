package com.salessavvy.salessavvy.service;

import com.salessavvy.salessavvy.model.Payment;

public interface PaymentService {

    Payment makePayment(Long orderId, Double amount, String method);

	Payment makePayment(String method);

	Payment makePayment(Long orderId);
}
