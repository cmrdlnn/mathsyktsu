# frozen_string_literal: true

module UsersService
  class Authenticate
    def initialize
      @credential = payload
      check_crendentials!
    end

    def authenticate!
      user = load_user
      check_user!(user)
      user
    end

    private

    attr_reader :credential

    def check_crendential!
      return if credential && JsonWebToken.valid_payload(credential.first)
      not_authorized!
    end

    def check_user!(user)
      not_authorized! unless user
    end

    def not_authorized!
      raise Errors::User::NotAuthorized
    end

    def load_user
      User.find_by(id: credential.first['user_id'])
    end

    def payload
      auth_header = request.headers['Authorization']
      token = auth_header.split(' ').last
      JsonWebToken.decode(token)
    end
  end
end
