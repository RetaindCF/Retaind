$(document).ready(function(){
 var userLocalToken = localStorage.getItem("token")
 console.log(userLocalToken);
 var token = JSON.parse(userLocalToken).token;
 console.log("parsed token", token);
  var dItems = [];
  var userLocalName = localStorage.getItem("username");
  var username = JSON.parse(userLocalName).username;
  //var u = JSON.stringify({token: userLocalToken});
  var getAmb = JSON.stringify({username: username, token: token});
  var curAmbs;
  $.ajax({
    type: "POST",
    url : "/api/dashload",
    data: getAmb,
    contentType: "application/json; charset=utf-8",
    dataType   : "json",
    success    : function(data){
      console.log("data", data);
      curAmbs = data;
    }
  });

  $("<button>").addClass("newremind").text("new reminder").appendTo("body");

  $(".newremind").on("click", function() {
    $("<div>").addClass("box").appendTo("main");
    $("<button>").addClass("editremind").text("edit").appendTo(".box:last");
    $("<button>").text("cancel").addClass("cancel").appendTo(".box:last").hide();
    $("<form>").addClass("remindform").attr('method', 'PUT').appendTo(".box:last");
    $(".remindform:last").append('activity: <input type="text" class="activity">')
    $(".remindform:last").append("<br>");
    $(".remindform:last").append("<br>");
    $(".remindform:last").append('<input type="submit" value="Submit Changes">');
    $(".remindform:last").append('<p class="lastlogin"></p>');
    $(".activity").attr('disabled', true);
    editUpdate();
    boxSubmitUpdate();
  })

  $(".activity").attr('disabled', true);
  $("<button>").addClass("cancel").text("cancel").prependTo("#box1");
  $(".cancel").hide();

function editUpdate() {
  $(".editremind").on("click", function(e){
    e.preventDefault();
    $(".activity").attr('disabled', false);
    $(".editreminder").toggle();
    $(".cancel").toggle();
  })

  $(".cancel").on("click", function(){
    $(".activity").val("");
    $(".activity").attr('disabled', true);
    $(this).toggle();
    $(".editreminder").toggle();
  })
}

  function boxSubmitUpdate(){
    $( ".box").submit(function(e) {
      $(".lastlogin").text("last checkin: " + new Date().toString())
      e.preventDefault();
      var activity = $(".activity").val();
      $(".activity").attr('disabled', true);
      var j = JSON.stringify({username: username, token: token, ambitions: activity});
      //console.log(j);
      $.ajax({
          type: "POST",
          url : "/api/ambition",
          data: j,
          contentType: "application/json; charset=utf-8",
          dataType   : "json",
          success    : function(){
            console.log("edit data sent");
          }
      });
    });
  }
}); //document ready end