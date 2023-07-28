<%@ page import="com.example.shopping.db.Db" %>
<%@ page import="com.example.shopping.shop.Products" %>
<%@ page import="com.example.shopping.shop.Category" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="com.example.shopping.shop.Users" %>
<%@ page import="com.example.shopping.shop.History" %><%--
  Created by IntelliJ IDEA.
  User: fulls
  Date: 1/29/2023
  Time: 7:30 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Admin</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
<%
    boolean add_product = false;
    boolean all_products = false;
    boolean history = false;
    boolean show_users = false;
    boolean add_category = false;
    // all products
    if (request.getParameter("allProducts") != null) {
        all_products = true;
    } else if (request.getParameter("history") != null) {
        history = true;
    } else if (request.getParameter("addCategory") != null) {
        add_category = true;
    } else if (request.getParameter("addProduct") != null) {
        add_product = true;
    } else if (request.getParameter("showUsers") != null) {
        show_users = true;
    }
%>
<%
    boolean successAddProduct = false;
    if (request.getParameter("product_name") != null) {
        String productName = request.getParameter("product_name");
        String productPrice = request.getParameter("product_price");
        String categoryId = request.getParameter("category_id");
        String productImageURL = request.getParameter("product_imageURL");
        try {
            boolean successfulAddedProduct = Db.addProduct(productName, productPrice, productImageURL, categoryId);
            if (successfulAddedProduct) {
                response.sendRedirect("/Admin.jsp");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    if (request.getParameter("category_name") != null) {
        String categoryName = request.getParameter("category_name");
        try {
            boolean successAddedCategory = Db.addCategory(categoryName);
            if (successAddedCategory) {
                response.sendRedirect("/Admin.jsp");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
%>
<div class="wrapper">
    <a href="${pageContext.request.contextPath}/index.jsp">
        <button class="btn btn-outline-dark">Home go to Shop</button>
    </a>
    <div class="d-flex ">
        <form action="${pageContext.request.contextPath}/Admin.jsp" method="post">
            <input type="hidden" name="allProducts"/>
            <button class="btn btn-warning">All Products</button>
        </form>

        <form action="${pageContext.request.contextPath}/Admin.jsp" method="post">
            <input type="hidden" name="history"/>
            <button class="btn btn-info">History</button>
        </form>
        <form action="${pageContext.request.contextPath}/Admin.jsp" method="post">
            <input type="hidden" name="addCategory"/>
            <button class="btn btn-success">Add Category</button>
        </form>

        <form action="${pageContext.request.contextPath}/Admin.jsp" method="post">
            <input type="hidden" name="addProduct"/>
            <button class="btn btn-danger">Add Product</button>
        </form>

        <form action="${pageContext.request.contextPath}/Admin.jsp" method="post">
            <input type="hidden" name="showUsers"/>
            <button class="btn btn-dark">Users</button>
        </form>
    </div>
    <%if (all_products) {%>
    <table class="table">
        <thead>
        <tr>
            <th>id</th>
            <th>image</th>
            <th>name</th>
            <th>category</th>
            <th>price</th>
            <th>actions</th>
        </tr>
        </thead>
        <tbody>
        <%for (Products item : Db.getProducts()) {%>
        <tr>
            <td><%=item.getId()%>
            </td>
            <td>
                <img src="<%=item.getImageURL()%>" alt="image" width="30" height="30"/>
            </td>
            <td><%=item.getName()%>
            </td>
            <td><%=Db.getProductCategory(item.getCategory_id())%>
            </td>
            <td><%=item.getPrice()%>
            </td>
            <td>
                <form action="${pageContext.request.contextPath}/delete/product" method="post">
                    <input type="hidden" name="deleteProductId" value="<%=item.getId()%>"/>
                    <button class="btn btn-danger">delete</button>
                </form>
            </td>
        </tr>
        <%}%>
        </tbody>
    </table>
    <%}%>
    <%if (add_product) {%>
    <div class="card p-2">
        <form action="${pageContext.request.contextPath}/Admin.jsp" method="post">
            <input name="product_name" placeholder="product name" type="text" class="form-control mt-1"/>
            <input name="product_price" placeholder="product price" type="text" class="form-control mt-1"/>
            <input name="product_imageURL" placeholder="product image url" type="url" class="form-control mt-1"/>
            <select name="category_id" class="form-control mt-1">
                <option selected disabled>choose category</option>
                <%for (Category item : Db.getCategories()) {%>
                <option value="<%=item.getId()%>"><%=item.getName()%>
                </option>
                <%}%>
            </select>
            <button class="btn btn-success">save</button>
            <%if (successAddProduct) {%><span
                class="text-center text-monospace text-success">product successful added</span>
            <%}%>
        </form>
    </div>
    <%}%>
    <%if (add_category) {%>
    <div class="card p-2">
        <form action="${pageContext.request.contextPath}/Admin.jsp" method="post">
            <input name="category_name" placeholder="category name" type="text" class="form-control"/>
            <button class="btn btn-success mt-1">save</button>
        </form>
    </div>
    <%}%>
    <%if (show_users) {%>
    <table class="table">
        <thead>
        <tr>
            <th>id</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>email</th>
            <th>password</th>
        </tr>
        </thead>
        <tbody>
        <%for (Users item : Db.getAllUsers()) {%>
        <tr>
            <td><%=item.getId()%>
            </td>
            <td><%=item.getFirstname()%>
            </td>
            <td><%=item.getLastname()%>
            </td>
            <td><%=item.getEmail()%>
            </td>
            <td><%=item.getPassword()%>
            </td>
        </tr>
        <%}%>
        </tbody>
    </table>
    <%}%>
    <%if (history) {%>
    <table class="table">
        <thead>
        <tr>
            <th>email</th>
            <th>product_name</th>
            <th>count</th>
            <th>sum</th>
            <th>date</th>
        </tr>
        </thead>
        <tbody>
        <%for (History item : Db.History()) {%>
        <tr>
            <td><%=item.getEmail()%>
            </td>
            <td><%=item.getName()%>
            </td>
            <td><%=item.getCount()%>x</td>
            <td><%=item.getCount() * item.getPrice()%>
                so'm
            </td>
            <td><%=item.getDate()%></td>
        </tr>
        <%}%>
        </tbody>
    </table>
    <%}%>
</div>
</body>
</html>
