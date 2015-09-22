$(document).ready(function(){
  $( "#loginform").submit(function(e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var j = JSON.stringify({username: username, password: password });
    $.ajax({
        url : "/api/login",
        type: "POST",
        data: j,
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(){
          console.log("ajax sent");
        }
    });
  });
});