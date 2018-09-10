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
      $('#beer_misc').html(`
        <form class="new_review" id="new_review" action="/beers/2/reviews" accept-charset="UTF-8" method="post"><input name="utf8" value="✓" type="hidden"><input name="authenticity_token" value="pPlzF9x+DuvS2O/rN7WmGY0uJDiSSswom4rUQGne1pwQf2qoA/wiJmBw9Dnt6T5vjj2TUzDj0CTGIuiNXEhlWw==" type="hidden">
          <input type="hidden" name="review[beer_id]" id="review_beer_id" value="${beerId}">
          <b>Taste:</b>
          <input step="0.1" name="review[taste]" id="review_taste" type="number">
          <br><br>
          <b>Look:</b>
          <input step="0.1" name="review[look]" id="review_look" type="number">
          <br><br>
          <b>Smell:</b>
          <input step="0.1" name="review[smell]" id="review_smell" type="number">
          <br><br>
          <b>Feel:</b>
          <input step="0.1" name="review[feel]" id="review_feel" type="number">
          <br><br>
          <br><br>
          <b>Post:</b><br>
          <textarea name="review[content]" id="review_content" cols="100" rows="20"></textarea>
          <input name="commit" value="Submit Review" class="buttons" data-disable-with="Submit Review" type="submit">
        </form>
        `)
  });
};
