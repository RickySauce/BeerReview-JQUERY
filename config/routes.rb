Rails.application.routes.draw do
  root 'application#home'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  resources :users do
    resources :reviews
    resources :beers, only: [:show, :index]
  end
  resources :beers, only: [:show, :index] do
    resources :review, only: [:show, :index]
  end
  resources :breweries, only: [:show, :index] do
    resources :beers, only: [:show, :index]
  end
end
