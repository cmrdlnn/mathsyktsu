# frozen_string_literal: true

module UsersService
  class SignIn
    def initialize(params)
      parameters = permit_params(params)
      @email = parameters[:email].strip.downcase
      @password = parameters[:password]
    end

    def sign_in
      user = User.find_by(email: email)
      check_login!(user)
      check_password!(user)
      JsonWebToken.encode(user_id: user.id, role: user.role)
    end

    private

    attr_reader :email

    attr_reader :password

    def check_login!(user)
      raise Errors::User::InvalidLogin unless user
    end

    def check_password!(user)
      raise Errors::User::InvalidPassword unless user.authenticate(password)
    end

    def permit_params(params)
      params.require(:user).permit(:email, :password)
    end
  end
end
