class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username], 
      params[:user][:password]
    )
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ['Invalid credential!'], status: 401
    end
  end



  def destroy
    @user = current_user
    if @user
      logout
      render 'api/users/show'
      # REDIRECT user to somewhere?
    else
      render json: ["User not log in or already sign out"], status: 404
    end
  end



end
