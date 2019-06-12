class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :update, :destroy, :vote_up, :vote_down]
  
  def index
   fetch_all_ordered_and_render
  end

  def show
    render json: @article
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      render json: @article, status: :created
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  def update
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  def vote_up
    @article.increment(:votes, 1)
    @article.save
    fetch_all_ordered_and_render
  end

  def vote_down
    if @article.votes > 0
      @article.decrement(:votes, 1)
      @article.save
    end
    fetch_all_ordered_and_render
  end

  def destroy
    @article.destroy
  end

  private
    def set_article
      @article = Article.find(params[:id])
    end

    def article_params
      params.permit(:title, :content, :votes, :user_id)
    end

    def fetch_all_ordered_and_render
      @articles = Article.all.order('votes DESC, id ASC')
      render json: @articles,methods: [:posted_at, :comments_count],  include: { user: { only: :username }}
    end
end
