# frozen_string_literal: true

module IssuesService
  class Download
    def initialize(params)
      id = issue_params(params)[:id]
      @issue = Issue.find(id)
    end

    def download
      [path, filename_and_type]
    end

    private

    attr_reader :issue

    def path
      PATH.join(issue.attachment)
    end

    def filename_and_type
      { filename: issue.filename, type: issue.mime_type }
    end

    def issue_params(params)
      params.permit(:id)
    end
  end
end
