# frozen_string_literal: true

module UserErrors
  # Класс ошибки, возникающей при получении неверных данных пользователя при
  # аутентификации
  #
  class InvalidCredentials < ArgumentError
    def initialize
      super('Неверный e-mail или пароль')
    end
  end
end
