# frozen_string_literal: true

module PapersService
  PATH = Rails.root.join('magazine', 'papers')

  def self.index
    Index.index
  end

  def self.create(params)
    Create.new(params).create
  end

  def self.destroy(params)
    Destroy.new(params).destroy
  end

  def self.update(params)
    Update.new(params).update
  end

  def self.download(params)
    Download.new(params).download
  end
end
