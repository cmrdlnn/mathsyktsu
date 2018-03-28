# frozen_string_literal: true

class Issue < ApplicationRecord
  validates :title, presence: true

  belongs_to :rubric

  has_many :papers, dependent: :destroy

  def destroy
    FileHelper.delete_file(attachment, 'issues')
    super
  end
end
