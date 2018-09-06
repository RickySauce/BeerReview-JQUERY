class UsersController < ApplicationController
  before_action :already_logged_in, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render :json => @user, status: 201
   else
     render :json => { :errors => @user.errors}
   end
  end

  def show
    @user = User.find(params[:id])
  end


private

  def user_params
     params.require(:user).permit(
       :username,
       :email,
       :password,
       :password_confirmation,
     )
   end
end
