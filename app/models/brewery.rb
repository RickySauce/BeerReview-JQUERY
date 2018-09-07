class Brewery < ApplicationRecord
  has_many :beers
  has_many :reviews, through: :beers
  has_many :users, -> { distinct }, through: :reviews

  def rating
    self.beers.each do |beer|
      @rating = 0 if @rating.nil?
      @rating += beer.rating
    end
    @rating /= self.beers.count
    @rating.round(2)
  end

end
