# frozen_string_literal: true

module IssuesService
  class Create
    ATTRS = %i[title english_title rubric_id].freeze

    def initialize(params)
      @attributes = permit_params(params)
    end

    def create
      Issue.create!(attributes).to_json
    end

    private

    attr_reader :attributes

    def permit_params(params)
      params.require(:issue).permit(*ATTRS)
    end
  end
end
