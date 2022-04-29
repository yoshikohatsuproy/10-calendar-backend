const {Router} = require('express')
const { getEventos,crearEvento,actualizarEvento,eliminarEvento } = require('../controllers/events')
const {validarJWT} = require('../middlewares/validar-jwt')
const {validarCampos} = require('../middlewares/validar-campos')
const {check} = require('express-validator')
const { isDate } = require('../helpers/isDate')

const router = Router()

router.use(validarJWT)
router.get('/', getEventos)

router.post('/', [
    check('title','El título es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es obligatoria').custom(isDate),
    check('end','La fecha final es obligatoria').not().isEmpty(),
    validarCampos
],
 crearEvento)

router.put('/:id',  actualizarEvento)
router.delete('/:id',  eliminarEvento)

module.exports = router