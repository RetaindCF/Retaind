$(document).ready(function(){
  $( "#loginform").submit(function(e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    localStorage.clear();
    var localToken = localStorage.getItem("token") || undefined;
    var token;
    if(localToken){
    token = JSON.parse(localToken).token;
    }
    var j = JSON.stringify({username: username, password: password, token: token});
    if(!token){
      j = JSON.stringify({username: username, password: password });
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
          var tok = localStorage.getItem("token");
          var usr = localStorage.getItem("username", JSON.stringify(username));
          var dash = "http://" + window.location.host + "/dashboard.html";
          window.location.replace(dash);
        }
    });
  });
});