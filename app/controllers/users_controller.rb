class UsersController < ApplicationController
  before_action :already_logged_in, only: [:new, :create]

  def new
    @user = User.new
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
