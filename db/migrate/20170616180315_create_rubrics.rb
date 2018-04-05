# frozen_string_literal: true

class CreateRubrics < ActiveRecord::Migration[5.1]
  def change
    create_table :rubrics do |t|
      t.string :title, null: false
    end
  end
end
