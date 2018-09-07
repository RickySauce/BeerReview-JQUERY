Rails.application.routes.draw do
  root 'application#home'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  resources :users do
    resources :reviews, except: [:new, :create]
    resources :beers, only: [:show, :index]
  end
  resources :beers, only: [:show, :index] do
    resources :reviews, except: [:destroy, :update]
  end
  resources :breweries, only: [:show, :index] do
    resources :beers, only: [:show, :index]
  end
end
