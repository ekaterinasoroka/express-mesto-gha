const express = require('express');
const CardRoutes = require('express').Router();
const {
  getCard, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

CardRoutes.post('/cards', express.json(), createCard);
CardRoutes.get('/cards', express.json(), getCard);
CardRoutes.delete('/cards/:cardId', express.json(), deleteCardById);
CardRoutes.put('/cards/:cardId/likes', express.json(), likeCard);
CardRoutes.delete('/cards/:cardId/likes', express.json(), dislikeCard);

module.exports = {
  CardRoutes,
};
