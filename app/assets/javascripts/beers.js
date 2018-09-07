// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
let beerIds = 25


function hideBeers(){
  $('li').slice(25).each(function(index,value){
    $(value).hide()
  });
}

function next25(){
  $('li').slice(beerIds, beerIds += 25).each(function(index,value){
    $(value).show()
  })
}

function showAll(){
  $('li').show()
}
