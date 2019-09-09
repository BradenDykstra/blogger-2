import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import CommentService from '../services/CommentService';

let _commentService = new CommentService().repository

export default class CommentController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      req.body.author = req.session.uid
      let data = await _commentService.create(req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _commentService.findOneAndUpdate({ _id: req.params.comid, author: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      let data = await _commentService.findOneAndRemove({ _id: req.params.comid, author: req.session.uid })
      res.send('deleted comment')
    } catch (error) { next(error) }
  }
}