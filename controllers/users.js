const User = require('../models/User');

module.exports.getUser = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...error });
  }
};

module.exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    return res.status(200).send(user);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).send({ message: 'Некорректные данные ввода' });
    }
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...error });
  }
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    return res.status(200).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Некорректные данные ввода', ...error });
    }
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...error });
  }
};

module.exports.updateProfile = async (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      owner,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    return res.status(200).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Некорректные данные ввода' });
    }
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...error });
  }
};

module.exports.updateAvatar = async (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      owner,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    return res.status(200).send(user);
  } catch (error) {
    if (error.name === 'ValidatorError') {
      return res.status(400).send({ message: 'Некорректные данные ввода', ...error });
    }
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...error });
  }
};
