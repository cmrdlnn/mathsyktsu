# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    respond_to :json
    @user = User.new(user_params)
    if @user.save
      UserMailer.registration_confirmation(@user).deliver
      head :created
    else
      errors = if @user.errors.full_messages.size == 2
                 3
               elsif @user.errors.full_messages[0].include? 'Email'
                 1
               elsif @user.errors.full_messages[0].include? 'Full name'
                 2
               else
                 0
               end
      render json: errors
    end
  end

  def login
    auth_token = service.sign_in(params)
    render json: { auth_token: auth_token }, status: :accepted
  end

  def check
    authenticate!
    head :ok if @current_user
  end

  def change_email
    authenticate_request!
    if @current_user.change_email(params[:user][:email]).nil?
      head :conflict
    else
      head :ok
    end
  end

  def change_password
    authenticate_request!
    @current_user.change_password(params[:user][:password])
    head :ok
  end

  def user_search
    authenticate_request!
    render json: @current_user.search(params[:user][:like])
  end

  def delete_user
    authenticate_redactor_request!
    @current_user.delete_user(params[:user][:email])
    head :no_content
  end

  def create_editorial
    authenticate_redactor_request!
    result = @current_user.create_editorial(create_user_params)
    if result == 3
      head :created
    elsif result == 2
      render json: { error: 0 }, status: :conflict
    else
      render json: { error: 1 }, status: :conflict
    end
  end

  private

  def create_user_params
    params.require(:user)
          .permit(:email, :full_name)
          .merge(password: 'asdasd', role: 'editorial_board')
  end

  def user_params
    params.require(:user)
          .permit(:full_name, :email, :password)
          .merge(role: 'autor')
  end
end
