Rails.application.routes.draw do
  resources :articles do 
    resources :comments
  end
  post 'articles/:id/vote' => 'articles#vote'
  resources :users
end
