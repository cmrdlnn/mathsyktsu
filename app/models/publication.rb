# encoding: utf-8

require 'zip'
require 'data_uri'

class Publication < ApplicationRecord
  validates :filename, presence: true
  validate :correct_mime_type
  validates :attachment, presence: true
  belongs_to :user
  has_one :editorial_board_activity

  def save_file_to_zip(data, filename)
    content = begin
      URI::Data.new(data).data.force_encoding('utf-8')
    rescue
      Base64.decode64(data.split(',')[1]).force_encoding('utf-8')
    end
    publication = Tempfile.new
    publication.write(content)
    publication.close
    Zip::File.open("#{Rails.root}/private/publications.zip") do |zip_file|
      zip_file.add(filename, publication.path)
    end
    publication.delete
  end

  def file_data_from_zip
    file = {}
    Zip::File.open("#{Rails.root}/private/publications.zip") do |zip_file|
      file = {
        data: "data:#{mime_type};base64,#{Base64.encode64(zip_file.read(attachment))}",
        filename: filename,
        mime_type: mime_type
      }
    end
    file
  end

  def delete
    Zip::File.open("#{Rails.root}/private/publications.zip") do |zip_file|
      zip_file.remove(attachment)
    end
    destroy
  end

  private

  def correct_mime_type
    acceptable_types = ['application/x-tex', 'text/x-tex']
    errors.add(:mime_type, 'Неверный тип файла') unless acceptable_types.include?(mime_type)
  end
end
