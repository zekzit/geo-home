class Home < ApplicationRecord
    has_many_attached :photos

    after_create_commit -> { broadcast_append_to :homes, partial: 'homes/home_details', locals: { home: self } }
end
