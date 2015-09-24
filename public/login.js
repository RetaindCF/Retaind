$(document).ready(function(){
  $( "#loginform").submit(function(e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var j = JSON.stringify({username: username, password: password });
    console.log(j);
    $.ajax({
        url : "/api/login",
        type: "POST",
        data: j,
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(){
          console.log("ajax sent");
          $.ajax({
            url : "/api/login",
            type: "POST",
            data: j,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(token){
              //console.log(token, "recieved");
              localStorage.setItem("token", JSON.stringify(token));
              var tok = localStorage.getItem("token");
              console.log(tok);
              window.location.replace("http://localhost:3000/dashboard.html");
            }
          });
        }
    });
  });
});