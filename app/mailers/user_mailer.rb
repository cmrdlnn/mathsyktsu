# frozen_string_literal: true

class UserMailer < ActionMailer::Base
  default from: 'MathSyktsu'

  def registration_confirmation(user)
    @user = user
    mail(to: "#{user.full_name} <#{user.email}>",
         subject: 'Вестник Сыктывкарского университета')
  end

  def creating_editorial(user)
    @user = user
    mail(to: "#{user.full_name} <#{user.email}>",
         subject: 'Вестник Сыктывкарского университета')
  end
end
