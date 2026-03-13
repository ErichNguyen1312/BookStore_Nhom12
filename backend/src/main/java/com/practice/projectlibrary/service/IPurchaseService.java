package com.practice.projectlibrary.service;

import com.practice.projectlibrary.dto.request.PurchaseRequest;
import com.practice.projectlibrary.dto.response.PurchaseResponse;

import java.util.List;

public interface IPurchaseService {
    PurchaseResponse createPurchase(PurchaseRequest purchaseRequest);
    List<PurchaseResponse> getPurchaseHistory();
}
