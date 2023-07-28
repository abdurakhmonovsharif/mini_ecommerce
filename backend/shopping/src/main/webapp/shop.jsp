<%@ page import="com.example.shopping.shop.Orders" %>
<%@ page import="com.example.shopping.db.Db" %>
<%@ page import="java.sql.SQLException" %><%--
  Created by IntelliJ IDEA.
  User: fulls
  Date: 1/30/2023
  Time: 3:19 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Shopping</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body class="p-4">
<div class="d-flex justify-content-between bg-secondary">
    <div class="p-2 d-flex align-items-center">
        <a href="${pageContext.request.contextPath}/index.jsp">
            <img src="https://cdn-icons-png.flaticon.com/512/0/340.png" alt="icon" width="35" height="35">
        </a>
    </div>
</div>
<div class="d-flex flex-wrap">
    <%
        int totalSum = 0;
        if (request.getCookies() != null) {
            Cookie[] cookies = request.getCookies();
            String token = null;
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("token")) {
                    token = cookie.getValue();
                }
            }
            for (Orders item : Db.userBasket(token)) {
                totalSum += item.getCount() * item.getPrice();
    %>
    <div class="card col-md-3 ml-1">
        <div class="card-header">
            <img src="<%=item.getImageURL()%>" alt="image" width="100" height="100"/>
        </div>
        <div class="card-body">
            <span class="text-monospace"><%=item.getCount()%> ta </span>
            <span class="text-monospace"><%=item.getPrice()%>  so'm</span>
        </div>
        <div class="card-footer">
            <form method="post" action="${pageContext.request.contextPath}/deleteProductFromUserBasket">
                <input name="userid" value="<%=item.getUser_id()%>" type="hidden"/>
                <input name="product_Id" value="<%=item.getId()%>" type="hidden"/>
                <button class="btn btn-danger">delete</button>
            </form>
        </div>
    </div>
    <form action="${pageContext.request.contextPath}/finishBuy" method="post">
        <input name="userid" value="<%=item.getUser_id()%>" type="hidden"/>
        <input name="product_Id" value="<%=item.getId()%>" type="hidden"/>
        <button class="btn btn-warning">buy</button>
    </form>
    <%}%>
    <%}%>
</div>
<h3 class="text-monospace"><%=totalSum%> so'm
</h3>
</body>
</html>
