class User < ApplicationRecord
has_secure_password
has_many :reviews
has_many :beers, through: :reviews
has_many :breweries, -> { distinct }, through: :beers
validates :username, presence: true, uniqueness: true
validates :email, presence: true, uniqueness: true
validates :password, confirmation: true
validates :password_confirmation, presence: true
end
