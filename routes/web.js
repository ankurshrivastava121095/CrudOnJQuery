const express = require('express')
const StudentController = require('../controllers/StudentController')
const router = express.Router()


// StudentController
router.get('/',StudentController.index)
router.get('/add',StudentController.add)
router.get('/edit/:id',StudentController.edit)
router.get('/fetchAllStudent',StudentController.fetchAllStudent)
router.post('/store',StudentController.store)
router.get('/fetchById/:id',StudentController.fetchById)
router.put('/update/:id',StudentController.update)
router.delete('/delete/:id',StudentController.delete)


module.exports = router