const database = require("../../services/db");
const queries = require("./../queries");

exports.getAllCategory = async (req, res) => {
  try {
    const result = await database.query(queries.getCategories);

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!req.body.name) {
      return res.status(422).json({ error: "Имя не должно быть пустым" });
    }

    const existsResult = await database.query(queries.existsCategory, [name]);

    if (existsResult.rows[0].exists) {
      return res.status(409).json({ error: `Имя ${name} уже используется` });
    }

    const result = await database.query(queries.createCategory, [name]);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(422).json({ error: "Имя не должно быть пустым" });
    } else {
      const existsResult = await database.query(queries.existsCategory, [name]);

      if (existsResult.rows[0].exists) {
        return res.status(409).json({ error: `Имя ${name} уже используется` });
      }
    }

    const existsId = await database.query(queries.existsIdInCategory, [id]);

    if (!existsId.rows[0].exists) {
      return res.status(404).json({ error: "Id в категории не найдeн" });
    }

    const result = await database.query(queries.updateCategory, [name, id]);

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const existsCategory = await database.query(queries.existsIdInCategory, [
      id,
    ]);

    if (!existsCategory.rows[0].exists) {
      return res.status(404).json({ error: "Категория не найдена" });
    }

    const countCategory = await database.query(queries.countCategoryInUsing, [
      id,
    ]);

    if (countCategory.rows[0].count > 0) {
      return res
        .status(409)
        .json({ error: "Категория используется в продуктах" });
    }

    await database.query(queries.deleteCategory, [id]);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
