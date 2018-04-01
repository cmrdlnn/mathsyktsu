# frozen_string_literal: true

module IssuesService
  PATH = Rails.root.join('magazine', 'issues')

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

  def self.papers(params)
    Papers.new(params).papers
  end
end
