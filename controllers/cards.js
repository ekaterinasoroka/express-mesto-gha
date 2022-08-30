const Card = require('../models/Card');

module.exports.getCard = async (req, res) => {
  try {
    const card = await Card.find({});
    return res.status(200).send(card);
  } catch (error) {
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...error });
  }
};

module.exports.createCard = async (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner });
    return res.status(200).send(card);
  } catch (errors) {
    if (errors.name === 'ValidationError') {
      return res.status(400).send({ message: 'Ошибка в запросе', ...errors });
    }
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...errors });
  }
};

module.exports.deleteCardById = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.id);
    if (!card) {
      return res.status(404).send({ message: 'Такой карточки не существует' });
    }
    return res.status(200).send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: 'Некорректные данные для удаления карточки' });
    }
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...error });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return res.status(404).send({ message: 'Такой карточки не существует' });
    }
    return res.status(200).send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: 'Некорректные данные для постановки лайка' });
    }
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...error });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return res.status(404).send({ message: 'Такой карточки не существует' });
    }
    return res.status(200).send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: 'Некорректные данные для постановки лайка' });
    }
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...error });
  }
};
