class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :article

  validates_presence_of :content, :article, :user
end
