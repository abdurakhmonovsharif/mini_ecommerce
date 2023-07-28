<%@ page import="com.example.shopping.db.Db" %>
<%@ page import="java.sql.SQLException" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<style>
    body {
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1366px;
        margin: 0 auto;
    }

    form {
        width: 400px;
    }
</style>
<%
    boolean Unsuccess = false;
    if (request.getParameter("email") != null) {
        try {
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            boolean success = Db.loginUser(email,password);
            if (success) {
                String token = Db.checkUser(email);
                Cookie cookie=new Cookie("token",token);
                response.addCookie(cookie);
                response.sendRedirect("/index.jsp");
                Unsuccess = false;
            } else {
                Unsuccess = true;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
%>
<body style="
background-image:url('https://smartdailybargains.com/wp-content/uploads/2018/02/cropped-14640877701961883198online-shopping-image-1.jpg');">
<div class="wrapper p-3">
    <div class="card  mt-2 p-2">
        <span class="text-center text-monospace">Login</span>
        <form action="${pageContext.request.contextPath}/Login.jsp" method="post" class="mt-2">
            <input type="email" placeholder="email" name="email" class="form-control" required/>
            <input type="text" placeholder="password" name="password" class="form-control mt-1" required minlength="8"/>
            <button class="btn btn-warning mt-1">Log in</button>
        </form>
        <a class="text-right" href="${pageContext.request.contextPath}/Register.jsp">
            <h5 class="text-monospace">Don't have an account?</h5>
        </a>
        <%if (Unsuccess) {%><span class="text-center text-danger text-monospace">Email or password error</span><%}%>
    </div>
</div>
</body>
</html>
