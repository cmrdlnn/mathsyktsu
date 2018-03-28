# frozen_string_literal: true

module UsersService
  def self.authenticate!(*args)
    Authenticate.new(*args).authenticate!
  end

  def self.login(params)
    Login.new(params).login
  end
end
