class User < ApplicationRecord
  has_many :articles
  has_many :comments

  validates_presence_of :name, :email
  validates_uniqueness_of :email
end
