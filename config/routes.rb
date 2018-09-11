Rails.application.routes.draw do
  root 'application#home'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/users/beers/:id', to: 'users#review_exists', as: 'review_exists'
  resources :users do
    resources :reviews, except: [:new, :create]
    resources :beers, only: [:index]
    resources :breweries, only: [:index]
  end
  resources :beers, only: [:show, :index] do
    resources :reviews, except: [:destroy, :edit, :update]
  end
  resources :breweries, only: [:show, :index] do
    resources :beers, only: [:show, :index]
  end
end
