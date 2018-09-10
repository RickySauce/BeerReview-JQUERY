class BrewerySerializer < ActiveModel::Serializer
  attributes :id, :name, :rating
  has_many :beers
end
