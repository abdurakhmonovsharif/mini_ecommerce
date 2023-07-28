package com.example.shopping.shop;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class History {
    private String email;
    private String name;
    private int price;
    private int count;
    private String date;

}
