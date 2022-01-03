class Task < ApplicationRecord
  after_initialize :default_values
  def default_values
    self.done = false unless self.done.presence
  end
end
