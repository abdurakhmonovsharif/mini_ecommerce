package com.example.shopping.shop;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    String id;
    String firstname;
    String lastname;
    String email;
    String password;
}
