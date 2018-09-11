// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

function newUser(){
  $('#new_user').submit(function(event){
      event.preventDefault();
      $('span').text("")
      const formData = $(this).serialize();
      const posting = $.post('/users', formData);
      posting.done(data => {
      const errors = data["errors"]
      if (errors){
        for (error in errors) {
          $(`#${error}_errors`).text(`ERROR(S): ${errors[error].join(', ')}`);
        };
        } else {
        history.pushState(`/users/${data["id"]}`)
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
    debugger;
    data[`${section}`].forEach(element => {
      $(`#${section}`).append(`
        <a href="/${section}/${element["id"]}">${element["name"]}</a> <b>Rating:</b> ${element.rating}<br>
        `);
    });
    element.setAttribute('onclick', 'userHide(event, this)')
    element.innerHTML = `Hide ${userName}'s ${section}`
  });
};

function userHide(event, element){
  let userName = element.dataset.name;
  let section = element.dataset.section;
  event.preventDefault();
  $(`#${section}`).empty();
  element.setAttribute('onclick', 'userShow(event, this)');
  element.innerHTML = `Show ${userName}'s ${section}`;
};

function showReviews(event, element){
  event.preventDefault();
  let userName = element.dataset.name;
  let userId = $('[id]').data('id');
  $.get(`/users/${userId}/reviews`).done( data => {
    data.forEach(element => {
      $('#reviews').append(`
        <h4> ${element["beer"]["name"]} </h4>
        <span>Taste: ${element['taste']}</span><span> Smell: ${element['smell']}</span> <span> Feel: ${element['feel']}</span> <span> Look: ${element['look']}</span>
        <br><br>
        <b>Overall Rating:</b><span> ${element['rating']}</span>
        <br><br>
        <b>Post:</b>
        <br><br>
        ${element['content'] == false ? 'No Content' : element['content']}
        <br><br>
        `);
    });
    element.setAttribute('onclick', 'hideReviews(event, this)')
    element.innerHTML = `Hide ${userName}'s reviews`
  });
};

function hideReviews(event, element){
  let userName = element.dataset.name;
  event.preventDefault();
  $('#reviews').empty();
  element.setAttribute('onclick', 'showReviews(event, this)');
  element.innerHTML = `Show ${userName}'s reviews`;
}

function search(){
  $('#search').submit(function(event){
    event.preventDefault()
    const beerName = $('input').val();
    $('#search_results').html('Please wait one moment...')
    $.get('/beers', beerName).done(data => {
     const beer = data.find(function(element){ return element["name"] === beerName})
     debugger;
     if (!beer == false){
       $('#search_results').html(`
         Beer Found! <br>
         <a href="/beers/${beer.id}/reviews/new">Write a review here!</a>
         `)
     } else {
       $('#search_results').html('Beer not found. Please check your spelling, or enter a new name.')
     }
   });
  });
};
