// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

function logIn(){
  $('#log_in form').submit(function(event){
    event.preventDefault();
    const formData = $(this).serialize();
    const posting = $.post('/login', formData);
    posting.done(data => {
      if (data["errors"]){
      $('p')[0] ? $('p')[0].innerHTML = data["errors"] : $('h2').after(`<p>${data["errors"]}</p><br>`);
      $('#login_username').val(data["user"]);
    } else {
        history.pushState(`/users/${data["id"]}`)
    }
    });
  });
      $('input').last()[0].removeAttribute('data-disable-with');
};
