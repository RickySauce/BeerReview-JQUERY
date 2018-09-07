class Review < ApplicationRecord
  belongs_to :user
  belongs_to :beer
  validates :taste, :smell, :feel, :look, :inclusion => 0..5

  def rating
    @rating = (self.look + self.feel + self.taste + self.smell) / 4.0
    @rating.round(2)
  end

end
