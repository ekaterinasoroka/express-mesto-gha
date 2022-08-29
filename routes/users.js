const express = require('express');
const UserRoutes = require('express').Router();
const {
  createUser, getUserById, getUser, updateProfile, updateAvatar,
} = require('../controllers/users');

UserRoutes.post('/users', express.json(), createUser);
UserRoutes.get('/users', express.json(), getUser);
UserRoutes.get('/users/:userId', express.json(), getUserById);
UserRoutes.patch('/users/me', express.json(), updateProfile);
UserRoutes.patch('/users/me/avatar', express.json(), updateAvatar);

module.exports = {
  UserRoutes,
};
