# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string 	 :full_name, unique: true, null: false
      t.string 	 :email, unique: true, null: false
      t.string 	 :password_digest, null: false
      t.string 	 :role, null: false
      t.string   :confirmation_token
      t.boolean  :email_confirmed, default: false
      t.datetime :confirmation_sent_at

      t.timestamps
    end
  end
end
