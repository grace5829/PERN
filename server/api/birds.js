const router = require('express').Router()
const { models: { Birds }} = require('../db')
module.exports = router
//api/birds in postman 
router.get('/', async (req, res, next) => {
  try {
    const birds = await Birds.findAll()
    res.json(birds)
  } catch (err) {
    next(err)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const {id}=req.params
    res.json(await Birds.findAll( {

        where: { id: id }
    }))
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const newBird = await Birds.create(req.body)
    res.json(newBird)
  } catch (err) {
    next(err)
  }
})
router.put('/:id', async (req, res, next) => {
  try {
    const bird = await Birds.findByPk(req.params.id)
    res.send(await bird.update(req.body))
  } catch (err) {
    next(err)
  }
})
router.delete('/:id', async (req, res, next) => {
  try {
    const bird = await Birds.findByPk(req.params.id)
    await bird.destroy()
    res.send(bird)
  } catch (err) {
    next(err)
  }
})
