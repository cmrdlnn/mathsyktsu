# frozen_string_literal: true

class Rubric < ApplicationRecord
  validates :title,
            presence: true,
            uniqueness: { case_sensitive: false }
  has_many :issues

  def delete
    Issue.where(rubric_id: id).each(&:delete)
    destroy
  end
end