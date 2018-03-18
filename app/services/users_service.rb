# frozen_string_literal: true

module UsersService
  def self.sign_in(params)
    SignIn.new(params).sign_in
  end
end
