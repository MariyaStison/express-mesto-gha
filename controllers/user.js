const User = require('../models/user');

const { dataErrCode, notFoundErrCode, defaultErrCode } = require('../constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(defaultErrCode).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
      } else res.status(notFoundErrCode).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') res.status(dataErrCode).send({ message: 'Неверный формат запроса' });
      else res.status(defaultErrCode).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(dataErrCode).send({ message: 'Переданы некорректные данные в методы создания пользователя' });
      else res.status(defaultErrCode).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
      } else res.status(notFoundErrCode).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(dataErrCode).send({ message: ` ${err.name} Переданы некорректные данные в методы обновления пользователя` });
      else res.status(defaultErrCode).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
      } else res.status(notFoundErrCode).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(dataErrCode).send({ message: 'Переданы некорректные данные в методы обновления аватара' });
      else res.status(defaultErrCode).send({ message: 'Произошла ошибка' });
    });
};
