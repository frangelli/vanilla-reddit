class User < ApplicationRecord
  has_many :articles
  has_many :comments

  validates_presence_of :username
  validates_uniqueness_of :username
end
