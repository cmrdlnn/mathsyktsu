# frozen_string_literal: true

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be
# available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

task :run do
  sh 'bin/rails server -b 0.0.0.0'
end

task :'run-dev' do
  sh 'WEBPACK_PATH=http://0.0.0.0:8080 bin/rails server -b 0.0.0.0'
end

task :migrate do
  sh 'rails db:migrate'
end

task :assets do
  sh 'npm i'
end

task :webpack do
  sh 'npm run dev'
end

task :'webpack-prod' do
  sh 'npm run production'
end

task :'webpack-dev' do
  sh 'npm run start'
end
