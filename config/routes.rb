# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  get 'users/authenticate', to: 'users#authenticate'
  get 'users/logout', to: 'users#logout'
  post 'users/login', to: 'users#login'

  resources :rubrics, only: %i[index create update destroy]

  resources :issues, only: %i[index create update destroy]
  get 'issues/:id/download', to: 'issues#download'
  get 'issues/:id/papers', to: 'issues#papers'

  resources :papers, only: %i[create show update destroy]
  get 'papers/:id/download', to: 'papers#download'

  get '*all' => 'home#index', defaults: { layout: 'new' }
end
