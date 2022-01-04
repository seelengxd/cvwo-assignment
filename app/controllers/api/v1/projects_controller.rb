class Api::V1::ProjectsController < ApplicationController
  before_action :set_project, only: %i[show update]
  def index
    @projects = Project.all
    render json: @projects
  end

  def show
    render json: @project, include: [:tasks]
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      render json: { 'message': 'Project successfully created!' }
    else
      render json: { 'error': @project.errors.full_messages }
    end
  end

  def update
    if @project.update(project_params)
      render json: { 'message': 'Task successfully updated!' }
    else
      render json: { 'error': @project.errors.full_messages }
    end
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name)
  end
end
