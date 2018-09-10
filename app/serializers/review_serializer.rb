class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :taste, :smell, :look, :feel, :rating, :beer_id
  belongs_to :user
  belongs_to :beer
end
