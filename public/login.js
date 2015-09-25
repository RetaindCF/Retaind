$(document).ready(function(){
      localStorage.clear();
  $( "#loginform").submit(function(e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var localToken = JSON.parse(localStorage.getItem("token"));
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
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("username", JSON.stringify(username));
          var dash = "http://" + window.location.host + "/dashboard.html";
          window.location.replace(dash);
        }
    });
  });
});