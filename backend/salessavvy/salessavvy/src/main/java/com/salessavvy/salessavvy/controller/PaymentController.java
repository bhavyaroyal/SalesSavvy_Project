package com.salessavvy.salessavvy.controller;

import org.springframework.web.bind.annotation.*;

import com.salessavvy.salessavvy.model.Payment;
import com.salessavvy.salessavvy.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/{orderId}")
    public Payment pay(@PathVariable Long orderId,
                       @RequestParam Double amount,
                       @RequestParam String method) {

        return paymentService.makePayment(orderId, amount, method);
    }
    
    
    
}



