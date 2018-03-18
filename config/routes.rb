# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  post 'signup', to: 'users#create'
  get 'confirm/:token', to: 'main_page#index'
  post 'signin', to: 'users#login'
  get 'users/check', to: 'users#check'

  resources :rubrics, only: %i[index create update destroy]

  resources :issues, only: %i[index create update destroy]
  get 'issues/:id/download', to: 'issues#download'

  resources :papers, only: %i[create show update destroy]
  get 'papers/:id/download', to: 'papers#download'

  get '*all' => 'home#index', defaults: { layout: 'new' }
end
