# frozen_string_literal: true

module IssuesService
  class Update
    ATTRS = %i[english_title file id title].freeze

    def initialize(params)
      parameters = permit_params(params)
      @issue = find(parameters[:id])
      @file = parameters[:file]
      @data = parameters.except(:id, :file)
    end

    def update
      update_file
      issue.update!(data)
      issue.to_json(only: %i[english_title filename id rubric_id title])
    rescue ActiveRecord::RecordInvalid
      dublicate!
    end

    private

    attr_reader :issue, :file, :data

    def find(id)
      Issue.find(id)
    end

    def update_file
      return unless file
      delete_old_file
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

    def delete_old_file
      FileHelper.delete(issue.attachment, PATH)
    end

    def dublicate!
      raise IssueErrors::Dublicate
    end

    def permit_params(params)
      params.permit(*ATTRS)
    end
  end
end
