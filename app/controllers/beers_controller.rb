class BeersController < ApplicationController

  def index
    @beers = Beer.all
    @user = User.find(params["user_id"]) if params["user_id"]
    respond_to do |format|
      format.json {render json: @beers}
      format.html {render :index}
    end
    if @user
      render json: @user
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
