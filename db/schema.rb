# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170616180315) do

  create_table "editorial_board_activities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "publication_id",               null: false
    t.integer "user_id",                      null: false
    t.text    "comment",        limit: 65535
    t.index ["publication_id"], name: "index_editorial_board_activities_on_publication_id", using: :btree
    t.index ["user_id"], name: "index_editorial_board_activities_on_user_id", using: :btree
  end

  create_table "issues", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "title",         null: false
    t.string   "english_title"
    t.string   "filename"
    t.string   "mime_type"
    t.string   "attachment"
    t.integer  "rubric_id",     null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["rubric_id"], name: "index_issues_on_rubric_id", using: :btree
  end

  create_table "papers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "title",                             null: false
    t.string   "english_title"
    t.string   "rubric",                            null: false
    t.string   "english_rubric"
    t.string   "autors",                            null: false
    t.string   "english_autors"
    t.string   "keywords",                          null: false
    t.string   "english_keywords"
    t.text     "description",         limit: 65535, null: false
    t.text     "english_description", limit: 65535
    t.string   "filename",                          null: false
    t.string   "mime_type",                         null: false
    t.string   "attachment",                        null: false
    t.integer  "issue_id",                          null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.index ["issue_id"], name: "index_papers_on_issue_id", using: :btree
  end

  create_table "publications", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "filename",   null: false
    t.string   "size"
    t.string   "mime_type",  null: false
    t.string   "status"
    t.string   "attachment", null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_publications_on_user_id", using: :btree
  end

  create_table "rubrics", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "title", null: false
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "full_name",                            null: false
    t.string   "email",                                null: false
    t.string   "password_digest",                      null: false
    t.string   "role",                                 null: false
    t.string   "confirmation_token"
    t.boolean  "email_confirmed",      default: false
    t.datetime "confirmation_sent_at"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
  end

end
