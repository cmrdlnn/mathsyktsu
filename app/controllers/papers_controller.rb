# encoding: utf-8

class PapersController < ApplicationController
  include PapersHelper

  def create
    authenticate_redactor_request!
    attribute_sorting(params[:paper])
    Paper.create(attributes)
    head :created
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
