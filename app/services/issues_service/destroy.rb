# frozen_string_literal: true

module IssuesService
  class Destroy
    def initialize(params)
      @id = permit_params(params)[:id]
    end

    def destroy
      Issue.destroy(id)
    end

    private

    attr_reader :id

    def permit_params(params)
      params.permit(:id)
    end
  end
end
