import Setting from "../models/Setting.js";

export const getSetting = async (key) => {
  try {
    const setting = await Setting.findOne({ where: { key } });
    return setting?.dataValues;
  } catch (err) {
    console.error("Failed to fetch setting:", err);
    throw err;
  }
};

export const setSetting = async (values) => {
  try {
    const { key, value, isActive } = values;

    const [setting, created] = await Setting.findOrCreate({
      where: { key },
      defaults: { value },
    });

    if (isActive) {
      return await Setting.destroy({ where: { key } });
    }

    let returnValue = setting;

    if (!created) {
      returnValue = await Setting.update({ value }, { where: { key } });
    }

    return returnValue;
  } catch (err) {
    console.error("Failed to set setting:", err);
    throw err;
  }
};
