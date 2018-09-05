class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
       t.string :content
       t.integer :beer_id
       t.integer :user_id
       t.float :taste
       t.float :look
       t.float :smell
       t.float :feel
       t.float :rating
       t.timestamps
    end
  end
end
