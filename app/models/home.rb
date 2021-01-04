class Home < ApplicationRecord
  has_many_attached :photos

  after_create_commit -> { broadcast_append_to :homes, partial: 'homes/home_details', locals: { home: self } }
  after_destroy_commit -> { broadcast_action_to :homes, action: "remove", target: "#{self.class.name.downcase}_#{id}", partial: 'homes/destroy' }
end
