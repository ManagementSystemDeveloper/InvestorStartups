const httpStatus = require('http-status');
const { omit } = require('lodash');
const APIError = require('../../errors/api-error');
const StartUp = require('../../models/startup.model');
exports.createStartup = async (req, res, next) => {
    try {
        //todo upload and save image file here
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new APIError({
                status: httpStatus.CONFLICT,
                message: 'Picture File is not uploaded'
            }));
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const logo = req.files.logo_file;
        const uploadPath = __dirname + '/uploads/' + logo.name;

        // Use the mv() method to place the file somewhere on your server
        logo.mv(uploadPath, async (err) => {
            if (err)
            return next( new APIError({
                message: 'File Upload Failed',
                status: httpStatus.INTERNAL_SERVER_ERROR,
            }));
            const createReq = omit(req.body, 'logo_file');
            createReq.logo = uploadPath;
            const startup = await new StartUp(createReq).save();
            const startupTransformed = startup.transform();
            res.status(httpStatus.CREATED);
            return res.json({ startup: startupTransformed });    
        });
    } 
    catch (error) {
        return next(error);
    }
}

exports.getAllStartup = async (req, res, next) => {
  try {
    const startups = await StartUp.list(req.body);
    const transformedStartUps = startups.map((startup) => {
        startup = startup.transform();
      return startup;
    });

    res.json(transformedStartUps);
  } catch (error) {
    next(error);
  }
}

exports.updateStartup = async (req, res, next) => {
  const existStartup = await StartUp.findById(req.body.id);
  const updateData = omit(req.body, ['id']);
  const startup = Object.assign(existStartup, updateData);

  startup.save()
    .then((savedStartUp) => res.json(savedStartUp.transform()))
    .catch((e) => next(e));
};

exports.deleteStartup = async (req, res, next) => {
  try {
    const { id } = req.body;
    const startUp = await StartUp.findById(id);
    await startUp.remove();
    res.status(httpStatus.OK);
    return res.json('Startup is deleted');
  } catch (error) {
    return next(error);
  }
}