package com.practice.projectlibrary.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseResponse {
    
    private Long id;
    private Long bookId;
    private String bookTitle;
    private String bookImage;
    private Long price;
    private Integer quantity;
    private Long totalPrice;
    private Timestamp purchaseDate;
    private String status;
    private Long userId;
    private String username;

}
