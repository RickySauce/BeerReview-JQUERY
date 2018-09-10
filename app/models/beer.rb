class Beer < ApplicationRecord
  belongs_to :brewery
  has_many :reviews

  def rating
    self.reviews.each do |review|
      @rating = 0 if @rating.nil?
      @rating += review.rating
    end
     if !self.reviews.blank?
      @rating /= self.reviews.count
      @rating.round(2)
    else
      @rating = nil
    end 
  end

end
