class BeersController < ApplicationController

  def index
    @beers = Beer.all
  end

  def show
    @beer = Beer.find(params["id"])
  end

end

# Brewery.create(
#   name: "stupid",
#   location: "crap"
# )

# Beer.create(
#   name: "help me god",
#   abv:  4.2,
#   brewery_id: 1
# )

    # t.string "name"
    # t.string "description"
    # t.string "style"
    # t.integer "ibu"
    # t.float "abv"
    # t.float "rating"
    # t.integer "brewery_id"
