# frozen_string_literal: true

module RubricsService
  class Update
    def initialize(params)
      parameters = permit_params(params)
      @id = parameters[:id]
      @data = parameters.except(:id)
    end

    def update
      dublicate! unless rubric.update!(data)
      rubric.to_json
    end

    private

    attr_reader :id, :data

    def dublicate!
      raise RubricErrors::Dublicate
    end

    def rubric
      Rubric.find(id)
    end

    def permit_params(params)
      params.permit(:id, :title)
    end
  end
end
