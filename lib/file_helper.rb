# encoding: utf-8

module FileHelper
  class << self
    def create_file(data, filename, folder)
      content = begin
        URI::Data.new(data).data.force_encoding('utf-8')
      rescue
        Base64.decode64(data.split(',')[1]).force_encoding('utf-8')
      end
      new_file = generate_filename(filename, folder)
      File.open("#{Rails.root}/private/#{folder}/#{new_file}", 'w+') do |f|
        f.write(content)
      end
      new_file
    end

    def delete_file(filename, folder)
      path_to_file = "#{Rails.root}/private/#{folder}/#{filename}"
      File.delete(path_to_file) if File.file?(path_to_file)
    end

    def generate_filename(filename, folder)
      ext = File.extname(filename)
      name = File.basename(filename, ext)
      related_file_indexes = []
      Dir.entries("#{Rails.root}/private/#{folder}").select do |file|
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
