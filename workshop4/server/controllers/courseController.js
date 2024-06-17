const Course = require("../models/courseModel");

/**
 * Creates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = async (req, res) => {
  let course = new Course(req.body);
  await course.save()
    .then(course => {
      res.status(201); // CREATED
      res.header({
        'location': `/api/courses/?id=${course.id}`
        
      });
      
      res.json(course);
    })
    .catch(err => {
      res.status(422);
      console.log('error while saving the course', err);
      res.json({
        error: 'There was an error saving the course'
      });
    });
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {

    const { name, sort } = req.query; // Se extraen los parámetros de consulta 'name' y 'sort' de la solicitud.
    
    //filtro para buscar cursos cuyo nombre coincida parcialmente con el valor de name, ignorando mayúsculas y minúsculas.
    //Si no se proporciona name, el filtro estará vacío ({}).
    const filter = name ? { name: new RegExp(name, 'i') } : {};
    
    //Si sort es igual a desc, ordenamos por name en orden descendente { name: -1 }.
    //De lo contrario, ordenamos en orden ascendente { name: 1 }.
    const sortOption = sort === 'desc' ? { name: -1 } : { name: 1 };
    
    Course.find(filter).sort(sortOption)//buscar cursos que coincidan con el filtro y sortOption para ordenar los resultados según la opción especificada
      .then(courses => {
        res.json(courses);
        // Si se encuentran los cursos, se envía la información de los cursos en formato json
      })
      .catch(err => {
        res.status(422);
        console.log('error while querying the courses', err);
        res.json({ "error": err });
      });
  
};

module.exports = {
  coursePost,
  courseGet
};
