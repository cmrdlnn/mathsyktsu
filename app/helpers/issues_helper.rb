# encoding: utf-8

module IssuesHelper
  def attribute_sorting(issue)
    attributes = { title: issue[:issue_title], rubric_id: issue[:rubric] }
    errors = {}
    errors[:title] = error_message if title_exists?(attributes[:title])
    if issue[:english_title]
      attributes[:english_title] = issue[:english_title]
      if title_exists?(attributes[:english_title])
        errors[:english_title] = error_message
      end
    end
    return { errors: errors } if errors.present?
    return attributes unless issue[:file]
    attachment = FileHelper.create_file(issue[:file][:content],
                                        issue[:file_title],
                                        'issues')
    attributes.merge(filename: issue[:file_title],
                     mime_type: issue[:file][:mime_type],
                     attachment: attachment)
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
