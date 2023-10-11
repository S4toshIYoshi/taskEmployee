const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'Поля не заполненны' });
	}

	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	if(!user) {
		return res.status(400).json({ message: 'Пользователя с таким email не существует' });
	}

	const isPassword = user && (await brypt.compare(password, user.password));
	const secret = process.env.JWT_SECRET;

	if (user && isPassword && secret) {
		res.status(200).json({
			id: user.id,
			email: user.email,
			nickName: user.nickName,
			role: user.role,
			token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
		});
	} else {
		return res.status(400).json({ message: 'Неверно введен логин или пароль' });
	}
};

const register = async (req, res) => {
	const { email, password, nickName, group, FirstName, LastName } = req.body;

	console.log(req.body);

	if (!email || !password || !nickName || !group || !FirstName || !LastName) {
		return res.status(400).json({ message: 'Обязательные поля не заполнены' });
	}

	const registeredUser = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	const isNickName = await prisma.user.findFirst({
		where: {
			nickName,
		},
	});

	if (isNickName) {
		return res
			.status(400)
			.json({ message: 'Пользователь с таким никнеймом уже существует' });
	}

	if (registeredUser) {
		return res
			.status(400)
			.json({ message: 'Пользователь с таким email уже существует' });
	}

	const salt = await brypt.genSalt(10);
	const hashedPassword = await brypt.hash(password, salt);

	const user = await prisma.user.create({
		data: {
			email,
			nickName,
			password: hashedPassword,
			group,
			FirstName,
			LastName,
			role: 'default',
		},
	});

	const secret = process.env.JWT_SECRET;

	if (user && secret) {
		res.status(200).json({
			id: user.id,
			email: user.email,
			nickName,
			role: user.role,
			token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
		});
	} else {
		return res.status(400).json({ message: 'Не удалось создать пользователя' });
	}
};

const current = async (req, res) => {
	return res.status(200).json(req.user);
};

module.exports = {
	login,
	current,
	register,
};
