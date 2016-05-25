var app = angular.module("moments",[]);

app.controller("headerController", function(){
  this.nav = 1;
  this.categorys = categorys;
  this.tab = "Home";

  this.isSet = function(checkNav) {
    return this.nav === checkNav;
  };

  this.setNav = function(setNav) {
    this.nav = setNav;
  };
  this.getTab = function() {
    return this.tab;
  };

  this.setTab = function(setTab) {
    this.tab = setTab;
  };

});

var categorys = [
  { name: 'Home', nav: 1 },
  { name: 'Lol', nav: 2 },
  { name: 'Cs:Go', nav: 3 },
  { name: 'Contact', nav: 4 },
];
