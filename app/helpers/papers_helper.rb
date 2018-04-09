# frozen_string_literal: true

module PapersHelper
  def service
    PapersService
  end

  def attribute_sorting(paper)
    attachment = FileHelper.create_file(paper[:file][:content],
                                        paper[:filename],
                                        'articles')
    attributes = {
      title:       paper[:title],
      rubric:      paper[:rubric],
      autors:      paper[:autors],
      description: paper[:description],
      keywords:    paper[:keywords],
      issue_id:    paper[:issue_id],
      attachment:  attachment,
      filename:    paper[:filename],
      mime_type:   paper[:file][:mime_type]
    }
    return attributes unless english_attributes_are_present?(paper)
    attributes.merge(
      english_attributes.map do |attribute|
        [attribute, paper[attribute]]
      end
      .to_h
    )
  end

  def attributes_for_show
    %i[
      id
      title
      rubric
      autors
      description
      keywords
    ]
      .concat(english_attributes)
  end

  private

  def english_attributes
    %i[
      english_title
      english_rubric
      english_autors
      english_keywords
      english_description
    ]
  end

  def english_attributes_are_present?(paper)
    english_attributes.all? { |attribute| paper[attribute].present? }
  end
end
