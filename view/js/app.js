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

  this.findArray= function (arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }

  this.setShow = function(category){
    var index = this.findArray(categorys, "temp", true);
    if(index != null && index >= 4){
      this.categorys[index].showNav = false;
      this.categorys[index].temp = false;
    }
    if(category.nav > 4){
    category.showNav = true;
    category.temp = true;
    }
  }

});

var categorys = [
  { name: 'Home', nav: 1, showNav: true, temp: false },
  { name: 'Lol', nav: 2, showNav: true, temp: false },
  { name: 'Cs:Go', nav: 3, showNav: true, temp: false },
  { name: 'Contact', nav: 4, showNav: true, temp: false },
  { name: 'Dota2', nav: 5, showNav: false, temp: false },
  { name: 'Hearthstone', nav: 6, showNav: false, temp: false }
];
