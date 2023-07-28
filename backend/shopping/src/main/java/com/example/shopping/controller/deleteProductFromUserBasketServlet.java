package com.example.shopping.controller;

import com.example.shopping.db.Db;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/deleteProductFromUserBasket")
public class deleteProductFromUserBasketServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String userid = req.getParameter("userid");
        String productId = req.getParameter("product_Id");
        try {
            Db.deleteProductFromUserBasket(productId,userid);
            resp.sendRedirect("/shop.jsp");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
