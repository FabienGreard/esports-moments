$(".search_submit").click(function(){
  $(".search_submit").toggleClass("submit_active");
  $(".search_input").toggleClass("input_active");
  $(".search_input").val("");
});

$(".search_input").on('change keyup copy paste cut', function() {
    if($(".search_input").val() ==  ""){
      $(".hidden").removeClass("find");
    }else{
      $(".hidden").addClass("find");
      $(".find").on( "click", function() {
        $(".hidden").removeClass("find");
        $(".search_submit").removeClass("submit_active");
        $(".search_input").removeClass("input_active");
        $(".search_input").val("");
      });
    }
});
