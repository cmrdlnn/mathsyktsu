# frozen_string_literal: true

module RubricsService
  class Create
    def initialize(params)
      @title = prepare_title(params)
    end

    def create
      Rubric.create(title: title).to_json
    end

    private

    attr_reader :title

    def prepare_title(params)
      title = permit_params(params)[:title]
      title.strip.downcase.capitalize
    end

    def permit_params(params)
      params.permit(:title)
    end
  end
end
