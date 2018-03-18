# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\- .]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  before_save :email_downcase, :full_name_normalize
  before_create :generate_confirmation_instructions

  validates :full_name,
            presence: true,
            uniqueness: { case_sensitive: false }
  validates :email,
            presence: true, length: { maximum: 255 },
            format: { with: VALID_EMAIL_REGEX },
            uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }, on: :create

  has_secure_password

  def confirmation_token_valid?
    (confirmation_sent_at + 30.days) > Time.now.utc
  end

  def mark_as_confirmed!
    update_attributes(confirmation_token: nil, email_confirmed: true, confirmation_sent_at: nil)
  end

  def confirmed_at?
    email_confirmed == true
  end

  def change_email(email)
    user = User.find_by(email: email)
    update(email: email) if user.nil?
  end

  def change_password(password)
    self.password = password
    save
  end

  def search(pattern)
    User.where("(email like '%#{pattern}%' or full_name like '%#{pattern}%') and role != 'redactor'")
        .select(%i[email full_name])
  end

  def delete_user(email)
    user = User.find_by(email: email)
    user.delete
  end

  def create_editorial(attributes)
    return 1 if User.find_by(email: attributes[:email]).present?
    return 2 if User.find_by(full_name: attributes[:full_name]).present?
    user = User.new(attributes)
    UserMailer.creating_editorial(user).deliver
    user.save
    user.update_attributes(confirmation_token: nil, email_confirmed: true, confirmation_sent_at: nil)
    3
  end

  private

  def email_downcase
    self.email = email.delete(' ').downcase
  end

  def full_name_normalize
    self.full_name = full_name.split.map{ |word| word.capitalize }.join(' ')
  end

  def generate_confirmation_instructions
    self.confirmation_token = SecureRandom.hex(10)
    self.confirmation_sent_at = Time.now.utc
  end
end
