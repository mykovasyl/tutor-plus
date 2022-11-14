Rails.application.routes.draw do
  
  resources :assignments, except: [:new, :show, :edit]
  resources :students, except: [:new, :show, :edit]
  resources :tutors, except: [:new, :show, :edit]
  resources :users, only: [:create, :show]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/tutorsignup", to: "tutors#create"
  post "/studentsignup", to: "students#create"
  
  get "/auth", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

end
