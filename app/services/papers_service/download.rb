# frozen_string_literal: true

module PapersService
  class Download
    def initialize(params)
      id = permit_params(params)[:id]
      @paper = Paper.find(id)
    end

    def download
      [path, filename_and_type]
    end

    private

    attr_reader :paper

    def path
      PATH.join(paper.attachment)
    end

    def filename_and_type
      { filename: paper.filename, type: paper.mime_type }
    end

    def permit_params(params)
      params.permit(:id)
    end
  end
end
