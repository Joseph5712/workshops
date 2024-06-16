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
  if (req.query && req.query.id) {
    // Get a specific course by ID
    Course.findById(req.query.id).populate('teacher')
      .then((course) => {
        res.json(course);
      })
      .catch(err => {
        res.status(404);
        console.log('error while querying the course', err);
        res.json({ error: "Course doesn't exist" });
      });
  } else {
    // Get all courses or filter by name and sort
    const { name, sort } = req.query;

    // Create filter and sort options
    const filter = name ? { name: new RegExp(name, 'i') } : {};
    const sortOption = sort === 'desc' ? { name: -1 } : { name: 1 };

    // Find courses with filter and sort
    Course.find(filter).populate('teacher').sort(sortOption)
      .then(courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422);
        console.log('error while querying the courses', err);
        res.json({ "error": err });
      });
  }
};

module.exports = {
  coursePost,
  courseGet
};
