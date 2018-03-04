# encoding: utf-8

module IssuesHelper
  def attribute_sorting(issue)
    attributes = { title: issue[:issue_title], rubric_id: issue[:rubric] }
    attributes[:english_title] = issue[:english_title]
    errors = check_titles(attributes)
    return { errors: errors } if errors.present?
    return attributes unless issue[:file]
    attachment = FileHelper.create_file(issue[:file][:content],
                                        issue[:file_title],
                                        'issues')
    attributes.merge(filename: issue[:file_title],
                     mime_type: issue[:file][:mime_type],
                     attachment: attachment)
  end

  def attributes_for_update(attributes)
    errors = check_titles(attributes)
    return { errors: errors } if errors.present?
    delete_file_if_necessary(attributes)
    prepared_attributes = attributes
    if attributes.key?(:english_title)
      prepared_attributes[:english_title] = attributes[:english_title]
    end
    if attributes.key?(:file) && attributes.key?(:file_title)
      prepared_attributes.merge!(attachment: FileHelper.create_file(attributes[:file][:content],
                                                                    attributes[:file_title],
                                                                    'issues'),
                                 filename: attributes[:file_title],
                                 mime_type: attributes[:file][:mime_type])
    end
    if attributes.key?(:delete_file)
      prepared_attributes.merge!(attachment: nil,
                                 filename: nil,
                                 mime_type: nil)
    end
    prepared_attributes.except(:id, :file, :delete_file)
    prepared_attributes.permit(:title, :english_title, :attachment, :filename, :mime_type)
  end

  def check_titles(attributes)
    errors = {}
    errors[:title] = error_message if attributes.key?(:title) && title_exists?(attributes[:title])
    if attributes[:english_title] && title_exists?(attributes[:english_title])
      errors[:english_title] = error_message
    end
    errors
  end

  def delete_file_if_necessary(attributes)
    return unless attributes.key?(:delete_file) || attributes.key?(:file)
    attachment = Issue.find(attributes[:id]).attachment
    FileHelper.delete_file(attachment, 'issues')
  end

  def title_exists?(title)
    Issue.where(title: title)
         .or(Issue.where(english_title: title))
         .exists?
  end

  def error_message
    'Экземпляр журнала с данным названием уже существует'
  end

  def issue_attributes
    %i[id title rubric_id english_title filename]
  end
end
