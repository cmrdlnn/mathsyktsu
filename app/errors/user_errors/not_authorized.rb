# frozen_string_literal: true

module UserErrors
  # Класс ошибки, возникающей при использовании просроченного токена
  # авторизации или его отсутствия при обращении на роут, требующий
  # авторизованного запроса
  #
  class NotAuthorized < StandardError
    def initialize
      super('Необходима авторизация')
    end
  end
end
