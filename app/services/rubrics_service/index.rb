# frozen_string_literal: true

module RubricsService
  module Index
    def self.index
      Rubric.all.to_json
    end
  end
end
