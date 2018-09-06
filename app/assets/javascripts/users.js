// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


function newUser(){
  $('#new_user').submit(function(event){
    event.preventDefault();
      const formData = $(this).serialize();
      posting = $.post('/users', formData);
      posting.done(data => {
      const errors = data["errors"]
      if (errors){
        for (error in errors) {
          $(`#user_${error}`).after(`ERROR(S): ${errors[error].join(', ')}`)
          }
        } else {
        $('#new_user_display').load(`/users/${data["id"]} #profile`)
        }
      });
    });
}

$(document).ready(function() {
  newUser();
});
