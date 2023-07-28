package com.example.shopping.controller;

import com.example.shopping.db.Db;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/product/decrease")
public class ProductCountInDecrease extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("productId");
        int counter = Integer.parseInt(req.getParameter("counter"));
        if (req.getCookies()!=null){
            Cookie[] cookies = req.getCookies();
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("token")) {
                    try {
                        String userByToken = Db.getUserByToken(cookie.getValue());
                        if (userByToken != null) {
                            if (counter > 0) {
                                counter--;
                            }
                        }
                    } catch (SQLException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        }
        HttpSession session = req.getSession();
        session.setAttribute(id, counter);
        resp.sendRedirect("/index.jsp");

    }
}
