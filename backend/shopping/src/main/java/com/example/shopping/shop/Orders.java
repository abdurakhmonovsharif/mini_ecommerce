package com.example.shopping.shop;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orders {

   private String id;
   private int count;
   private String user_id;
   private String imageURL;
   private String name;
   private int price;

}
