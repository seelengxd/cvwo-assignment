class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: %i[show destroy update]

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def create
    @project = Project.find(project_id)
    @task = @project.tasks.build(task_params)
    if @task.save
      render json: { 'message': 'Task successfully saved!' }
    else
      render json: { 'error': @task.errors.full_messages }
    end
  end

  def show
    render json: @task
  end

  def destroy
    @task.destroy
    render json: { 'message': 'Task successfully deleted!' }
  end

  def update
    if @task.update(task_params)
      render json: { 'message': 'Task successfully updated!' }
    else
      render json: { 'error': @task.errors.full_messages }
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :due_date, :importance, :done)
  end

  def project_id
    params.permit(:project_id)[:project_id]
  end
end
