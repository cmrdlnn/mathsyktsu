# frozen_string_literal: true

module RubricsService
  module Index
    class << self
      def index
        Rubric.all.to_json
      end
    end
  end
end
