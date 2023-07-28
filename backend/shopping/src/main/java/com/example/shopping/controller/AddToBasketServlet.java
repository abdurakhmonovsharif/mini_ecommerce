package com.example.shopping.controller;

import com.example.shopping.db.Db;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/addProductToBasket")
public class AddToBasketServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String productId = req.getParameter("product_id");
        String productCount = req.getParameter("product_count");
        if (req.getCookies()!=null) {
            Cookie[] cookies = req.getCookies();
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("token")) {
                    try {
                        String userByToken = Db.getUserByToken(cookie.getValue());
                        if (userByToken!=null){
                            try {
                                boolean successful = Db.addToBasket(cookie.getValue(), productId, Integer.parseInt(productCount));
                                if (successful) {
                                    resp.sendRedirect("/index.jsp");
                                }
                            } catch (SQLException e) {
                                throw new RuntimeException(e);
                            }
                        }
                    } catch (SQLException e) {
                        throw new RuntimeException(e);
                    }

                }
            }
        }
    }
}
