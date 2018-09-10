class ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:new, :create]

  def index
    @user = User.find(params["user_id"])
    @reviews = @user.reviews
    render json: @reviews
  end

  def new
    @review = Review.new
    @beer = Beer.find(params["beer_id"])
    if Review.find_review(current_user.id, @beer.id).blank?
      render :new
    else
      redirect_to root_path
    end
  end

  def create
    @review = Review.new(review_params)
    @review.user = current_user
    if params["beer_id"]
      @beer = Beer.find(params["beer_id"])
      @review.beer = @beer
    end
    if @review.save
      @review.rating=(@review.rating)
      @review.save
      render :json => @review, status: 201
    else
       render :json => { :errors => @review.errors}
    end
  end
end



private

def review_params
   params.require(:review).permit(
     :taste,
     :look,
     :feel,
     :smell,
     :beer_id,
     :content
   )
 end
