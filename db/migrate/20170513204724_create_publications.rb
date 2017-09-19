# encoding: utf-8

class CreatePublications < ActiveRecord::Migration[5.0]
  def change
    create_table :publications do |t|
      t.string :filename, null: false
      t.string :size
      t.string :mime_type, null: false
      t.string :status
      t.string :attachment, null: false
      t.belongs_to :user, index: true, null: false

      t.timestamps
    end
  end
end
