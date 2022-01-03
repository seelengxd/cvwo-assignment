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

  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    render json: { 'message': 'Task successfully deleted!' }
  end

  private

  def task_params
    params.permit(:title, :description, :due_date, :importance, :done)
  end
end
