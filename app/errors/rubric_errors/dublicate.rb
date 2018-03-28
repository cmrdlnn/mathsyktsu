# frozen_string_literal: true

module RubricErrors
  class Dublicate < ActiveRecord::RecordInvalid
    def initialize
      super('Рубрика с заголовком')
    end
  end
end
