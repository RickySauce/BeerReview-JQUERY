// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

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

function userShow(event, element){
  event.preventDefault();
  let section = element.dataset.section;
  let userName = element.dataset.name;
  let userId = $('[id]').data('id');
  $.get(`/users/${userId}/beers`).done( data => {
    data[`${section}`].forEach(element => {
      $(`#${section}`).append(`
        <a href="/${section}/${element["id"]}">${element["name"]}</a> <b>Rating:</b> ${element.rating}<br>
        `);
    });
    element.setAttribute('onclick', 'userHide(event, this)')
    element.innerHTML = `Hide ${userName} ${section}`
  });
};

function userHide(event, element){
  let userName = element.dataset.name;
  let section = element.dataset.section;
  event.preventDefault();
  $(`#${section}`).empty();
  element.setAttribute('onclick', 'userShow(event, this)');
  element.innerHTML = `Show ${userName} ${section}`;
};

function showReviews(event, element){
  event.preventDefault();
  let userName = element.dataset.name;
  let userId = $('[id]').data('id');
  $.get(`/users/${userId}/beers`).done( data => {
    data['reviews'].forEach(element => {
      $.get(`/beers/${element['beer_id']}`).done( beerData => {
        const beerName = beerData["name"]
      });
      debugger;
      $('#reviews').append(`
        <h4> ${beerName} </h4>
        <span>Taste: ${element['taste']}</span><span> Smell: ${element['smell']}</span> <span> Feel: ${element['feel']}</span> <span> Look: ${element['look']}</span>
        <br><br>
        <b>Overall Rating:</b><span> ${element['rating']}</span>
        <br><br>
        <b>Post:</b>
        <br><br>
        ${element['content']}
        <br><br>
        `);
    });
    element.setAttribute('onclick', 'hideReviews(event, this)')
    element.innerHTML = `Hide ${userName} reviews`
  });
};

function hideReviews(event, element){
  let userName = element.dataset.name;
  event.preventDefault();
  $('#reviews').empty();
  element.setAttribute('onclick', 'showReviews(event, this)');
  element.innerHTML = `Show ${userName} reviews`;
}
