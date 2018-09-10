// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

function newReview(beerId){
  $('#new_review').submit(function(event){
    event.preventDefault();
    const formData = $(this).serialize();
    // const beerId = $('#beer_misc').data('beer_id')
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
            $('#review').replaceWith(`
              <div class="">
                <span>Taste: ${data["taste"]} </span>Smell: ${data["smell"]} <span>Look: ${data["look"]} </span>
                <span>Feel: ${data["feel"]} </span> <span>Overall: ${data["rating"]}</span>
                <p>${data["content"]}</p>
              </div>
              `)
        }
      });
    });
      $('form input').last().removeAttr('data-disable-with')
};

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
