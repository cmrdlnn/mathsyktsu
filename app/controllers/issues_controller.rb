# frozen_string_literal: true

class IssuesController < ApplicationController
  before_action :authenticate_redactor!, only: %i[create destroy update]

  include IssuesHelper

  def index
    result = service.index
    render json: result
  end

  def download
    file = service.download(params)
    send_file(*file)
  end

  def create
    new_issue = service.create(params)
    render json: new_issue, status: :created
  end

  def destroy
    service.destroy(params)
  end

  def update
    updated_issue = service.update(params)
    render json: updated_issue
  end
end
