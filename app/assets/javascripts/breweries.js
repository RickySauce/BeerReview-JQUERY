function showBeers(){
  $('li a.brewery_link').click(function(event){
      event.preventDefault()
      const id = this.dataset.id
      const name = this.dataset.name
      $('#brewery_misc').empty()
      $.get(`/breweries/${id}`).done(data => {
        $('#brewery_misc').append(`<h3>${name}'s beer list</h3>`)
        data.forEach(element => {
          $('#brewery_misc').append(`
            <a href="" class="beer_link" data-beer_id="${element["id"]}">${element["name"]}</a><br>
            <div id="profile-${element["id"]}" class="beer_profile">

            </div>
            `);
        });
        showBeer()
        $('#brewery_misc').append(`<br><button type="button" name="button" onclick="location.href = '/breweries/${id}';">Brewery home page</button>`)
      });
  });
};

function showBeer(){
  $('.beer_link').click(function(event){
    $('.beer_profile').empty()
    event.preventDefault()
    const beerId = this.dataset.beer_id
    $(`#profile-${beerId}`).load(`/beers/${beerId} #beer_profile`)
  })
}
