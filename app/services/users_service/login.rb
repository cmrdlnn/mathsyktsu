# frozen_string_literal: true

module UsersService
  class Login
    def initialize(params)
      parameters = permit_params(params)
      @email = parameters[:email].strip.downcase
      @password = parameters[:password]
    end

    def login
      user = User.find_by(email: email)
      check_user!(user)
      JsonWebToken.encode(user_id: user.id, role: user.role)
    end

    private

    attr_reader :email

    attr_reader :password

    def check_user!(user)
      return if user && user.authenticate(password)
      raise UserErrors::InvalidCredentials
    end

    def permit_params(params)
      params.require(:user).permit(:email, :password)
    end
  end
end
