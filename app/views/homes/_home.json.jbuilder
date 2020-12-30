json.extract! home, :id, :name, :address, :price, :latitude, :longitude, :note, :created_at, :updated_at
json.url home_url(home, format: :json)
