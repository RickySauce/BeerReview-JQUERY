class BreweriesController < ApplicationController

  def index
    @user = User.find(params["user_id"]) if params["user_id"]
    if @user
      @breweries = @user.breweries
    else
      @breweries = Brewery.all
    end
    respond_to do |format|
      format.json {render json: @breweries}
      format.html {render :index}
    end
  end

  def show
    @brewery = Brewery.find_by(id:params["id"])
    if @brewery.nil?
      redirect_to root_path
    else
      @beers = @brewery.beers
      respond_to do |format|
        format.json {render json: @beers}
        format.html {render :show}
      end
    end
  end

end
