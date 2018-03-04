# encoding: utf-8

class IssuesController < ApplicationController
  before_action :authenticate_redactor!, only: %i[create delete update]

  include IssuesHelper

  def index
    result = IssuesService.index
    render json: result
  end

  def download
    result = IssuesDownloadService.new(params).download
    send_file(*result)
  end

  def create
    authenticate_redactor_request!
    attributes = attribute_sorting(params[:issue])
    if attributes.key?(:errors)
      render json: attributes, status: :conflict
    else
      new_issue = Issue.create(attributes).to_json(only: issue_attributes)
      render json: new_issue, status: :created
    end
  end

  def delete
    authenticate_redactor_request!
    Issue.find(params[:issue][:id]).delete
  end

  def update
    authenticate_redactor_request!
    attributes = attributes_for_update(params[:issue])
    if attributes.key?(:errors)
      render json: attributes, status: :conflict
    else
      issue = Issue.find(params[:issue][:id])
      issue.update(attributes)
      render json: issue.to_json(only: issue_attributes)
    end
  end
end
