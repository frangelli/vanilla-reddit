# Create Users
leo = User.create(name: "Leonardo Frangelli", email: "leonardo.frangelli@gmail.com")
zen = User.create(name: "ZenHub Team", email: "team@zenhub.com")

# Create some articles for leo
leo.articles.create({title: "Leo's first article", content: Faker::Lorem.paragraph})
leo.articles.create({title: "Leo's second article", content: Faker::Lorem.paragraph})
leo.articles.create({title: "Leo's third article", content: Faker::Lorem.paragraph})

# Create some articles for ZenHub
zen.articles.create({title: "ZenHub's first article", content: Faker::Lorem.paragraph})
zen.articles.create({title: "ZenHub's second article", content: Faker::Lorem.paragraph})
zen.articles.create({title: "ZenHub's third article", content: Faker::Lorem.paragraph})

# Let's create some comments
leo.articles.each do |a|
  a.comments.create({content: Faker::Lorem.sentence, user: zen})
end

zen.articles.each do |a|
  a.comments.create({content: Faker::Lorem.sentence, user: leo})
end