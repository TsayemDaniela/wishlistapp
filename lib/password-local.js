/* eslint-disable import/prefer-default-export */
import Local from 'passport-local';
import User from '../models/User';

export const localStrategy = new Local.Strategy(User.authenticate());

