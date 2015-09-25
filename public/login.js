$(document).ready(function(){
  $( "#loginform").submit(function(e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var localToken = JSON.parse(sessionStorage.getItem("token"));
    var j = JSON.stringify({username: username, password: password});
    if(localToken){
    j = JSON.stringify({username: username, password: password, token: localToken});
    }
    console.log(j);
    $.ajax({
        url : "/api/login",
        type: "POST",
        data: j,
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success: function(token){
          sessionStorage.setItem("token", JSON.stringify(token));
          sessionStorage.setItem("username", JSON.stringify(username));
          var dash = "http://" + window.location.host + "/dashboard.html";
          alert("What is happening");
          window.location.href = dash;
          window.reload();
        }
    });
  });
});