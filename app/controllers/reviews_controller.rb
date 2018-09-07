class ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:new, :create]

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
    @review.beer_id = params["beer_id"]
    @review.rating=(@review.rating)
    if @review.save
      redirect_to user_review_path(current_user, @review)
    else
      render :new
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
