# encoding: utf-8

Rails.application.routes.draw do
  root 'main_page#index'

  get 'to_autors',                     to: 'main_page#index'
  get 'jubilees',                      to: 'main_page#index'
  get 'news',                          to: 'main_page#index'
  get 'magazine',                      to: 'main_page#index'
  get 'registration',                  to: 'main_page#index'
  get 'editorial_board',               to: 'main_page#index'
  get 'distribution_and_subscription', to: 'main_page#index'
  get 'address',                       to: 'main_page#index'

  get 'lk',                            to: 'main_page#index'
  get 'confirm/:confirm_token',        to: 'main_page#index'

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

  get    'rubrics/index',  to: 'rubrics#index'
  post   'rubrics/create', to: 'rubrics#create'
  patch  'rubrics/change', to: 'rubrics#change'
  delete 'rubrics/delete', to: 'rubrics#delete'

  get    'issues/index',         to: 'issues#index'
  get    'issues/:id/download',  to: 'issues#download'
  post   'issues/create',        to: 'issues#create'
  patch  'issues/change',        to: 'issues#change'
  delete 'issues/delete',        to: 'issues#delete'

  post 'papers/create', to: 'papers#create'
  get  'papers/:id/show', to: 'papers#show_for_issue'
  get  'papers/:id/download', to: 'papers#download'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
