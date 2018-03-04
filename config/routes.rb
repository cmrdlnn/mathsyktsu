# encoding: utf-8

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  post 'signup', to: 'users#create'
  get 'confirm/:token', to: 'main_page#index'
  post 'signin', to: 'users#login'
  post 'check', to: 'users#check'
  post 'change_email', to: 'users#change_email'
  post 'change_password', to: 'users#change_password'
  post 'user_search', to: 'users#user_search'
  delete 'delete_user', to: 'users#delete_user'
  post 'create_editorial', to: 'users#create_editorial'
  post 'publications/create', to: 'publications#create'
  post 'publications/show', to: 'publications#show'
  post 'publications/show_for_redactor', to: 'publications#show_for_redactor'
  delete 'publications/delete_by_redactor', to: 'publications#delete_by_redactor'
  post 'publications/show_details', to: 'publications#show_details'
  post 'publications/download', to: 'publications#download'
  post 'publications/show_for_editorial', to: 'publications#show_for_editorial'
  post 'publications/set_status', to: 'publications#set_status'

  post 'select_editorial_board', to: 'editorial_board#select_editorial_board'
  post 'set_editorial_board', to: 'editorial_board#set_editorial_board'
  post 'editorial_board', to: 'editorial_board#editorial_board'

  resources :rubrics, only: %i[index create update destroy]

  resources :issues, only: %i[index create update destroy]
  get 'issues/:id/download', to: 'issues#download'

  post 'papers/create', to: 'papers#create'
  get  'papers/:id/show', to: 'papers#show_for_issue'
  get  'papers/:id/download', to: 'papers#download'

  get '*all' => 'home#index', defaults: { layout: 'new' }
end
