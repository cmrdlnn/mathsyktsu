# frozen_string_literal: true

module IssuesService
  class Update
    def initialize(params)
      parameters = permit_params(params)
      @id = parameters[:id]
      @data = parameters[:issue]
    end

    def update
      issue.update!(data).to_json
    rescue ActiveRecord::RecordInvalid
      dublicate!
    end

    private

    attr_reader :id, :data

    def issue
      Issue.find(id)
    end

    def dublicate!
      raise IssueErrors::Dublicate
    end

    def permit_params(params)
      params.permit(:id, issue: %i[title english_title])
    end
  end
end
