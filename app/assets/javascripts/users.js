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
        window.location = `/users/${data["id"]}`
        }
      });
    });
    $('input').last()[0].removeAttribute('data-disable-with');
}

function userShowBreweries(event, element){
  event.preventDefault();
  let userName = element.dataset.name;
  let userId = $('[id]').data('id');
  $.get(`/users/${userId}/breweries`).done( data => {
    data.forEach(element => {
      $(`#breweries`).append(`
        <a href="/breweries/${element["id"]}">${element["name"]}</a> <b>Rating:</b> ${element.rating}<br>
        `);
    });
    element.setAttribute('onclick', 'userHideBreweries(event, this)')
    element.innerHTML = `Hide ${userName}'s breweries`
  });
};

function userHideBreweries(event, element){
  let userName = element.dataset.name;
  event.preventDefault();
  $(`#breweries`).empty();
  element.setAttribute('onclick', 'userShowBreweries(event, this)');
  element.innerHTML = `Show ${userName}'s breweries`;
};

function userShowBeers(event, element){
  event.preventDefault();
  let userName = element.dataset.name;
  let userId = $('[id]').data('id');
  $.get(`/users/${userId}/beers`).done( data => {
    data.forEach(element => {
      $(`#beers`).append(`
        <a href="/beers/${element["id"]}">${element["name"]}</a> <b>Rating:</b> ${element.rating}<br>
        `);
    });
    element.setAttribute('onclick', 'userHideBeer(event, this)')
    element.innerHTML = `Hide ${userName}'s beers`
  });
};

function userHideBeers(event, element){
  let userName = element.dataset.name;
  event.preventDefault();
  $(`#beers`).empty();
  element.setAttribute('onclick', 'userShowBeers(event, this)');
  element.innerHTML = `Show ${userName}'s beers`;
};

function showReviews(event, element){
  event.preventDefault();
  let userName = element.dataset.name;
  let userId = $('[id]').data('id');
  $.get(`/users/${userId}/reviews`).done( data => {
    data.forEach(element => {
      let review = new Review(element)
      review.appendDom('reviews')
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

function removeNav(){
  $('.topnav').remove()
}
