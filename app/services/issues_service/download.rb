# encoding: utf-8

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
      "#{Rails.root}/private/issues/#{issue.attachment}"
    end

    def filename_and_type
      { filename: issue.filename, type: issue.mime_type }
    end

    def issue_params
      params.require(:issue).permit(:id)
    end
  end
end
