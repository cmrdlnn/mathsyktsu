# frozen_string_literal: true

module UserErrors
  # Класс ошибки, возникающей при получении неверных данных пользователя при
  # аутентификации
  #
  class InvalidCredentials < ArgumentError
    def initialize
      super('По данным логину и паролю пользователь не найден')
    end
  end
end
