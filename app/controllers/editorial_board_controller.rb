# encoding: utf-8

class EditorialBoardController < ApplicationController
  before_action :authenticate_redactor_request!

  def set_editorial_board
    editors = params[:editorial_board]
    pubs = params[:publications]
    pubs.each do |pub|
      EditorialBoardActivity.where(publication_id: pub).destroy_all
      publication = Publication.find(pub)
      editors.each do |editor|
        editorial = User.find(editor)
        editorial_board = EditorialBoardActivity.create(
          publication: publication,
          user: editorial
        )
        editorial_board.save
        publication[:status] = 'На рассмотрении'
        publication.save
      end
    end
    head :created
  end

  def select_editorial_board
    editorial_board = User.where(role: %w[redactor editorial_board])
                          .select(:id, :full_name)
    render json: { editorial_board: editorial_board }
  end

  def editorial_board
    activites = EditorialBoardActivity
                .where(publication: params[:editorial_board][:id])
    if activites.present?
      editors = []
      activites.each do |activity|
        user = User.find(activity[:user_id])
        editors.push(user[:full_name])
      end
      render json: editors
    else
      head :no_content
    end
  end
end
