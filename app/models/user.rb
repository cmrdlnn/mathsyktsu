# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /(\A[\w+\- .]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z|^redactor$)/i

  before_save :prepare_email, :prepare_full_name

  validates :full_name,
            presence: true,
            uniqueness: { case_sensitive: false }

  validates :email,
            presence: true,
            length: { maximum: 255 },
            format: { with: VALID_EMAIL_REGEX },
            uniqueness: { case_sensitive: false }

  validates :password,
            presence: true,
            length: { minimum: 6 },
            on: :create

  has_secure_password

  private

  def prepare_email
    self.email = email.strip.downcase
  end

  def prepare_full_name
    self.full_name = full_name.strip.split.map(&:capitalize).join(' ')
  end
end
