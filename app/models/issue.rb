# encoding: utf-8

class Issue < ApplicationRecord
  validates :title, presence: true
  belongs_to :rubric
  has_many :papers

  def delete
    Paper.where(issue_id: id).each(&:delete)
    FileHelper.delete_file(attachment, 'issues')
    destroy
  end
end
