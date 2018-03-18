# frozen_string_literal: true

module IssuesService
  def self.index
    Index.index
  end

  def self.download(params)
    Download.new(params).download
  end
end
