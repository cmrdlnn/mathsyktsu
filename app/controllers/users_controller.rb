# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate!, only: %i[authenticate]

  include UsersHelper

  def authenticate
    head :accepted
  end

  def login
    token = service.login(params)
    render json: { token: token }, status: :accepted
  end
end
