# frozen_string_literal: true

module RubricsService
  class Create
    def initialize(params)
      @attributes = permit_params(params)
    end

    def create
      Rubric.create(attributes).to_json
    end

    private

    attr_reader :attributes

    def permit_params(params)
      params.permit(:title)
    end
  end
end
