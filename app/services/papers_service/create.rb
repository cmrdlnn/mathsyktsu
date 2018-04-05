# frozen_string_literal: true

module PapersService
  class Create
    ATTRS = %i[
      attachment
      autors
      description
      english_autors
      english_description
      english_keywords
      english_title
      english_topic
      file
      filename
      keywords
      mime_type
      title
      topic
    ].freeze

    def initialize(params)
      parameters = permit_params(params)
      @file = parameters[:file]
      @data = parameters.except(:file)
    end

    def create
      save_file
      Paper.create(data).to_json
    end

    private

    attr_reader :data

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
