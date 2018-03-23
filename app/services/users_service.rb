# frozen_string_literal: true

module UsersService
  def self.authenticate!(authorization_header)
    Authenticate.new(authorization_header).authenticate!
  end

  def self.login(params)
    Login.new(params).login
  end
end
