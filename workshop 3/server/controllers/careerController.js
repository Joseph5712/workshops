const Career = require("../models/careerModel");

// Controlador para crear una nueva carrera
const createCareer = (req, res) => {
  const newCareer = new Career({
    name: req.body.name,
    code: req.body.code,
    description: req.body.description
  });

  newCareer.save()
    .then(savedCareer => {
      res.status(201).json(savedCareer);
    })
    .catch(error => {
      console.error("Error al guardar la carrera:", error);
      res.status(422).json({ error: "Hubo un error al guardar la carrera" });
    });
};

// Controlador para obtener carreras
const getCareer = (req, res) => {
  if (req.query.id) {
    Career.findById(req.query.id)
      .then(career => {
        if (!career) {
          return res.status(404).json({ error: "Carrera no encontrada" });
        }
        res.json(career);
      })
      .catch(error => {
        console.error("Error al buscar la carrera:", error);
        res.status(500).json({ error: "Hubo un error al buscar la carrera" });
      });
  } else {
    Career.find()
      .then(careers => {
        res.json(careers);
      })
      .catch(error => {
        console.error("Error al obtener las carreras:", error);
        res.status(500).json({ error: "Hubo un error al obtener las carreras" });
      });
  }
};

// Controlador para actualizar una carrera
const updateCareer = async (req, res) => {
  const { id } = req.query;
  
  if (id) {
    try {
      const updatedCareer = await Career.findByIdAndUpdate(
        id,
        {
          name: req.body.name,
          code: req.body.code,
          description: req.body.description
        },
        { new: true, runValidators: true }
      );

      if (!updatedCareer) {
        return res.status(404).json({ error: "Carrera no encontrada" });
      }

      res.json(updatedCareer);
    } catch (error) {
      console.error("Error al actualizar la carrera:", error);
      res.status(500).json({ error: "Hubo un error al actualizar la carrera" });
    }
  } else {
    res.status(400).json({ error: "No se proporcionó un ID" });
  }
};

// Controlador para eliminar una carrera
const deleteCareer = async (req, res) => {
  const { id } = req.query;
  
  if (id) {
    try {
      const career = await Career.findById(id);

      if (!career) {
        return res.status(404).json({ error: "Carrera no encontrada" });
      }

      await Career.deleteOne({ _id: id });
      res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar la carrera:", error);
      res.status(500).json({ error: "Hubo un error al eliminar la carrera" });
    }
  } else {
    res.status(400).json({ error: "No se proporcionó un ID" });
  }
};

module.exports = {
  createCareer,
  getCareer,
  updateCareer,
  deleteCareer
};
