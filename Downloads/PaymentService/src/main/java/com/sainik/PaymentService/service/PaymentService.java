package com.sainik.PaymentService.service;

import com.sainik.PaymentService.model.PaymentRequest;

public interface PaymentService {
   long doPayment(PaymentRequest paymentRequest);
}
