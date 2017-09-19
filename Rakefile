# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

task :default do
  sh 'RAILS_ENV=development bin/rails server -b 0.0.0.0'
end

task :assets do
  sh 'npm install'
end

task :build_dev do
  sh 'npm run build'
end

task :build_prod do
  sh 'npm run production'
end

task :dev_server do
  sh 'npm run dev_server'
end
