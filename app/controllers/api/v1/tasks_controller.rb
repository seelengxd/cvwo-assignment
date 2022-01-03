class Api::V1::TasksController < ApplicationController
  def index
    @tasks = Task.all
    render json: @tasks
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: { 'message': 'Task successfully saved!' }
    else
      render json: { 'error': @task.errors.full_messages }
    end
  end

  def show; end

  def destroy; end

  private

  def task_params
    params.permit(:title, :description, :due_date, :importance, :done)
  end
end
