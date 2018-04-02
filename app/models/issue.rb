# frozen_string_literal: true

class Issue < ApplicationRecord
  validates :title,
            presence: true,
            uniqueness: { case_sensitive: false }

  validates :english_title,
            uniqueness: { case_sensitive: false }

  belongs_to :rubric

  has_many :papers, dependent: :destroy

  def destroy
    super
    FileHelper.delete(attachment, IssuesService::PATH)
  end
end
