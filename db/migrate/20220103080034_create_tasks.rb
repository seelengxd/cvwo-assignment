class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :description
      t.date :due_date
      t.string :importance
      t.boolean :done

      t.timestamps
    end
  end
end
