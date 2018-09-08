// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
let beerIds = 25
let userId = null

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

function beerOptions(element){
  userId = $('[data-user_id]').data("user_id")
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
  let beerId = element.dataset.id
  $.get(`/users/beers/${beerId}`).done(data => {
    $('#review').replaceWith(`
      <div class="">
        <span>Taste: ${data["taste"]} </span>Smell: ${data["smell"]} <span>Look: ${data["look"]} </span>
        <span>Feel: ${data["feel"]} </span> <span>Overall: ${data["rating"]}</span>
        <p>${data["content"]}</p>
      </div>
      `)
  }).error(error => {
      debugger;
      $('#beer_misc').load(`/beers/${beerId}/reviews/new #review_form`).data('beer_id', `${beerId}`)
  });
};
