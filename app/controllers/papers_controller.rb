# frozen_string_literal: true

class PapersController < ApplicationController
  before_action :authenticate_redactor!, only: %i[create update destroy]

  include PapersHelper

  def create
    attributes = attribute_sorting(params[:paper])
    render json: Paper.create(attributes).to_json, status: :created
  end

  def show_for_issue
    render json: Paper.where(issue_id: params[:id])
                      .select(helpers.attributes_for_show)
                      .to_json
  end

  def download
    paper = Paper.find(params[:id])
    send_file "#{Rails.root}/private/articles/#{paper.attachment}",
              filename: paper.filename,
              type: paper.mime_type
  end
end
