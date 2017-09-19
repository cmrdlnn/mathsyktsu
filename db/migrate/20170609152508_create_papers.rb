# encoding: utf-8

class CreatePapers < ActiveRecord::Migration[5.0]
  def change
    create_table :papers do |t|
      t.string :title, null: false
      t.string :english_title, default: nil
      t.string :rubric, null: false
      t.string :english_rubric, default: nil
      t.string :autors, null: false
      t.string :english_autors, default: nil
      t.string :keywords, null: false
      t.string :english_keywords, default: nil
      t.text :description, null: false
      t.text :english_description, default: nil
      t.string :filename, null: false
      t.string :mime_type, null: false
      t.string :attachment, unique: true, null: false
      t.belongs_to :issue, index: true, null: false

      t.timestamps
    end
  end
end
