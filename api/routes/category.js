import { Router } from 'express';
import { getRepository, getManager } from 'typeorm';
import isAuthenticated from '../middleware/isAuthenticated';
import Category from '../entities/category';

const router = Router();
router.route('/cats')
  .all(isAuthenticated)
  .get((req, res) => {
    res.send(req.user.categories);
  })
  .post((req, res) => {
    const { name } = req.body;
    const manager = getManager();
    const category = manager.create(Category, { name });
    category.user = req.user;
    manager.save(category).then((savedCategory) => {
      res.send(savedCategory);
    });
  });

export default router;
