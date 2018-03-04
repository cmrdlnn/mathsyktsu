# encoding: utf-8

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
      params.require(:rubric).permit(:title)
    end
  end
end
