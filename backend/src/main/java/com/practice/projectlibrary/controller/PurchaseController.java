package com.practice.projectlibrary.controller;

import com.practice.projectlibrary.dto.request.PurchaseRequest;
import com.practice.projectlibrary.dto.response.PurchaseResponse;
import com.practice.projectlibrary.service.IPurchaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/purchases")
@RequiredArgsConstructor
public class PurchaseController {

    private final IPurchaseService purchaseService;

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public PurchaseResponse createPurchase(@Valid @RequestBody PurchaseRequest purchaseRequest) {
        return purchaseService.createPurchase(purchaseRequest);
    }

    @GetMapping("/history")
    @ResponseStatus(HttpStatus.OK)
    public List<PurchaseResponse> getPurchaseHistory() {
        return purchaseService.getPurchaseHistory();
    }
}
