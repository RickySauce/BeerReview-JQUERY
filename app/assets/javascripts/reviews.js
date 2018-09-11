// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

function newReview(){
  $('#new_review').submit(function(event){
      const beerId = $('#review_form').data('id')
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
        $('#new_review').load(`/beers/${beerId}/reviews/${data["id"]} #review_page`)
        }
      });
    });
    $('input').last()[0].removeAttribute('data-disable-with');
}


// function newReview(event){
//   event.preventDefault;
//   const formData = $('form').serialize();
//   const beerId = $('#beer_misc').data('beer_id')
//   const posting = $.post(`/beers/${beerId}/reviews/new`, formData);
//   posting.done(data => {
//     debugger;
//     if (errors){
//       for (error in errors) {
//         $(`#${error}_errors`).text(`ERROR(S): ${errors[error].join(', ')}`);
//       };
//       } else {
//         debugger;
//       }
//   });
//     $('form input').last().removeAttr('data-disable-with')
// };
