const express = require('express');
const { auth } = require('../middleware/auth');
const {
	getAllAdmin,
	getAll,
	create,
	remove,
	update,
	getById,
} = require('../controllers/employees');

const router = express.Router();

// /api/employees/
router.get('/', auth, getAll);
// /api/employees/:id
router.get('/:id', auth, getById);

// /api/employees/create
router.post('/create', auth, create);

// /api/employees/edit
router.put('/edit/:id', auth, update);

// /api/employees/remove
router.delete('/remove/:id', auth, remove);

// /api/employees/admin/all
router.get('/admin/all', auth, getAllAdmin);

module.exports = router;
