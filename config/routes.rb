Rails.application.routes.draw do
  resources :articles do 
    resources :comments
  end
  post 'articles/:id/vote_up' => 'articles#vote_up'
  post 'articles/:id/vote_down' => 'articles#vote_down'
  resources :users
end
