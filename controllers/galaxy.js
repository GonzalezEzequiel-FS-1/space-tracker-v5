const {
  Galaxy
} = require("../src/models")
// GET All Galaxies

const index = async (req, res) => {
  //Search all Galaxies from the DB
  //Method findAll() used
  const galaxies = await Galaxy.findAll()
  //If there are no Galaxies return a message 
  if (!galaxies) {
    res.status(500).send({
      success: false,
      message: `No data served from the server`
    })
  };
  try {
    //If galaxies are found on the server respond with a status 200 and a JSON containing the galaxies.
    res.status(200).json({
      success: true,
      message: `Getting all`,
      data: galaxies,
    })
  } catch (error) {
    res.status(500).send({
      success: true,
      message: `${req.res} failed, consult error >>> ${error}`
    })
  }

}

// GET by ID 
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const id = req.params.id;
  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).send({
      success: false,
      message: 'ID must be a valid positive number'
    });
  }
  try {
    const galaxy = await Galaxy.findByPk(id)
    if (!galaxy) {
      res.status(500).send({
        success: false,
        message: `No Galaxies found`
      })
    }
    res.status(200).json({
      success: true,
      message: `finding by id`,
      data: galaxy,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `${req.params} failed, consult error >>>> ${error}`
    })
  }
}

// POST new Galaxy
const create = async (req, res) => {
  const name = req.params.Name
  const size = req.params.Size
  const desc = req.params.Description
// if(!name || !size || !desc){
//    return res.status(400).send({
//      success:false,
//      message:`${req.method} failed. Please provide all required fields`
//    })
//  }
  
  const newGalaxy = await Galaxy.create({
    Name:name,
    Size:size,
    Description:desc
  })

  if( name || size || desc ){
    return res.redirect(200).json({
      success:true,
      message:`New Galaxy created`,
      data:newGalaxy
    })
  }
//
}

// PUT changes into a Galaxy
const update = (req, res) => {
  // Respond with a single resource and 2xx code
  res.status(200).json(`/galaxies/${req.params.id}`, )
}

// DELETE Galaxy (by ID)
const remove = async (req, res) => {
  const id = Number(req.params.id);
  if (!id || Number.isNaN(id) || id <= 0) {
    return res.status(400).send({
      success: false,
      message: `No valid ID provided`
    });
  }

  try {
    const deletedCount = await Galaxy.destroy({
      where: {
        id: id
      }
    });

    if (deletedCount === 0) {
      return res.status(404).send({
        success: false,
        message: `Galaxy with ID ${id} not found.`
      });
    }

    res.status(200).json({
      success: true,
      message: `Galaxy with ID ${id} deleted.`
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: `${req.method} failed. Consult error: ${error.message}`
    });
  }
};


// Export all controller actions
module.exports = {
  index,
  show,
  create,
  update,
  remove
}
