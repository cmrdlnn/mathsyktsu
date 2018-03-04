# encoding: utf-8

module IssuesService
  def self.index
    Index.index
  end

  def self.download(params)
    Download.new(params).download
  end
end
