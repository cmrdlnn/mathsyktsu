# encoding: utf-8

require 'json_web_token'
require 'file_helper'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  protected

  def authenticate_redactor!
    authenticate!
    invalid_authentication if @current_user.role != 'redactor'
  end

  def authenticate_editorial!
    authenticate!
    invalid_authentication if @current_user.role != 'editorial_board'
  end

  def authenticate!
    if !payload || !JsonWebToken.valid_payload(payload.first)
      return invalid_authentication
    end
    load_current_user!
    invalid_authentication if @current_user.nil?
  end

  def invalid_authentication
    render json: { error: 'Invalid Request' }, status: :unauthorized
  end

  private

  def payload
    auth_header = request.headers['Authorization']
    token = auth_header.split(' ').last
    JsonWebToken.decode(token)
  rescue
    nil
  end

  def load_current_user!
    @current_user = User.find_by(id: payload[0]['user_id'])
  end
end
