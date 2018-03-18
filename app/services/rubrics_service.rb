# frozen_string_literal: true

module RubricsService
  def self.index
    Index.index
  end

  def self.create(params)
    Create.new(params).create
  end

  def self.update(params)
    Update.new(params).update
  end

  def self.destroy(params)
    Destroy.new(params).delete
  end
end
