const { prisma } = require('../prisma/prisma-client');

const getAllAdmin = async (req, res) => {
	try {
		if (req.user.role !== 'admin') {
			return res.status(400).json({ message: 'Нет прав' });
		}

		const { firstName, lastName, age, course, group } = req.query;

		const employees = await prisma.employee.findMany({
			where: {
				firstName,
				lastName,
				age,
				course,
				group,
			},
		});
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({ message: 'Что-то пошло не так' });
	}
};

//only user
const getAll = async (req, res) => {
	try {
		const { firstName, lastName, age, course, group } = req.query;

		const employees = await prisma.employee.findMany({
			where: {
				firstName,
				lastName,
				age,
				course,
				group,
				userId: req.user.id,
			},
		});
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({ message: 'Не удалось получить абитуриентов' });
	}
};

const getById = async (req, res) => {
	const { id } = req.params;
	try {
		const employee = await prisma.employee.findUnique({
			where: {
				id,
			},
		});
		res.status(200).json(employee);
	} catch (error) {
		res.status(500).json({ message: 'Не удалось найти' });
	}
};

const create = async (req, res) => {
	try {
		const { firstName, lastName, age, group, course } = req.body;

		if (!firstName || !lastName || !group || !age || !course) {
			return res.status(400).json({ message: 'Заполнены не все поля' });
		}

		const employee = await prisma.employee.create({
			data: {
				firstName,
				lastName,
				group,
				age,
				course: parseInt(course),
				user: {
					connect: {
						id: req.user.id,
					},
				},
			},
		});

		return res.status(201).json(employee);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const update = async (req, res) => {
	try {
		const { firstName, lastName, age, group, course } = req.body;
		const { id } = req.params;

		if (!firstName || !lastName || !group || !age || !course) {
			return res.status(400).json({ message: 'Заполнены не все поля' });
		}

		const employee = await prisma.employee.update({
			where: {
				id,
			},
			data: {
				firstName,
				lastName,
				group,
				age,
				course: parseInt(course),
			},
		});

		return res.status(201).json(employee);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

const remove = async (req, res) => {
	const { id } = req.params;
	try {
		const employee = await prisma.employee.delete({
			where: {
				id,
			},
		});
		res.status(204).json({ message: 'OK' });
	} catch (error) {
		res.status(500).json({ message: 'Не удалось найти' });
	}
};

module.exports = {
	getAllAdmin,
	getAll,
	getById,
	create,
	remove,
	update,
};
