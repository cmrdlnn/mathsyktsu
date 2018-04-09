# frozen_string_literal: true

class PapersController < ApplicationController
  before_action :authenticate_redactor!, only: %i[create destroy update]

  include PapersHelper

  def create
    new_paper = service.create(params)
    render json: new_paper, status: :created
  end

  def destroy
    service.destroy(params)
  end

  def update
    updated_paper = service.update(params)
    render json: updated_paper
  end

  def download
    file = service.download(params)
    send_file(*file)
  end
end
