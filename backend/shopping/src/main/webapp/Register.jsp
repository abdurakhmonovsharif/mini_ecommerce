<%@ page import="com.example.shopping.db.Db" %>
<%@ page import="java.sql.SQLException" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Register</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <style>
        body {
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .wrapper{
            justify-content: center;
            display: flex;
            align-items: center;
            width: 1366px;
            margin: 0 auto;
        }
        form{
            width: 400px;
        }

    </style>

</head>
<body style="
background-image:url('https://smartdailybargains.com/wp-content/uploads/2018/02/cropped-14640877701961883198online-shopping-image-1.jpg')">
<%
    boolean Unsuccess = false;
   if (request.getParameter("email")!=null){
       String email = request.getParameter("email");
    String password = request.getParameter("password");
    String firstname = request.getParameter("firstname");
    String lastname = request.getParameter("lastname");
    try {
        boolean success = Db.registration(email, password,firstname,lastname);
        if (success) {
            response.sendRedirect("/Login.jsp");
            Unsuccess = false;
        }else{
            Unsuccess=true;
        }
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
   }
%>
<div class="wrapper">
    <div class="card p-2">
        <span class="text-monospace text-center">Registration</span>
        <form action="${pageContext.request.contextPath}/Register.jsp" method="post" class="mt-2">
            <input type="text" placeholder="firstname" name="firstname" class="form-control" required/>
            <input type="text" placeholder="lastname" name="lastname" class="form-control mt-1" required/>
            <input type="email" placeholder="email" name="email" class="form-control mt-1" required/>
            <input type="text" placeholder="password" name="password" class="form-control mt-1" required minlength="8"/>
            <button class="btn btn-info mt-1">Register</button>
        </form>
            <a href="${pageContext.request.contextPath}/Login.jsp" class="text-right">
                <h5 class="text-monospace">Have an account?</h5>
            </a>
        <%if(Unsuccess){%> <p class="text-danger text-center text-monospace">The email has already been taken!</p><%}%>
    </div>
</div>
</body>
</html>
