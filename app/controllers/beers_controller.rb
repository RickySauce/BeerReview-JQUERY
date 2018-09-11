class BeersController < ApplicationController

  def index
    @user = User.find(params["user_id"]) if params["user_id"]
    if @user
      @beers = @user.beers
    else
      @beers = Beer.all
    end
    respond_to do |format|
      format.json {render json: @beers}
      format.html {render :index}
    end
  end

  def show
    @beer = Beer.find(params["id"])
    respond_to do |format|
      format.json {render json: @beer}
      format.html {render :show}
    end
  end

end
