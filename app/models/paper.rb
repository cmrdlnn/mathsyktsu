# frozen_string_literal: true

class Paper < ApplicationRecord
  validates :autors, presence: true
  validates :description, presence: true
  validates :keywords, presence: true
  validates :title, presence: true
  validates :topic, presence: true

  belongs_to :issue

  def destroy
    super
    FileHelper.delete(attachment, PapersService::PATH)
  end
end
