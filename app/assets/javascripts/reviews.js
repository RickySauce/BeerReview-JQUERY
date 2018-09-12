// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
class Review {
  constructor(args){
    this.feel = args.feel;
    this.taste = args.taste;
    this.smell = args.smell;
    this.look = args.look;
    this.id = args.id;
    this.user_id = args.user.id;
    this.user_name = args.user.username;
    this.beer_id = args.beer.id;
    this.beer_name = args.beer.name;
    this.content = args.content || "No content available";
  }

  rating(){
    return (this.feel + this.taste + this.smell + this.look)/4
  }

   html(query){
    $(`#${query}`).html(`
      <div class="">
        <span>Taste: ${this.taste} </span>Smell: ${this.smell} <span>Look: ${this.look} </span>
        <span>Feel: ${this.feel} </span> <span>Overall: ${this.rating()}</span>
        <p>${this.content}</p>
      </div>
      `)
  }

  appendDom(query){
      $(`#${query}`).append(`
        <h4> ${this.beer_name} </h4>
        <span>Taste: ${this.taste} </span>Smell: ${this.smell} <span>Look: ${this.look} </span> <span>Feel: ${this.feel} </span>
        <br><br>
        <b>Overall Rating:</b><span>Overall: ${this.rating()}</span>
        <br><br>
        <b>Post:</b>
        <br><br>
        ${this.content}
        <br><br>
        <a href="/users/${this.user_id}/reviews/${this.is}">Edit or Delete this Review here</a>
        `);
  }
}

// $('#review').replaceWith(`
  // <div class="">
  //   <span>Taste: ${data["taste"]} </span>Smell: ${data["smell"]} <span>Look: ${data["look"]} </span>
  //   <span>Feel: ${data["feel"]} </span> <span>Overall: ${data["rating"]}</span>
  //   <p>${data["content"]}</p>
  // </div>
//   `)

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
