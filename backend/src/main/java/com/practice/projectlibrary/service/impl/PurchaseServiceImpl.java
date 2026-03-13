package com.practice.projectlibrary.service.impl;

import com.practice.projectlibrary.dto.request.PurchaseRequest;
import com.practice.projectlibrary.dto.response.PurchaseResponse;
import com.practice.projectlibrary.entity.Book;
import com.practice.projectlibrary.entity.Purchase;
import com.practice.projectlibrary.entity.User;
import com.practice.projectlibrary.exception.BadRequestException;
import com.practice.projectlibrary.exception.NotFoundException;
import com.practice.projectlibrary.repository.IBookRepository;
import com.practice.projectlibrary.repository.IUserRepository;
import com.practice.projectlibrary.repository.PurchaseRepository;
import com.practice.projectlibrary.service.IPurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseServiceImpl implements IPurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final IBookRepository bookRepository;
    private final IUserRepository userRepository;

    @Override
    @Transactional
    public PurchaseResponse createPurchase(PurchaseRequest purchaseRequest) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.getUserByUsernameAndEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Book book = bookRepository.findById(purchaseRequest.getBookId())
                .orElseThrow(() -> new NotFoundException("Book not found"));

        if (book.getQuantity() < purchaseRequest.getQuantity()) {
            throw new BadRequestException("Not enough book stock available");
        }

        // Deduct quantity
        book.setQuantity(book.getQuantity() - purchaseRequest.getQuantity());
        bookRepository.save(book);

        Purchase purchase = new Purchase();
        purchase.setUser(user);
        purchase.setBook(book);
        purchase.setQuantity(purchaseRequest.getQuantity());
        purchase.setTotalPrice(purchaseRequest.getQuantity() * book.getPrice());
        purchase.setPurchaseDate(Timestamp.from(LocalDateTime.now().atZone(ZoneId.of("Asia/Ho_Chi_Minh")).toInstant()));
        purchase.setStatus("COMPLETED");

        Purchase savedPurchase = purchaseRepository.save(purchase);
        return mapToResponse(savedPurchase);
    }

    @Override
    public List<PurchaseResponse> getPurchaseHistory() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.getUserByUsernameAndEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("User not found"));

        List<Purchase> purchases = purchaseRepository.findByUserIdOrderByPurchaseDateDesc(user.getId());
        return purchases.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private PurchaseResponse mapToResponse(Purchase purchase) {
        PurchaseResponse response = new PurchaseResponse();
        response.setId(purchase.getId());
        response.setBookId(purchase.getBook().getId());
        response.setBookTitle(purchase.getBook().getBookTitle());
        response.setBookImage(purchase.getBook().getImage());
        response.setPrice(purchase.getBook().getPrice());
        response.setQuantity(purchase.getQuantity());
        response.setTotalPrice(purchase.getTotalPrice());
        response.setPurchaseDate(purchase.getPurchaseDate());
        response.setStatus(purchase.getStatus());
        response.setUserId(purchase.getUser().getId());
        response.setUsername(purchase.getUser().getUsername());
        return response;
    }
}
