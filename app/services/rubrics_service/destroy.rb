# frozen_string_literal: true

module RubricsService
  class Destroy
    def initialize(params)
      @id = permit_params(params)[:id]
    end

    def destroy
      Rubric.destroy(id)
    end

    private

    attr_reader :id

    def permit_params(params)
      params.permit(:id)
    end
  end
end
