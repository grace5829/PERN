const router = require('express').Router()
const { models: { Birds }} = require('../db')
module.exports = router
//api/birds in postman 
router.get('/', async (req, res, next) => {
  try {
    console.log("working")
    const birds = await Birds.findAll()
    res.json(birds)
  } catch (err) {
    next(err)
  }
})
