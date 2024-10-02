package com.neshkart.neshkart.controller;


import com.neshkart.neshkart.model.PaymentResponse;
import com.neshkart.neshkart.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> data) {
        try {
            Object amountObject = data.get("amount");

            double amount = 0.0;
            if (amountObject instanceof Integer) {
                amount = ((Integer) amountObject).doubleValue(); // Convert Integer to Double
            } else if (amountObject instanceof Double) {
                amount = (Double) amountObject; // Cast to Double if already a Double
            }
            PaymentIntent paymentIntent = stripeService.createPaymentIntent(amount);
            return ResponseEntity.ok(Map.of("clientSecret", paymentIntent.getClientSecret()));
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
