class SessionsController < ApplicationController
  before_action :already_logged_in, only: [:new, :create]

  def new
  end

  def create
    @message = nil
    @user = User.find_by(username: params["login"]["username"])
    if !@user
      @message = "Username does not exist"
      render :json => { :errors => @message}
    else
      if !@user.authenticate(params["login"]["password"])
          @message = "Incorrect Password"
          render :json => {:user => @user.username, :errors => @message}
      else
        session[:user_id] = @user.id
        render :json => @user
      end
    end
  end

  def destroy
    session.delete(:user_id)
    flash[:message] = "Successfully Logged out!"
    redirect_to root_path
  end

end
