class UsersController < ApplicationController
  before_action :already_logged_in, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      render :json => @user, status: 201
   else
     render :json => { :errors => @user.errors}
   end
  end

  def show
    @user = User.find(params[:id])
  end

    def review_exists
    @review = Review.find_review(current_user.id, params["id"]).first
    if @review.blank?
      render json: @review, status: 403
    else
      render json: @review, status: 200
    end
    # respond_to do |format|
    #   format.html {redirect_to root_path}
    # end
  end


private

  def user_params
     params.require(:user).permit(
       :username,
       :email,
       :password,
       :password_confirmation
     )
   end
end
