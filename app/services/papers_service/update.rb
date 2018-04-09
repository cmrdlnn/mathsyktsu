# frozen_string_literal: true

module PapersService
  class Update
    ATTRS = %i[
      autors
      delete_file
      description
      english_autors
      english_description
      english_keywords
      english_title
      english_topic
      file
      id
      keywords
      title
      topic
    ].freeze

    def initialize(params)
      parameters = permit_params(params)
      @paper = find(parameters[:id])
      @file = parameters[:file]
      @delete_file = parameters[:delete_file]
      @data = parameters.except(:id, :file, :delete_file)
    end

    def update
      delete_file_data_if_needed
      update_file
      paper.update!(data)
      paper.to_json
    end

    private

    attr_reader :paper, :file, :delete_file, :data

    def find(id)
      Paper.find(id)
    end

    def update_file
      return unless file
      delete_old_file
      name_of_file = filename
      FileUtils.mv file.tempfile, PATH.join(name_of_file)
      update_file_data(name_of_file)
    end

    def filename
      FileHelper.filename(file.original_filename, PATH)
    end

    def update_file_data(attachment)
      data[:attachment] = attachment
      data[:filename] = file.original_filename
      data[:mime_type] = file.content_type
    end

    def delete_file_data_if_needed
      return unless delete_file == 'on'
      delete_old_file
      %i[attachment filename mime_type].each do |attribute|
        data[attribute] = nil
      end
    end

    def delete_old_file
      FileHelper.delete(paper.attachment, PATH)
    end

    def permit_params(params)
      params.permit(*ATTRS)
    end
  end
end
