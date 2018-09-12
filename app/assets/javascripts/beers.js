// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
let Ids = 25
let userId = null

function hide(){
  $('li').slice(25).each(function(index,value){
    $(value).hide()
  });
}

function next25(){
  $('li').slice(Ids, Ids += 25).each(function(index,value){
    $(value).show()
  })
}

function showAll(){
  $('li').show()
}

function beerOptions(element){
  const beerId = element.dataset.id
  const beerName = element.dataset.name
  const breweryId = element.dataset.brewery_id
  userId = $('[data-user_id]').data("user_id")
  $('#options').remove()
  $(element).append(`
    <div id="options">
      <div id="review"></div>
      <button type="button" name="button" id="review_button">Review</button>
      <button type="button" name="button" id="beer_profile">Load beer profile</button>
      <button type="button" name="button" id="brewery_profile">Load brewery profile</button>
    </div>
    `)
    $('#review_button').click(() => review(beerId, beerName))
    $('#beer_profile').click(() => beerProfile(beerId))
    $('#brewery_profile').click(() => breweryProfile(breweryId))
}

function breweryProfile(breweryId){
  $('#beer_misc').load(`/breweries/${breweryId} #brewery_profile`)
}
function beerProfile(beerId){
  $('#beer_misc').load(`/beers/${beerId} #beer_profile`, function(){
    $('#review_link').attr('hidden', 'hidden')
  });
}

function newBeerReview(beerId){
  $('#new_review').submit(function(event){
    event.preventDefault();
    $('span').text("")
    const formData = $(this).serialize();
    const posting = $.post(`/beers/${beerId}/reviews`, formData);
    posting.done(data => {
      const errors = data["errors"]
      if (errors){
        for (error in errors) {
          $(`#${error}_errors`).text(`ERROR(S): ${errors[error].join(', ')}`);
        };
        } else {
          $('#beer_misc').html(`
            <p>Review Submitted!</p>
            `)
            let review = new Review(data)
            review.html('review')
        }
      });
    });
};

// function editReview(reviewId){
//   $.get('/')
// }

function review(beerId, beerName){
  $.get(`/users/beers/${beerId}`).done(data => {
    let review = new Review(data)
    review.html('review')
      $('#review_button').replaceWith(`<button onclick="location.href='/users/${review.user_id}/reviews/${review.id}'">Edit or Delete this Review here</button>`)
      // $('#edit_review').click(() => editReview(reviewId))
  }).error(error => {
    if (userId == false) {
      $('#beer_misc').html(`
        Not signed in! Log in <a href="/login">here</a>, or sign up <a href="/users/new">here</a>
        `);
    } else {
      $('#beer_misc').html(`
        <h3>${beerName}</h3>
        <form class="new_review" id="new_review" action="/beers/${beerId}/reviews" accept-charset="UTF-8" method="post"><input name="utf8" value="✓" type="hidden"><input name="authenticity_token" value="pPlzF9x+DuvS2O/rN7WmGY0uJDiSSswom4rUQGne1pwQf2qoA/wiJmBw9Dnt6T5vjj2TUzDj0CTGIuiNXEhlWw==" type="hidden">
          <input type="hidden" name="review[beer_id]" id="review_beer_id" value="${beerId}">
          <b>Taste:</b>
          <input step="0.1" name="review[taste]" id="review_taste" type="number"> <span id="taste_errors"></span>
          <br><br>
          <b>Look:</b>
          <input step="0.1" name="review[look]" id="review_look" type="number"> <span id="look_errors"></span>
          <br><br>
          <b>Smell:</b>
          <input step="0.1" name="review[smell]" id="review_smell" type="number"> <span id="smell_errors"></span>
          <br><br>
          <b>Feel:</b>
          <input step="0.1" name="review[feel]" id="review_feel" type="number"> <span id="feel_errors"></span>
          <br><br>
          <br><br>
          <b>Post:</b><br>
          <textarea name="review[content]" id="review_content" cols="100" rows="20"></textarea>
          <input name="commit" value="Submit Review" class="buttons" type="submit">
        </form>
        `)
        newBeerReview(beerId)
      };
  });
};
