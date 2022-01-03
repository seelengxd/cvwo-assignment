class Api::V1::TasksController < ApplicationController
  def index
    @tasks = Task.all
    render json: @tasks
  end

  def create
  end

  def show
  end

  def destroy
  end
end
