// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

function newReview(){
  $('form').submit(function(event){
    event.preventDefault();
    const formData = $(this).serialize();
    const beerId = $('#beer_misc').data('beer_id')
    const posting = $.post(`/beers/${beerId}/reviews/new`, formData);
    posting.done(data => {
      if (errors){
        for (error in errors) {
          $(`#${error}_errors`).text(`ERROR(S): ${errors[error].join(', ')}`);
        };
        } else {
          debugger;
        }
    });
  });
      $('form input').last().removeAttr('data-disable-with')
};