# frozen_string_literal: true

module RubricsService
  class Update
    def initialize(params)
      parameters = permit_params(params)
      @id = parameters[:id]
      @data = parameters[:rubric]
    end

    def update
      rubric.update!(data).to_json
    rescue ActiveRecord::RecordInvalid
      dublicate!
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
      params.permit(:id, rubric: :title)
    end
  end
end
