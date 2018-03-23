# frozen_string_literal: true

require 'json_web_token'
require 'file_helper'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  ERRORS_MAP = {
    UserErrors::InvalidCredentials => 401,
    UserErrors::NotAuthorized => 403
  }.freeze

  ERRORS_MAP.each do |(error, status)|
    rescue_from error do |exception|
      render json: { error: exception.message }, status: status
    end
  end

  protected

  def authenticate_redactor!
    user = authenticate!
    raise UserErrors::NotAuthorized if user.role != 'redactor'
  end

  def authenticate!
    UsersService.authenticate!(authorization_header)
  end

  private

  def authorization_header
    request.headers['Authorization']
  end
end
