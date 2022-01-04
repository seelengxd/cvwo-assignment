class Task < ApplicationRecord
  after_initialize :default_values
  def default_values
    self.done = false unless done.presence
  end

  belongs_to :project
  validates :title, presence:true
end
