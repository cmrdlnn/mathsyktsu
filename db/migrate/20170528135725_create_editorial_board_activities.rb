# encoding: utf-8

class CreateEditorialBoardActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :editorial_board_activities do |t|
      t.belongs_to :publication, index: true, null: false
      t.belongs_to :user, index: true, null: false
      t.text :comment
    end
  end
end
