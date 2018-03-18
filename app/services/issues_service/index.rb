# frozen_string_literal: true

module IssuesService
  module Index
    ATTRIBUTES = %i[english_title filename id rubric_id title].freeze

    def self.index
      Issue.all.select(ATTRIBUTES).to_json
    end
  end
end
