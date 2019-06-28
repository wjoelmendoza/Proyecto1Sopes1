Publicacion = require('./postModel')


/**
 * se encarga de registrar un nuevo post
 * 
 */
exports.new = function (req, res, datos) {

    let publicacion = new Publicacion();
    publicacion.nombre = datos.nom;
    publicacion.usuario = datos.usr;
    publicacion.txt = datos.txt;
    
    let categorias = getCategoria(datos.txt);

    if (categorias.length == 1) {
        publicacion.categoria = categorias[0];
    } else if(categorias.length > 1){
        res.json({
            estado: 'error',
            mensaje: 'un tweet no puede tener mas de una categoria',
            data: categorias
        });
        return;
    }

    publicacion.save(function(err){
        if(err){
            res.json({
                estado: 'error',
                mensaje: 'No se registro la publicacion'
            });
        }

        res.json({
            estado: 'hecho',
            mensaje: 'se creo una nueva publicacion',
            data: publicacion
        });
    });
}

/**
 * se encarga de sacar las posibles categoria del tweet
 * @param {String} texto 
 * @returns {Array} de cadenas posiblemente vacio
 */
function getCategoria(texto) {
    let r = /#(\w|\d)+/g;
    let lst = [];
    let f;
    while (true) {
        f = r.exec(texto);
        if (f == null) {
            break;
        }
        let cath = f[0];
        let cat = cath.slice(1);
        lst.push(cat);
    }
    return lst;
}

exports.index = function(req, res){
    Publicacion.get(function(err, datos){
        if(err){
            res.json({
                estado: 'error',
                mensaje: err
            });
        }

        res.json({
            estado: 'hecho',
            mensaje: 'los registros son',
            datos: datos
        });
    });
};

exports.grafica_pie = function(req, res){
    let query = [
        {
            $group : {
                _id:"$categoria",
                cantidad: {$sum:1}
            }
        },
        {
            $sort: {"cantidad": -1}
        },
        {
            $limit: 10
        },
        {
            $project: {
                _id:false,
                categoria: "$_id",
                cantidad: "$cantidad"
            }
        }
    ];
    Publicacion.aggregate(query,function(err, datos){
        
        res.json({
            estado:"hecho",
            mensaje:"datos para la grafica de pie",
            datos: datos
        });
    });
};