# frozen_string_literal: true

module UsersService
  class Authenticate
    def initialize(authorization_header)
      @credentials = payload(authorization_header)
      check_crendentials!
    end

    def authenticate!
      user = load_user
      check_user!(user)
      user
    end

    private

    attr_reader :credentials

    def check_crendentials!
      return if credentials && JsonWebToken.valid_payload(credentials.first)
      not_authorized!
    end

    def check_user!(user)
      not_authorized! unless user
    end

    def not_authorized!
      raise UserErrors::NotAuthorized
    end

    def load_user
      User.find_by(id: credentials.first['user_id'])
    end

    def payload(authorization_header)
      return unless authorization_header
      token = authorization_header.split(' ').last
      JsonWebToken.decode(token)
    end
  end
end
