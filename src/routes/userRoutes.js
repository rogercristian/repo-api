import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// nao deveria existir
// router.get('/', loginRequired, userController.index);
router.get('/:id', userController.show);
//

router.post('/', loginRequired, userController.store);
router.put('/:id', loginRequired, userController.update);
router.delete('/:id', loginRequired, userController.delete);
export default router;
