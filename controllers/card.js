const Card = require('../models/card');

const dataErrCode = 400;

const notFoundErrCode = 404;

const defaultErrCode = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(defaultErrCode).send({ message: `Произошла ошибка: ${err.name} ${err.massage}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.send({
          createdAt: card.createdAt,
          likes: card.likes,
          link: card.link,
          name: card.name,
          owner: card.owner,
          _id: card._id,
        });
      } else res.status(notFoundErrCode).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(notFoundErrCode).send({ message: 'Карточка не найдена' });
      return res.status(defaultErrCode).send({ message: `Произошла ошибка: ${err.name} ${err.massage}` });
    });
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({
      createdAt: card.createdAt,
      likes: card.likes,
      link: card.link,
      name: card.name,
      owner: card.owner,
      _id: card._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(dataErrCode).send({ message: 'Переданы некорректные данные в методы создания карточки' });
      return res.status(defaultErrCode).send({ message: `Произошла ошибка: ${err.name} ${err.massage}` });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({
          createdAt: card.createdAt,
          likes: card.likes,
          link: card.link,
          name: card.name,
          owner: card.owner,
          _id: card._id,
        });
      } else res.status(notFoundErrCode).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(dataErrCode).send({ message: 'Переданы некорректные данные в методы добавления лайка' });
      if (err.name === 'CastError') return res.status(notFoundErrCode).send({ message: 'Карточка не найдена' });
      return res.status(defaultErrCode).send({ message: `Произошла ошибка: ${err.name} ${err.massage}` });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({
          createdAt: card.createdAt,
          likes: card.likes,
          link: card.link,
          name: card.name,
          owner: card.owner,
          _id: card._id,
        });
      } else res.status(notFoundErrCode).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(notFoundErrCode).send({ message: 'Карточка не найдена' });
      return res.status(defaultErrCode).send({ message: `Произошла ошибка: ${err.name} ${err.massage}` });
    });
};
