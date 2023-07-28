package com.example.shopping.controller;

import com.example.shopping.db.Db;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

import static com.example.shopping.db.Db.deleteProduct;

@WebServlet(urlPatterns = "/delete/product")
public class AddProductServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String deleteProduct = req.getParameter("deleteProductId");
        try {
            deleteProduct(deleteProduct);
            resp.sendRedirect("/Admin.js");
            } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
