<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="input" uri="http://www.springframework.org/tags/form" %>
<%@ page session="false" %>
<html>
<head>
    <title>Person List Screen</title>
    <link rel='stylesheet' type='text/css' media='screen' href='<c:url value="/resources/css/table.css"/>'/>
    <link rel='stylesheet' type='text/css' media='screen' href='<c:url value="/resources/css/style.css"/>'/>
    <link rel='stylesheet' type='text/css' media='screen' href='<c:url value="/resources/css/datatable.css"/>'/>
    <link rel='stylesheet' type='text/css' media='screen' href='<c:url value="/resources/css/editForm.css"/>'/>
    <link rel='stylesheet' type='text/css' media='screen' href='<c:url value="/resources/css/sweetalert.css"/>'/>


    <link href='http://fonts.googleapis.com/css?family=ABeeZee' rel='stylesheet' type='text/css'>
    <link rel='stylesheet' type='text/css' media='screen' href='<c:url value="/resources/css/button.css"/>'/>
    <link rel="stylesheet" href = "http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <script src="<c:url value="/resources/js/jquery-1.9.1.min.js"/>"></script>
    <script src="<c:url value="/resources/js/main.js"/>"></script>
    <script src="<c:url value="/resources/js/modernizr.js"/>"></script>
    <script src="<c:url value="/resources/js/sweetalert-dev.js"/>"></script>
    <script src="<c:url value="/resources/js/sweetalert.min.js"/>"></script>







    <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc; margin: auto;border: hidden}
        .tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;}
        .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;}
        .tg .tg-4eph{background-color:#f9f9f9}

        .font-style {
            font-family: ABeeZee;
            color: #ADABAB;
            font-size: 16;
            padding: 23;
        }

    </style>

</head>
<body>
<p align="center" class="font-style">Person List</p>

<table align="center"  class="tg" border="none" id="table">
    <tr>
        <td>
            <a href="#0">
                <div class="button-fill orange" id="add">
                    <div class="button-text" >Add Person</div>
                    <div class="button-inside">
                        <div class="inside-text">Add Person</div>
                    </div>
                </div></a>
        </td>
        <td >
            <a href="#">
                <div class="button-fill orange" id="edit" onclick="">
                    <div class="button-text">Edit Selected Person</div>
                    <div class="button-inside">
                        <div class="inside-text">Edit Selected Person</div>
                    </div>
                </div></a>                 </td>
        <td>
            <a href="#">
                <div class="button-fill orange" id="delete" onclick="">
                    <div class="button-text" >Delete Selected Person</div>
                    <div class="button-inside">
                        <div class="inside-text">Delete Selected Person</div>
                    </div>
                </div></a>                 </td>

    </tr>

</table>


<script>



    $(".button-fill").hover(function () {
        $(this).children(".button-inside").addClass('full');
    }, function() {
        $(this).children(".button-inside").removeClass('full');
    });



</script>
<c:if test="${!empty listPerson}">
    <table class="responstable" id="personTable">

        <tr>
            <th></th>
            <th data-th="Driver details"><span>First name</span></th>
            <th>Surname</th>
            <th>Address</th>
            <th>Phone Number</th>
        </tr>
        <c:forEach items="${listPerson}" var="user" >
            <tr id="${user.personId}">
                <td><input type="radio"  value='${user.personId}' id="selected" name="personData" onclick=""/></td>
                <td id="selectedName"  >${user.name}</td>
                <td id="selectedSurname">${user.surname}</td>
                <td id="selectedAddress">${user.address}</td>
                <td id="selectedPhoneNumber">${user.phoneNumber}</td>

            </tr>

        </c:forEach>
        <tr>
        </tr>
        <div id="result"></div>
    </table>
</c:if>

<div class="cd-user-modal"> <!-- this is the entire modal form, including the background -->
    <div class="cd-user-modal-container"> <!-- this is the container wrapper -->
        <ul class="cd-switcher">

            <li><a href="#0"><h1 class="font-style" id=""> Add a Person</h1></a></li>

        </ul>

        <div id="cd-login"> <!-- log in form -->
            <form:form class="cd-form" action="users" method="post" commandName="userForm" >
                <p class="fieldset">
                    <label class="image-replace cd-email">Person Name</label>
                    <form:input   class="full-width has-padding has-border" id="add-name" type="text" placeholder="Name" path="name"/>
                    <span class="cd-error-message">Please fill this area!</span>

                </p>

                <p class="fieldset">
                    <label class="image-replace cd-password" >Person Surname</label>
                    <form:input class="full-width has-padding has-border" id="add-surname" type="text"  placeholder=" Surname" path="surname"></form:input>

                    <span class="cd-error-message">Please fill this area!</span>
                </p>

                <p class="fieldset">
                    <label class="image-replace cd-email">Person Address</label>
                    <form:input class="full-width has-padding has-border" id="add-address" type="text" placeholder=" Address" path="address"></form:input>
                    <span class="cd-error-message">Please fill this area!</span>
                </p>
                <p class="fieldset">
                    <label class="image-replace cd-email" > Phone Number</label>
                    <form:input class="full-width has-padding has-border" id="add-number" type="text" placeholder="Phone Number" path="phoneNumber"></form:input>
                    <span class="cd-error-message">Please fill this area!</span>
                </p>
                <p class="fieldset">
                    <input class="full-width" type="submit" value="Add" >
                </p>
            </form:form>


            <!-- <a href="#0" class="cd-close-form">Close</a> -->
        </div> <!-- cd-login -->



    </div> <!-- cd-user-modal-container -->

</div> <!-- cd-user-modal -->
<div class="cd-user-modal2"> <!-- this is the entire modal form, including the background -->
    <div class="cd-user-modal2-container2"> <!-- this is the container wrapper -->
        <ul class="cd-switcher2">

            <li><a href="#0"><h1 class="font-style">Edit Person</h1></a></li>

        </ul>

        <div id="cd-edit"> <!-- log in form -->
            <form:form class="cd-form" action="users/edit" method="post" commandName="userEdit" >
                <p class="fieldset">
                    <label class="image-replace cd-email" id="tunc">Person Name</label>
                    <form:input   class="full-width has-padding has-border" id="edit-name" type="text" placeholder="Name" path="name"/>
                    <span class="cd-error-message">Please fill this area!</span>

                </p>

                <p class="fieldset">
                    <label class="image-replace cd-password" >Person Surname</label>
                    <form:input class="full-width has-padding has-border" id="edit-surname" type="text"  placeholder=" Surname" path="surname"></form:input>

                    <span class="cd-error-message">Please fill this area!</span>
                </p>

                <p class="fieldset">
                    <label class="image-replace cd-email">Person Address</label>
                    <form:input class="full-width has-padding has-border" id="edit-address" type="text" placeholder=" Address" path="address"></form:input>
                    <span class="cd-error-message">Please fill this area!</span>
                </p>
                <p class="fieldset">
                    <label class="image-replace cd-email" > Phone Number</label>
                    <form:input class="full-width has-padding has-border" id="edit-number" type="text" placeholder="Phone Number" path="phoneNumber"></form:input>
                    <span class="cd-error-message">Please fill this area!</span>
                </p>
                <form:input path="personId" type="hidden" id="edit-id"></form:input>
                <p class="fieldset">
                    <input class="full-width" type="submit" value="Edit Person">
                </p>
            </form:form>


            <!-- <a href="#0" class="cd-close-form">Close</a> -->
        </div> <!-- cd-login -->



    </div> <!-- cd-user-modal-container -->

</div> <!-- cd-user-modal -->

</body>
</html>