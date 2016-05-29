var app = angular.module("moments",['contact']);

app.service("currentTab", function(){
    var currentTab = "Home";
    this.setTab = function(tab){
        this.currentTab = tab;
    };
    this.getTab = function(){
      return this.currentTab;
    };
});

app.service("youtube", function(){

  var tag = document.createElement('script');
  var player;

  tag.src = "http://www.youtube.com/iframe_api";

  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  this.onYouTubeIframeAPIReady = function(link, playerId) {
    this.player = new YT.Player('player_'+playerId, {
      width: '300',
      videoId: link,
      playerVars: { 'autoplay': 0, 'controls': 2 }
    });
  };

  this.newTab = function(){
    for(var i = 1; i < 4; i++){
      var elements = document.getElementsByClassName('rank_'+i+'_content');
      var reference = document.getElementsByClassName('rank_'+i+'_h1');
      var parent = elements[0].parentNode;
      elements[0].parentNode.removeChild(elements[0]);
      var div = document.createElement("div");
      div.className = 'rank_'+i+'_content';
      div.id ='player_'+i;
      div.innerHTML ='{{ bestof.getBestOfContent('+i+') }}';
      reference[0].parentNode.insertBefore(div, reference[0].nextSibling);
    }
  };


});

app.controller("headerController", function(currentTab, youtube){
  this.nav = 1;
  this.categorys = categorys;
  this.tab = "Home";
  currentTab.setTab(this.tab);

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
    youtube.newTab();
    currentTab.setTab(setTab);
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



app.directive("bestOf", function(currentTab, $sce, youtube){
    return{
      restrict: 'E',
      templateUrl: 'bestof.html',
      controller: function(){
        this.moments = moments;

        this.findArray = function (arraytosearch, key, valuetosearch) {
          var tabArray = "";
          for (var i = 0; i < arraytosearch.length; i++) {
            if (arraytosearch[i][key] == valuetosearch) {
              tabArray += i;
            }
          }
          return tabArray = (typeof tabArray != 'undefined') ? tabArray.split("") : null;
        };

        this.getBestOfTitle = function(){
          if(currentTab.getTab() == "Home" || currentTab.getTab() == "Contact"){
            return false;
          }else{
            return "Top moments !"
          }
        };

        this.getBestOfName = function(nbBestOf){
          if(this.getBestOfTitle() != false){
          var tabMoments = this.findArray(moments,"category", currentTab.getTab());
          var temp, upvote, downvote, rslt;
          var rsltF = 0;
          for (var j = 0; j < nbBestOf; j++) {
          for (var i = 0; i < tabMoments.length; i++) {
            upvote = moments[tabMoments[i]]["upvote"];
            downvote = moments[tabMoments[i]]["downvote"];
            rslt = upvote - downvote;
            if(temp <= rslt || i == 0){
              temp = rslt;
              rsltF = tabMoments[i];
            }
          }
          tabMoments.splice(j, 1);
          }
          return moments[rsltF]["name"];
          }
        };

        this.getBestOfContent = function(nbBestOf){
          if(this.getBestOfTitle() != false){
            var index = this.findArray(moments,"name", this.getBestOfName(nbBestOf));
            $('#player_1').children().remove();
            youtube.onYouTubeIframeAPIReady(moments[index]["link"],nbBestOf);
          }
        };
      },
      controllerAs: "bestof"
    };
});

var categorys = [
  { name: 'Home', nav: 1, showNav: true, temp: false },
  { name: 'League of legends', nav: 2, showNav: true, temp: false },
  { name: 'Cs:Go', nav: 3, showNav: true, temp: false },
  { name: 'Contact', nav: 4, showNav: true, temp: false },
  { name: 'Dota2', nav: 5, showNav: false, temp: false },
  { name: 'Hearthstone', nav: 6, showNav: false, temp: false }
];

var moments = [
  { name: 'World cup 2016 fnatic vs Dignitas', upvote: '55', downvote: '36', category: 'League of legends', link: 'HE44Ie99so8' },
  { name: 'World cup 2016 fnatic vs teamEmpire', upvote: '67', downvote: '14', category: 'Dota2', link: 'i_C-I2wo1EA' },
  { name: 'World cup 2016 mistigri vs mistichat', upvote: '85', downvote: '32', category: 'Hearthstone', link: 'PgUhyWeomuU' },
  { name: 'World cup 2013 TSM vs G2', upvote: '25', downvote: '54', category: 'League of legends', link: 'Ebj4L3lJ8u4' },
  { name: 'World cup 2014 Faker vs 9', upvote: '12', downvote: '26', category: 'League of legends', link: 'n52Uw4NdhXo' },
  { name: 'CS:GO fnatic vs vitality', upvote: '20', downvote: '90', category: 'Cs:Go', link: 'tAVRqUTJZAY' }
];
