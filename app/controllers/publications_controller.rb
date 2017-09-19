# encoding: utf-8

class PublicationsController < ApplicationController
  def create
    authenticate_request!
    parameters = publication_params
    publication = Publication.new(parameters)
    publication.save_file_to_zip(params[:publication][:content],
                                 parameters[:attachment])
    if publication.save
      head :created
    else
      head :forbidden
    end
  end

  def show
    authenticate_request!
    publications = Publication
                   .where(user: @current_user.id)
                   .select(%i[filename created_at size status])
                   .as_json.each do |pub|
      pub['size'] = "#{pub['size']} Б"
      pub['created_at'] = pub['created_at'].strftime('%d-%m-%Y %H:%M:%S')
    end
    if publications.present?
      render json: publications
    else
      head :no_content
    end
  end

  def show_details
    authenticate_redactor_request!
    publication = Publication.joins(:user)
                             .where(id: params[:publication][:id])
                             .collect do |pub|
      user_att = pub.user.attributes.select do |key, _val|
        %w[full_name email].include?(key)
      end
      pub_att = pub.attributes
      pub_att['created_at'] = pub_att['created_at'].strftime('%d-%m-%Y %H:%M:%S')
      user_att.merge(pub_att)
    end
    if publication.present?
      render json: publication
    else
      head :not_found
    end
  end

  def show_for_redactor
    authenticate_redactor_request!
    publications = Publication
                   .joins(:user)
                   .select('publications.id, filename, publications.created_at, size, status, full_name')
                   .order('created_at')
                   .as_json
                   .each do |pub|
      pub['created_at'] = pub['created_at'].strftime('%d-%m-%Y %H:%M:%S')
    end
    render json: publications
  end

  def show_for_editorial
    authenticate_editorial_request!
    publications = EditorialBoardActivity.where(user_id: @current_user.id).joins(:publication)
                                         .select('publications.id, publications.filename, created_at, publications.size, publications.status')
                                         .as_json.each do |pub|
      pub['created_at'] = pub['created_at'].strftime('%d-%m-%Y %H:%M:%S')
      pub['size'] = "#{pub['size']} Б"
    end
    render json: publications
  end

  def download
    authenticate_request!
    publication = Publication.find_by(id: params[:publication][:id])
    render json: publication.file_data_from_zip
  end

  def delete_by_redactor
    authenticate_redactor_request!
    params[:publication].each do |pub|
      publications = Publication.find_by(id: pub)
      publications.delete
    end
  end

  def set_status
    authenticate_editorial_request!
    Publication.find(params[:publication][:id])
               .update_attributes(status: params[:publication][:status])
    if params[:publication][:status] != 'Одобрено'
      EditorialBoardActivity
        .where(user_id: @current_user.id, publication_id: params[:publication][:id])
        .first
        .update_attributes(comment: params[:publication][:comment])
    end
    head :ok
  end

  private

  def find_in_zip(filename)
    files = []
    Zip::File.open("#{Rails.root}/private/publications.zip") do |zip_file|
      zip_file.each do |entry|
        files.push(entry.name) if /^#{filename}[0-9]+$|^#{filename}$/ =~ entry.name
      end
    end
    if files.present? && files.include?(filename)
      counter = 1
      files.delete(filename)
      for i in 0..files.size
        break unless files[i] == "#{filename}#{counter}"
        counter += 1
      end
      counter
    else
      0
    end
  end

  def publication_params
    attachment = params[:publication][:filename].split('.')[0]
    publication = Publication.find_by(filename: params[:publication][:filename])
    if publication
      files_with_similar_name = find_in_zip(attachment)
      unless files_with_similar_name.zero?
        attachment = "#{attachment}#{files_with_similar_name}"
      end
    end
    params.require(:publication)
          .permit(:filename, :size, :mime_type, :content)
          .except(:content)
          .merge(user: @current_user, attachment: attachment, status: 'Отправлено редактору')
  end
end
