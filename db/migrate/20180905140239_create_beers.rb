class CreateBeers < ActiveRecord::Migration[5.2]
  def change
    create_table :beers do |t|
      t.string :name
      t.string :description
      t.string :style
      t.integer :ibu
      t.float :abv
      t.float :rating
      t.integer :brewery_id
      t.timestamps
    end
  end
end
