class BeerSerializer < ActiveModel::Serializer
  attributes :id, :abv, :name, :rating
  has_many :reviews
  belongs_to :brewery
end
