# encoding: utf-8

class EditorialBoardActivity < ApplicationRecord
  belongs_to :user
  belongs_to :publication
end
