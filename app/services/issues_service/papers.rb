# frozen_string_literal: true

module IssuesService
  class Papers
    def initialize(params)
      @id = permit_params(params)[:id]
    end

    def papers
      Paper.where(issue_id: id).to_json
    end

    private

    attr_reader :id

    def permit_params(params)
      params.permit(:id)
    end
  end
end
