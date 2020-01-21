const { Kelas, User } = require("../models");

exports.createKelas = async (req, res, next) => {
  try {
    const kelas = await Kelas.create({
      name: req.body.name,
      jam: req.body.jam,
    });

    return res.json(kelas);
  } catch (err) {
    next(err);
  }
};

exports.getKelasUser = async (req, res, next) => {
  try {
    const kelas = await Kelas.findByPk(req.params.kelasId, {
      include: [
        {
          model: User,
          attributes: ["email"],
          through: { attributes: [] },
        },
      ],
    });
    res.json(kelas);
  } catch (err) {
    next(err);
  }
};
