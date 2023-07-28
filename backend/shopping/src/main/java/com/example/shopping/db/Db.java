package com.example.shopping.db;

import com.example.shopping.shop.Category;
import com.example.shopping.shop.Orders;
import com.example.shopping.shop.Products;
import com.example.shopping.shop.Users;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Db {
    static Connection connection = null;

    static {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        try {
            connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/magazine",
                    "postgres", "abdurakhmonov4413");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static String checkUser(String email) throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select id from users where email='" + email + "'");
        while (resultSet.next()) {
            return resultSet.getString(1);
        }
        return "null";
    }

    public static String getUserByToken(String token) throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select firstname,lastname from users where id='" + token + "'");
        while (resultSet.next()) {
            return resultSet.getString(1) + " " + resultSet.getString(2);
        }
        return null;
    }

    public static boolean registration(String email, String password, String firstname, String lastname) throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select email from users where email='" + email + "'");
        if (!resultSet.next()) {
            PreparedStatement preparedStatement = connection.prepareStatement("insert into users values (?,?,?,?,?)");
            UUID uuid = UUID.randomUUID();
            preparedStatement.setString(1, uuid.toString());
            preparedStatement.setString(2, email);
            preparedStatement.setString(3, password);
            preparedStatement.setString(4, firstname);
            preparedStatement.setString(5, lastname);
            return preparedStatement.executeUpdate() == 1;
        }
        return false;
    }

    public static boolean loginUser(String email, String password) throws SQLException {
        System.out.println(email);
        System.out.println(password);
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from users where email='" + email + "' and password='" + password + "'");
        return resultSet.next();
    }

    public static List<Products> getProducts() throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from products");
        List<Products> products = new ArrayList<>();
        while (resultSet.next()) {
            products.add(
                    new Products(
                            resultSet.getString(1),
                            resultSet.getString(2),
                            resultSet.getString(3),
                            resultSet.getInt(4),
                            resultSet.getString(5),
                            0
                    )
            );
        }
        return products;
    }

    public static String getProductCategory(String id) throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select name from category where id='" + id + "'");
        while (resultSet.next()) {
            return resultSet.getString(1);
        }
        return "null";
    }

    public static List<Category> getCategories() throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select * from category");
        List<Category> categories = new ArrayList<>();
        while (resultSet.next()) {
            categories.add(
                    new Category(
                            resultSet.getString(1),
                            resultSet.getString(2)
                    )
            );
        }
        return categories;
    }

    public static boolean addProduct(String name, String price, String imgUrl, String category_id) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("insert into products values (?,?,?,?,?)");
        UUID uuid = UUID.randomUUID();
        preparedStatement.setString(1, uuid.toString());
        preparedStatement.setString(2, name);
        preparedStatement.setString(3, category_id);
        preparedStatement.setInt(4, Integer.parseInt(price));
        preparedStatement.setString(5, imgUrl);
        return preparedStatement.executeUpdate() == 1;
    }

    public static boolean addCategory(String categoryName) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("insert into category values (?,?)");
        UUID uuid = UUID.randomUUID();
        preparedStatement.setString(1, uuid.toString());
        preparedStatement.setString(2, categoryName);
        return preparedStatement.executeUpdate() == 1;
    }

    public static List<Users> getAllUsers() throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select id,firstname,lastname,email,password from users");
        List<Users> users = new ArrayList<>();
        while (resultSet.next()) {
            users.add(
                    new Users(
                            resultSet.getString(1),
                            resultSet.getString(2),
                            resultSet.getString(3),
                            resultSet.getString(4),
                            resultSet.getString(5)
                    )
            );
        }
        return users;
    }

    public static void deleteProduct(String deleteProduct) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("delete from products where id=?");
        preparedStatement.setString(1, deleteProduct);
        preparedStatement.executeUpdate();
    }

    public static List<Products> searchedProducts(String searched) throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select * products where name like '" + searched + "%'");
        List<Products> searchedproducts = new ArrayList<>();
        while (resultSet.next()) {
            searchedproducts.add(
                    new Products(
                            resultSet.getString(1),
                            resultSet.getString(2),
                            resultSet.getString(3),
                            resultSet.getInt(4),
                            resultSet.getString(5),
                            0
                    )
            );
        }
        System.out.println(searchedproducts);
        return searchedproducts;
    }

    public static boolean addToBasket(String user_id, String product_id, int count) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("insert into orders values (?,?,?,?,?,?)");
        UUID uuid = UUID.randomUUID();
        Date now = new java.util.Date();
        preparedStatement.setString(1, uuid.toString());
        preparedStatement.setString(2, user_id);
        preparedStatement.setString(3, product_id);
        preparedStatement.setInt(4, count);
        preparedStatement.setString(5, "start");
        preparedStatement.setString(6, now.toString());
        return preparedStatement.executeUpdate() == 1;
    }

    public static List<Orders> userBasket(String token) throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select p.id,orders.count,orders.user_id,p.image,p.name,p.price from orders inner join products p on p.id = orders.product_id where user_id='" + token + "' and status='start'");
        List<Orders> userOrders = new ArrayList<>();
        while (resultSet.next()) {
            userOrders.add(
                    new Orders(
                            resultSet.getString(1),
                            resultSet.getInt(2),
                            resultSet.getString(3),
                            resultSet.getString(4),
                            resultSet.getString(5),
                            resultSet.getInt(6)
                    )
            );
        }
        System.out.println(userOrders);
        return userOrders;
    }


    public static boolean finishBuy(String userId, String productId) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("update orders set status='finish' where user_id=? and product_id=?");
        preparedStatement.setString(1, userId);
        preparedStatement.setString(2, productId);
        return preparedStatement.executeUpdate() == 1;
    }

    public static void deleteProductFromUserBasket(String product_Id, String user_id) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("delete from orders where product_id=? and user_id=?");
        preparedStatement.setString(1, product_Id);
        preparedStatement.setString(2, user_id);
        preparedStatement.executeUpdate();
    }

    public static List<com.example.shopping.shop.History> History() throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("select u.email,p.name,p.price,orders.count,created_at from orders inner join products p on p.id = orders.product_id inner join users u on u.id = orders.user_id");
        List<com.example.shopping.shop.History> histories = new ArrayList<>();
        while (resultSet.next()) {
            histories.add(
                    new com.example.shopping.shop.History(
                            resultSet.getString(1),
                            resultSet.getString(2),
                            resultSet.getInt(3),
                            resultSet.getInt(4),
                            resultSet.getString(5)
                    )
            );
        }
        return histories;
    }

    public static boolean checkProduct(String userid, String productid) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("select * from orders where user_id=? and product_id=? and status=?");
        preparedStatement.setString(1, userid);
        preparedStatement.setString(2, productid);
        preparedStatement.setString(3, "status");
        return preparedStatement.executeUpdate() == 1;
    }

}
