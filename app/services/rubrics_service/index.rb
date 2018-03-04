# encoding: utf-8

module RubricsService
  module Index
    def self.index
      Rubric.all.to_json
    end
  end
end
