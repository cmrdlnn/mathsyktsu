# frozen_string_literal: true

class Paper < ApplicationRecord
  validates :title, presence: true
  validates :rubric, presence: true
  validates :autors, presence: true
  validates :description, presence: true
  validates :keywords, presence: true

  belongs_to :issue

  def delete
    super
    FileHelper.delete(attachment, PapersService::PATH)
  end
end
