// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
let beerId = 25

function hideBeers(){
  $('li').slice(25).each(function(index,value){
    $(value).hide()
  });
}

function next25(){
  $('li').slice(beerId, beerId += 25).each(function(index,value){
    $(value).show()
  })
}

function showAll(){
  $('li').show()
}

function beerOptions(element){
  $('#options').remove()
  $(element).append(`
    <div id="options">
      <button type="button" name="button" id="review">Review</button>
      <button type="button" name="button">Go to profile</button>
      <button type="button" name="button">Go to brewery profile</button>
    </div>
    `)
    $('#review').click(() => review(element))
}

function review(element){
  console.log(element)
}
