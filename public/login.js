$(document).ready(function(){
  var j;
  if(localStorage.getItem("token")){
    $('#loginform').hide();
    $('.pagetitle').text("Dashboard");
   var tok = JSON.parse(localStorage.getItem("token")).token;
   var usr = JSON.parse(localStorage.getItem("username"));
   debugger;
    j = JSON.stringify({username: usr, token: tok});
    debugger;
    $.ajax({
      type: "POST",
      url : "/api/dashload",
      data: j,
      contentType: "application/json; charset=utf-8",
      dataType   : "json",
      success    : function(data){
        debugger;
      console.log("data", data);
      var curAmbs = data;
      curAmbs.forEach(function(item){
        noteMake2(item, "yellow");
        boxSubmitUpdate();
        $("<button>").addClass("newremind").text("new reminder").appendTo("body");

        $(".newremind").on("click", function() {
          noteMake2(null, "blue");
          boxSubmitUpdate();
        });
      });
    }
  });

  }
  $( "#loginform").submit(function(e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var localToken = JSON.parse(localStorage.getItem("token")) || undefined;
     j = JSON.stringify({username: username, password: password});
    if(localToken){
      j = JSON.stringify({username: username, password: password, token: localToken.token});
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
          j = JSON.stringify({username: username, token: token.token});
          debugger;
          $.ajax({
            type: "POST",
            url : "/api/dashload",
            data: j,
            contentType: "application/json; charset=utf-8",
            dataType   : "json",
            success    : function(data){
              console.log("data", data);
              curAmbs = data;
              curAmbs.forEach(function(item){
                noteMake2(item, "yellow");
                boxSubmitUpdate();
                $("<button>").addClass("newremind").text("new reminder").appendTo("body");

                $(".newremind").on("click", function() {
                  noteMake2(null, "blue");
                  boxSubmitUpdate();
                });
              });
            }
          });
        }
    });
  });
});