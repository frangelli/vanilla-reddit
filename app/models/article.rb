class Article < ApplicationRecord
  include ActionView::Helpers::DateHelper
  
  belongs_to :user
  has_many :comments

  validates_presence_of :title, :content, :user

  def posted_at
    distance_of_time_in_words(Time.now, created_at)
  end
end
