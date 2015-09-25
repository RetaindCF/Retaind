var noteCount = 0;

/*<form name="myForm" id="testForm" method="POST" action="send.php">
UserName: <input type="text" name="user" value="test" /> <br/>
Password: <input type="password" name="password" value="test"/> <br/>
</form> */


function noteMake2(dborform, color) {
  var setColor = color || "yellow";
  var noteId = "note" + noteCount;
  var noteFormId = "noteform" + noteCount;
  dborform = dborform || {activity: "A new ambition...", dueDate: "set a due date"};
  $("<div>").attr("id", "note" + noteCount).addClass("box").addClass(setColor).addClass("quote-container")
  .appendTo("main");
  $("<h2>").appendTo("#noteId");
  $("<form>").addClass("activity").attr("id", "noteform" + noteCount).appendTo("#" + noteId);
  $('<input type="text">').val(dborform.ambition || "Enter Text")
  .addClass(color).addClass("activity").appendTo("#" + noteFormId);
  $('<input type="submit">').val("Submit Changes").appendTo("#" + noteFormId);
   noteCount++;
}

function noteMake(dborform, color){
  color = color || "yellow";
  dborform = dborform || {activity: "A new ambition...", dueDate: "set a due date"};
  $("<div>").attr("id", "note" + noteCount).addClass("box").addClass(color).addClass("quote-container").appendTo("main");
  $("<button>").addClass("editremind").text("edit").appendTo(".box:last");
  $("<button>").text("cancel").addClass("cancel").appendTo(".box:last").hide();
  $("<form>").addClass("remindform").attr('method', 'POST').appendTo(".box:last");
  var $remind = $(".remindform:last");
  var $input = $('<input type="text" class="activity">');
  $input.val(dborform.ambition);
  $input.appendTo($remind);
  $remind.append($input);
  $remind.append("<br>");
  $remind.append("<br>");
  $remind.append('<input type="submit" value="Submit Changes">');
  $remind.append('<p class="lastlogin"></p>');
  $(".lastlogin").text(dborform.dueDate);
  $(".activity").attr('disabled', true);
}


$(document).ready(function() {
 var usersessionToken = sessionStorage.getItem("token");
 console.log(usersessionToken);
 var token = JSON.parse(usersessionToken);
 console.log("parsed token", token);
  var dItems = [];
  var usersessionName = sessionStorage.getItem("username");
  var username = JSON.parse(usersessionName);
  //var u = JSON.stringify({token: usersessionToken});
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
      curAmbs.forEach(function(item){
        noteMake2(item, "yellow");
        boxSubmitUpdate();
      });
    }
  });

  $("<button>").addClass("newremind").text("new reminder").appendTo("body");

  $(".newremind").on("click", function() {
    noteMake2(null, "blue");
    boxSubmitUpdate();
  });
   /* $("<div>").attr("id", "note" + noteCount).addClass("box").addClass("blue").addClass("quote-container").appendTo("main");
    $("<button>").addClass("editremind").text("edit").appendTo(".box:last");
    $("<button>").text("cancel").addClass("cancel").appendTo(".box:last").hide();
    $("<form>").addClass("remindform").attr('method', 'POST').appendTo(".box:last");
    $(".remindform:last").append('activity: <input type="text" class="activity">')
    $(".remindform:last").append("<br>");
    $(".remindform:last").append("<br>");
    $(".remindform:last").append('<input type="submit" value="Submit Changes">');
    $(".remindform:last").append('<p class="lastlogin"></p>');
    $(".activity").attr('disabled', true);
    editUpdate();
    boxSubmitUpdate();
  })*/

  function boxSubmitUpdate(){
    $( ".box").submit(function(e) {
      e.preventDefault();
      var activity = $(this).find("input").val();
      console.log(activity);
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