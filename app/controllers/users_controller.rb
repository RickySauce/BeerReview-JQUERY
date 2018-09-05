class UsersController < ApplicationController
  before_action :already_logged_in, only: [:new, :create]
end
