package com.neshkart.neshkart.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
public class StripeService {

    @Value("${stripe.api.key}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    public PaymentIntent createPaymentIntent(double amount) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("amount", (int) (amount * 100)); // Stripe expects the amount in cents
        params.put("currency", "inr");
        params.put("payment_method_types", new String[]{"card"});

        return PaymentIntent.create(params);
    }
}
