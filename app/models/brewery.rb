class Brewery < ApplicationRecord
  has_many :beers
  has_many :reviews, through: :beers
  has_many :users, -> { distinct }, through: :reviews
end
