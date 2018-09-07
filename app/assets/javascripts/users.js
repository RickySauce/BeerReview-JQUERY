// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

// $('input').last()[0].disabled = false
function newUser(){
  $('#new_user').submit(function(event){
      $('span').text("")
      event.preventDefault();
      const formData = $(this).serialize();
      const posting = $.post('/users', formData);
      posting.done(data => {
      const errors = data["errors"]
      if (errors){
        for (error in errors) {
          $(`#${error}_errors`).text(`ERROR(S): ${errors[error].join(', ')}`);
        };
        } else {
        $('#new_user_display').load(`/users/${data["id"]} #profile`)
        }
      });
    });
    $('input').last()[0].removeAttribute('data-disable-with');
}

$(document).ready(function() {
  newUser();
});
