# encoding: utf-8

class RubricsController < ApplicationController
  def create
    authenticate_redactor_request!
    rubric = Rubric.create(rubric_params)
    if rubric.errors.full_messages.present?
      head :conflict
    else
      render json: rubric, status: :created
    end
  end

  def index
    render json: Rubric.all.to_json
  end

  def change
    authenticate_redactor_request!
    Rubric.find(params[:rubric][:id]).update(title: params[:rubric][:title])
    head :ok
  end

  def delete
    authenticate_redactor_request!
    Rubric.find(params[:rubric][:id]).delete
  end

  private

  def rubric_params
    params.require(:rubric).permit(:title)
  end
end
