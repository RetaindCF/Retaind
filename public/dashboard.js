$(document).ready(function(){
 var userLocalToken = localStorage.getItem("token");
 console.log(userLocalToken);
  var dItems = [];
  //var u = JSON.stringify({token: userLocalToken});
$.ajax({
          type: "POST",
          url : "/api/user_token",
          data: userLocalToken,
          contentType: "application/json; charset=utf-8",
          dataType   : "json",
          success    : function(data){
            console.log("data", data);
            //console.log(data.toObject());
            console.log("data recieved");
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
    $(".remindform:last").append('progress: <input type="text" class="progress">');
    $(".remindform:last").append("<br>");
    $(".remindform:last").append('<input type="submit" value="Submit Changes">');
    $(".remindform:last").append('<p class="lastlogin"></p>');
    $(".activity").attr('disabled', true);
    $(".progress").attr('disabled', true);
    editUpdate();
    boxSubmitUpdate();
  })

  $(".activity").attr('disabled', true);
  $(".progress").attr('disabled', true);
  $("<button>").addClass("cancel").text("cancel").prependTo("#box1");
  $(".cancel").hide();

function editUpdate() {
  $(".editremind").on("click", function(e){
    e.preventDefault();
    $(".activity").attr('disabled', false);
    $(".progress").attr('disabled', false);
    $(".editreminder").toggle();
    $(".cancel").toggle();
  })

  $(".cancel").on("click", function(){
    $(".activity").val("");
    $(".progress").val("");
    $(".activity").attr('disabled', true);
    $(".progress").attr('disabled', true);
    $(this).toggle();
    $(".editreminder").toggle();
  })
}

  function boxSubmitUpdate(){
    $( ".box").submit(function(e) {
      $(".lastlogin").text("last checkin: " + new Date().toString())
      e.preventDefault();
      var activity = $(".activity").val();
      var progress = $(".progress").val();
      $(".activity").attr('disabled', true);
      $(".progress").attr('disabled', true);
      var j = JSON.stringify({activity: activity, progress: progress });
      //console.log(j);
      $.ajax({
          type: "PUT",
          url : "/api/change_remindr",
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