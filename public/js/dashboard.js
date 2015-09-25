var noteCount = 0;
var remtime = "day";
var userData;
function noteMake2(dborform, color) {
  var setColor = color || "yellow";
  var noteId = "note" + noteCount;
  var noteFormId = "noteform" + noteCount;
  dborform = dborform || {};
  $("<div>").attr("id", "note" + noteCount).addClass("box").addClass(setColor).addClass("quote-container")
  .appendTo("main");

  $("<h5>").text("Aspiration").appendTo("#" + noteId);
  $("<form>").addClass("activity").attr("id", "noteform" + noteCount).appendTo("#" + noteId);
  $('<input type="text">').val(dborform.ambition || "Enter Text")
  .addClass(color).addClass("activity").appendTo("#" + noteFormId);

  $('<input type="submit">').val("Submit Changes").appendTo("#" + noteFormId);
  $("<button>").text("day").appendTo("#" + noteFormId).addClass("remtime");
  $("<button>").text("week").appendTo("#" + noteFormId).addClass("remtime");
  $("<button>").text("month").appendTo("#" + noteFormId).addClass("remtime");
  $(".remtime").on("click", function(e){
    e.preventDefault();
    remtime = $(this).text();
  });
   noteCount++;
}

function boxSubmitUpdate(){
  $( ".box").submit(function(e) {
    e.preventDefault();
    var activity = $(this).find("input").val();
    $(this).find("h5").text(activity);
    var token = JSON.parse(localStorage.getItem("token")).token;
    username = JSON.parse(localStorage.getItem("username"));
    var j = JSON.stringify({username: username, token: token, ambitions: activity, dueDate: remtime});
    $.ajax({
        type: "POST",
        url : "/api/ambition",
        data: j,
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(data){
          userData = data;
        }
    });
  });
}