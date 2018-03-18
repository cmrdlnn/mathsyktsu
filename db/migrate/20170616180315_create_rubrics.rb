# frozen_string_literal: true

class CreateRubrics < ActiveRecord::Migration[5.0]
  def change
    create_table :rubrics do |t|
      t.string :title, unique: true, null: false
    end
  end
end
