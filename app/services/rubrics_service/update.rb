# frozen_string_literal: true

module RubricsService
  class Update
    def initialize(params)
      parameters = permit_params(params)
      @id = parameters[:id]
      @title = parameters[:title]
    end

    def update
      rubric.update(title).to_json
    end

    private

    attr_reader :id

    attr_reader :title

    def rubric
      Rubric.find(id)
    end

    def permit_params(params)
      params.require(:rubric).permit(:id, :title)
    end
  end
end
