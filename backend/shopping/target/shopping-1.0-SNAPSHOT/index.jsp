<%@ page import="com.example.shopping.shop.Products" %>
<%@ page import="com.example.shopping.db.Db" %>
<%@ page import="com.example.shopping.shop.Category" %>
<%@ page import="java.sql.SQLException" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Shopping</title>
    <link rel="icon" href="icon.ico">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<style>
    /* From uiverse.io by @satyamchaudharydev */
    /* removing default style of button */

    .form button {
        border: none;
        background: none;
        color: #8b8ba7;
    }

    /* styling of whole input container */
    .form {
        --timing: 0.3s;
        --width-of-input: 300px;
        --height-of-input: 40px;
        --border-height: 2px;
        --input-bg: #fff;
        --border-color: #2f2ee9;
        --border-radius: 30px;
        --after-border-radius: 1px;
        position: relative;
        width: var(--width-of-input);
        height: var(--height-of-input);
        display: flex;
        align-items: center;
        padding-inline: 0.8em;
        border-radius: var(--border-radius);
        transition: border-radius 0.5s ease;
        background: var(--input-bg, #fff);
    }

    /* styling of Input */
    .input {
        font-size: 0.9rem;
        background-color: transparent;
        width: 100%;
        height: 100%;
        padding-inline: 0.5em;
        padding-block: 0.7em;
        border: none;
    }

    /* styling of animated border */
    .form:before {
        content: "";
        position: absolute;
        background: var(--border-color);
        transform: scaleX(0);
        transform-origin: center;
        width: 100%;
        height: var(--border-height);
        left: 0;
        bottom: 0;
        border-radius: 1px;
        transition: transform var(--timing) ease;
    }

    /* Hover on Input */
    .form:focus-within {
        border-radius: var(--after-border-radius);
    }

    input:focus {
        outline: none;
    }

    /* here is code of animated border */
    .form:focus-within:before {
        transform: scale(1);
    }

    /* styling of close button */
    /* == you can click the close button to remove text == */
    .reset {
        border: none;
        background: none;
        opacity: 0;
        visibility: hidden;
    }

    /* close button shown when typing */
    input:not(:placeholder-shown) ~ .reset {
        opacity: 1;
        visibility: visible;
    }

    /* sizing svg icons */
    .form svg {
        width: 17px;
        margin-top: 3px;
    }
</style>
<%
    boolean filterProduct = false;
    String productFromCategory = null;
    String searched = null;
    if (request.getParameter("productFromCategory") != null) {
        productFromCategory = request.getParameter("productFromCategory");
        filterProduct = true;
    }
    if (request.getParameter("searchingProductName") != null) {
        searched = request.getParameter("searchingProductName");
    }
%>
<body>
<div class="p-4">
    <div class="d-flex justify-content-between bg-secondary p-2 align-items-center">
        <div class="d-flex align-items-center">
            <img width="35" height="35"
                 src="https://banner2.cleanpng.com/20180705/vgk/kisspng-business-e-commerce-point-of-sale-supply-chain-ser-5b3e0e745d2ae3.3894929115307935883816.jpg"
                 alt="image"/>
            <span class="text-monospace ml-2">Shopping</span>
        </div>
        <div class="d-flex">
            <form action="${pageContext.request.contextPath}/index.jsp" method="post" class="mr-1" id="formId">
                <select class="form-control" name="productFromCategory" id="selectId">
                    <option selected disabled>choose category</option>
                    <option value="all">All</option>
                    <%for (Category item : Db.getCategories()) {%>
                    <option value="<%=item.getId()%>"><%=item.getName()%>
                    </option>
                    <%}%>
                </select>
                <button type="submit" id="submitBtn" style="display:none;">Submit</button>
            </form>
            <form class="form" action="${pageContext.request.contextPath}/index.jsp" method="post">
                <button type="button">
                    <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
                         aria-labelledby="search">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                              stroke="currentColor" stroke-width="1.333" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                    </svg>
                </button>
                <input name="searchingProductName" class="input" placeholder="search product" required="" type="text">
                <button class="reset" type="reset">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <button class="btn outline-dark">search</button>
            </form>
        </div>
        <div class="d-flex gap-4">
            <%
                String User = null;
                int buyedProductsLength = 0;
                String token = null;
                if (request.getCookies() != null) {
                    Cookie[] cookies = request.getCookies();
                    for (Cookie cookie : cookies) {
                        if (cookie.getName().equals("token")) {
                            token = cookie.getValue();
                            try {
                                User = Db.getUserByToken(cookie.getValue());
                                buyedProductsLength = Db.userBasket(cookie.getValue()).size();
                            } catch (SQLException e) {
                                throw new RuntimeException(e);
                            }
                        }
                    }
                }
            %>
            <%if (User == null) {%>
            <div class="d-flex gap-2 align-items-center">
                <form action="${pageContext.request.contextPath}/Login.jsp" method="post">
                    <button class="btn btn-warning ml-2">
                        Log in
                    </button>
                </form>
                <form action="${pageContext.request.contextPath}/Register.jsp" method="post">
                    <button class="btn btn-info ml-2">
                        Register
                    </button>
                </form>
            </div>
            <%} else {%>
            <div class="d-flex flex-column justify-content-center">
                <div class="d-flex">
                    <img width="40" height="40"
                         src="https://i1.wp.com/www.pnglib.com/wp-content/uploads/2020/08/young-user-icon_5f450e6354e9e.png?w=2400&ssl=1"
                         alt="icon">
                    <form class="ml-1" action="${pageContext.request.contextPath}/logOut" method="post">
                        <button class="btn btn-danger">log out</button>
                    </form>
                </div>
                <span class="text-monospace"><%=User%></span>
            </div>
            <%}%>
            <a href="${pageContext.request.contextPath}/Admin.jsp">admin</a>
            <a href="${pageContext.request.contextPath}/shop.jsp" class="ml-2">
                <img width="40" height="40" src="https://cdn-icons-png.flaticon.com/512/3721/3721818.png" alt="image"/>
                <span class="text-monospace text-danger h-5"><%=buyedProductsLength%></span>
            </a>
        </div>
    </div>
    <div class="p-2 w-100 d-flex flex-wrap gap-1">
        <%%>
        <%
            if (!filterProduct) {
                for (Products item : Db.getProducts()) {%>
        <div class="card col-md-3 p-2 ">
            <div class="card-header">
                <img src="<%=item.getImageURL()%>" alt="image" width="100" height="100"/>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between p-2">
                    <span class="text-monospace"><%=item.getName()%></span>
                    <span class="text-monospace"><%=item.getPrice()%>so'm</span>
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex">
                    <form action="${pageContext.request.contextPath}/product/increase" method="post">
                        <%
                            int myCounter = 0;
                            if (session.getAttribute(item.getId()) != null) {
                                myCounter = Integer.parseInt(session.getAttribute(item.getId()).toString());
                            }
                        %>
                        <input type="hidden" name="counter" value="<%=myCounter!=0?myCounter:item.getCount()%>">
                        <input type="hidden" name="productId" value="<%=item.getId()%>">
                        <button class="btn btn-success">+</button>
                    </form>
                    <h3><%=myCounter != 0 ? myCounter : item.getCount()%>
                    </h3>
                    <form action="${pageContext.request.contextPath}/product/decrease" method="post">
                        <%
                            if (session.getAttribute(item.getId()) != null) {
                                myCounter = Integer.parseInt(session.getAttribute(item.getId()).toString());
                            }
                        %>
                        <input type="hidden" name="counter" value="<%=myCounter!=0?myCounter:item.getCount()%>">
                        <input type="hidden" name="productId" value="<%=item.getId()%>">
                        <button class="btn btn-primary">-</button>
                    </form>
                </div>
                <form action="${pageContext.request.contextPath}/addProductToBasket" method="post"
                      id="add_product_form">
                    <input type="hidden" name="product_id" v    alue="<%=item.getId()%>"/>
                    <input type="hidden" name="product_name" value="<%=item.getName()%>"/>
                    <input type="hidden" name="product_price" value="<%=item.getPrice()%>"/>
                    <input type="hidden" name="product_count" value="<%=myCounter%>"/>
                    <button class="btn btn-warning mt-1">add to card</button>
                </form>
            </div>
        </div>
        <%
            }
        } else {
            for (Products item : Db.getProducts()) {
        %>
        <%if (item.getCategory_id().equals(productFromCategory)) {%>
        <div class="card col-md-3 p-2 ">
            <div class="card-header">
                <img src="<%=item.getImageURL()%>" alt="image" width="100" height="100"/>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between p-2">
                    <span class="text-monospace"><%=item.getName()%></span>
                    <span class="text-monospace"><%=item.getPrice()%>so'm</span>
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex">
                    <form action="${pageContext.request.contextPath}/product/increase" method="post">
                        <%
                            int myCounter = 0;
                            if (session.getAttribute(item.getId()) != null) {
                                myCounter = Integer.parseInt(session.getAttribute(item.getId()).toString());
                            }
                        %>
                        <input type="hidden" name="counter" value="<%=myCounter!=0?myCounter:item.getCount()%>">
                        <input type="hidden" name="productId" value="<%=item.getId()%>">
                        <button class="btn btn-success">+</button>
                    </form>
                    <h3><%=myCounter != 0 ? myCounter : item.getCount()%>
                    </h3>
                    <form action="${pageContext.request.contextPath}/product/decrease" method="post">
                        <%
                            if (session.getAttribute(item.getId()) != null) {
                                myCounter = Integer.parseInt(session.getAttribute(item.getId()).toString());
                            }
                        %>
                        <input type="hidden" name="counter" value="<%=myCounter!=0?myCounter:item.getCount()%>">
                        <input type="hidden" name="productId" value="<%=item.getId()%>">
                        <button class="btn btn-primary">-</button>
                    </form>
                </div>
                <form action="${pageContext.request.contextPath}/addProductToBasket" method="post">
                    <input type="hidden" name="product_id" value="<%=item.getId()%>"/>
                    <input type="hidden" name="product_name" value="<%=item.getName()%>"/>
                    <input type="hidden" name="product_price" value="<%=item.getPrice()%>"/>
                    <input type="hidden" name="product_count" value="<%=myCounter%>"/>
                    <button class="btn btn-warning mt-1">add to card</button>
                </form>
            </div>
        </div>
        <%}%>
        <%
                }
            }
        %>
        <%%>
    </div>
</div>
</body>
<script>
    document.getElementById("selectId").addEventListener("change", function () {
        document.getElementById("formId").submit();
    });
</script>
</html>