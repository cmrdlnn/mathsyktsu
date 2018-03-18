# frozen_string_literal: true

class RubricsController < ApplicationController
  before_action :authenticate_redactor!, only: %i[create update destroy]

  include RubricsHelper

  def index
    rubrics = service.index
    render json: rubrics
  end

  def create
    new_rubric = service.create(params)
    render json: new_rubric, status: :created
  end

  def update
    updated_rubric = service.update(params)
    render json: updated_rubric
  end

  def destroy
    service.destroy(params)
  end
end
