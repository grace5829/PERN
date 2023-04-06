'use strict'

const {db, models: {User} } = require('../server/db')
const Birds = require('../server/db/models/birds')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])
  const birds = await Promise.all([
    Birds.create({ name:'Northern Flicker', family:'Picidae', habitat:'Open Woodlands', description:'Northern Flickers are large, brown woodpeckers with a gentle expression and handsome black-scalloped plumage. On walks, don’t be surprised if you scare one up from the ground. It’s not where you’d expect to find a woodpecker, but flickers eat mainly ants and beetles, digging for them with their unusual, slightly curved bill. When they fly you’ll see a flash of color in the wings – yellow if you’re in the East, red if you’re in the West – and a bright white flash on the rump.'}),
    Birds.create({ name:'Red-naped Sapsucker', family:'Picidae', habitat:'Forest', description:'Red-naped Sapsuckers are industrious woodpeckers with a taste for sugar. They drill neat little rows of holes in aspen, birch, and willow to lap up the sugary sap that flows out. The presence of sap wells is a good indication that they are around, but so are their harsh wailing cries and stuttered drumming. The red patch on the back of their head helps separate these sharply dressed black-and-white sapsuckers from Yellow-bellied Sapsuckers in the East and Red-breasted Sapsuckers along the western coastal states.'}),
    Birds.create({ name:'Northern Cardinal', family:'Cardinalidae', habitat:'Open Woodlands', description:'The male Northern Cardinal is perhaps responsible for getting more people to open up a field guide than any other bird. They’re a perfect combination of familiarity, conspicuousness, and style: a shade of red you can’t take your eyes off. Even the brown females sport a sharp crest and warm red accents. Cardinals don’t migrate and they don’t molt into a dull plumage, so they’re still breathtaking in winter’s snowy backyards. In summer, their sweet whistles are one of the first sounds of the morning.'}),
    Birds.create({ name:'Phainopepla', family:'Ptiliogonatidae', habitat:'Scrub', description:'A singular bird of the Southwest, the Phainopepla is a brilliant sight in flight. Males are silky black and slender, with an elegant crest and bold white wing patches that appear when the bird takes wing. Females are similar but a subdued gray. These glossy birds occur in desert washes, where they eat mainly mistletoe berries, and in oak and sycamore woodlands of California and Arizona. They often perch high in shrubs and catch insects on the wing.'}),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
