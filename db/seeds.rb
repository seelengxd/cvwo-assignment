# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.delete_all
Project.delete_all

project = Project.create(name: 'Project 1')

3.times do |i|
  task = project.tasks.build(title: "Task #{i + 1}",
                             description: 'Task description',
                             due_date: Date.new(2021, 11, 11) + rand(30),
                             done: false,
                             importance: %w[Low Medium High][rand(3)])
  task.save
end
