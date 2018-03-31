# frozen_string_literal: true

module UsersService
  class Authenticate
    def initialize(authorization_header, role = nil)
      @credentials = payload(authorization_header)
      @role = role
      check_crendentials!
    end

    def authenticate!
      user = load_user
      check_user!(user)
      check_role!(user) if role
    end

    private

    attr_reader :credentials, :role

    def check_crendentials!
      return if credentials && JsonWebToken.valid_payload(credentials.first)
      not_authorized!
    end

    def check_user!(user)
      return if user && token_is_actual?(user)
      not_authorized!
    end

    def check_role!(user)
      not_authorized! unless user.role == role
    end

    def not_authorized!
      raise UserErrors::NotAuthorized
    end

    def token_is_actual?(user)
      user.updated_at.utc < Time.at(credentials.first['created_at']).utc
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
