class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :taste, :smell, :look, :feel, :rating
end
