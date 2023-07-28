package com.example.shopping.shop;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Products {
   private String id;
   private String name;
   private String category_id;
   private int price;
   private String imageURL;
   private int count;
}
