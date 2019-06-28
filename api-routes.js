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

router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

router.route('/grafica_pie')
    .get(postController.grafica_pie);


module.exports = router;
