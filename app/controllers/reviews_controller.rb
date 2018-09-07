class ReviewsController < ApplicationController

  def new
    @review = Review.new
    @beer = Beer.find(params["beer_id"])
  end

  def create
    @review = Review.new(review_params)
    @review.user = current_user
    @review.beer_id = params["beer_id"]
    binding.pry
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
