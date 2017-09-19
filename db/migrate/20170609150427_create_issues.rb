# encoding: utf-8

class CreateIssues < ActiveRecord::Migration[5.0]
  def change
    create_table :issues do |t|
      t.string :title, null: false
      t.string :english_title, default: nil
      t.string :filename, default: nil
      t.string :mime_type, default: nil
      t.string :attachment, unique: true, default: nil
      t.belongs_to :rubric, index: true, null: false

      t.timestamps
    end
  end
end
