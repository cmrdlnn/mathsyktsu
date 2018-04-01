# frozen_string_literal: true

module IssuesService
  class Create
    ATTRS = %i[english_title file rubric_id title].freeze

    def initialize(params)
      parameters = permit_params(params)
      @data = parameters.except(:file)
      @file = parameters[:file]
    end

    def create
      save_file
      Issue.create!(data).to_json
    end

    private

    attr_reader :data, :file

    def save_file
      return unless file
      name_of_file = filename
      FileUtils.mv file.tempfile, PATH.join(name_of_file)
      update_data(name_of_file)
    end

    def filename
      FileHelper.filename(file.original_filename, PATH)
    end

    def update_data(attachment)
      data[:attachment] = attachment
      data[:filename] = file.original_filename
      data[:mime_type] = file.content_type
    end

    def permit_params(params)
      params.permit(*ATTRS)
    end
  end
end
