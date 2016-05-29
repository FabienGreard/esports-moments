var app = angular.module('contact', []);
app.directive("contact", function(currentTab, $window){
  return{
    restrict: "E",
    templateUrl: "contact.html",
    controller: function(){
      this.getBestOfTitle = function(){
        if(currentTab.getTab() == "Contact"){
          return true;
        }else{
          return false;
        }
        };
        this.sendMail = function(subject,message){
            $window.open("mailto:grd.fabien@gmail.com?subject="+subject+"&body="+message,"_self");
        };

      },
      controllerAs: "contact"
  };
});
