const router = require('express').Router();

router.get('/', (req, res)=>{
    let r = {
        status: 'API Its working',
        message: 'Welcome to Proyecto1'
    };

    res.send(r);
});

const contactController = require('./contactController');
const postController = require('./postController');
/*
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);
*/
//ruta para la cantidad de usuarios
router.route('/usuarios')
    .get(postController.getUsuarios);

//ruta para la cantidad de tweets
router.route('/tweets')
    .get(postController.getTweets);

//ruta para la cantidad de usuario con tweets más creados
router.route('/usuario_tweets')
    .get(postController.usuario_top);

router.route('/grafica_pie')
    .get(postController.grafica_pie);

router.route('/categoria_top')
    .get(postController.categoria_top);

router.route('/categorias')
    .get(postController.categorias);

module.exports = router;
