class BeersController < ApplicationController

  def index
    @beers = Beer.all
  end

  def show
    binding.pry
  end

end
