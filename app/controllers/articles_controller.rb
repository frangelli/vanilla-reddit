class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :update, :destroy, :vote]

  def index
    @articles = Article.all

    render json: @articles
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

  def vote
    @article.increment(:votes, 1)
    @article.save
    render json: @article
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
end
