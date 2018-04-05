# frozen_string_literal: true

class Rubric < ApplicationRecord
  validates :title,
            presence: true

  has_many :issues, dependent: :destroy
end
