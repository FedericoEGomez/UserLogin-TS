import express from 'express';
import apiController from '../controllers/apiController';
import validarID from '../middleware/validarID';
import checksLogin from '../middleware/checksLogin';
import checksEdit from '../middleware/checkEdit';
import checks from '../middleware/checks';
import validarCheck from '../middleware/validarCheck';
import validarJWT from '../middleware/validarJWT';
const router = express.Router();

router.get('/ver',apiController.verUsuarios);
router.post('/registrar' ,checks ,validarCheck ,apiController.register);
router.post('/login' ,checksLogin ,validarCheck ,apiController.loginToken);
router.put('/editar/:id',validarJWT,validarID,checksEdit ,validarCheck ,apiController.editarUnUsuario);
router.delete('/eliminar/:id',validarJWT ,validarID, apiController.eliminarUsuario);


export default router;