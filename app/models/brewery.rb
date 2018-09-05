class Brewery < ApplicationRecord
  has_many :beers
  has_many :reviews, through: :beers
end
