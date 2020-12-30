class CreateHomes < ActiveRecord::Migration[6.1]
  def change
    create_table :homes do |t|
      t.string :name
      t.text :address
      t.decimal :price
      t.decimal :latitude
      t.decimal :longitude
      t.text :note

      t.timestamps
    end
  end
end
