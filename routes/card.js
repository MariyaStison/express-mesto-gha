const router = require('express').Router();
const {
  getCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike,
} = require('../controllers/card');

router.get('/', getCards);

router.delete('/:id', deleteCard);

router.post('/', createCard);

router.put('/:cardId/likes', putLike);

router.delete('/:cardId/likes', deleteLike);

module.exports = router;
