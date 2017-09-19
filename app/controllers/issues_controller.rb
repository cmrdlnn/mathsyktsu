# encoding: utf-8

class IssuesController < ApplicationController
  include IssuesHelper

  def index
    issues = Issue.all.select(issue_attributes)
    render json: issues.to_json
  end

  def download
    issue = Issue.find(params[:id])
    send_file "#{Rails.root}/private/issues/#{issue.attachment}",
              filename: issue.filename, type: issue.mime_type
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

  def change
    authenticate_redactor_request!
    Issue.find(params[:issue][:id]).update(params)
  end
end
