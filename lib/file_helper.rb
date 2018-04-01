# frozen_string_literal: true

module FileHelper
  class << self
    def delete(filename, folder)
      path = "#{folder}/#{filename}"
      File.delete(path) if File.file?(path)
    end

    def filename(filename, folder)
      ext = File.extname(filename)
      name = File.basename(filename, ext)
      related_file_indexes = []
      Dir.entries(folder).select do |file|
        if File.basename(file).include?(name) && File.extname(file) == ext
          related_file_indexes << file.split('-').last.to_i
        end
      end
      if related_file_indexes.present?
        "#{name}-#{related_file_indexes.max + 1}#{ext}"
      else
        filename
      end
    end
  end
end
