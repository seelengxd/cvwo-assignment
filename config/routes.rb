Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tasks, only: %i[index create show destroy update]
    end
  end
  root 'homepage#index'
  get '/*path', to: 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
