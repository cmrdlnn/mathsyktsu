# encoding: utf-8

class Paper < ApplicationRecord
  validates :title, presence: true
  validates :rubric, presence: true
  validates :autors, presence: true
  validates :description, presence: true
  validates :keywords, presence: true
  belongs_to :issue

  def delete
    FileHelper.delete_file(attachment, 'articles')
    destroy
  end
end
