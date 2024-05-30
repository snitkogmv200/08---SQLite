const database = require("./../../services/db");
const queries = require("./../queries");

exports.getAllProducts = async (req, res) => {
  try {
    const result = await database.query(queries.getProducts);

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, currency, quantity, active, category_id } =
    req.body;

  try {
    if (!name) {
      return res.status(422).json({ error: "Имя обязательно" });
    }

    if (!price) {
      return res.status(422).json({ error: "Цена обязательна" });
    }

    if (!category_id) {
      return res.status(422).json({ error: "Ссылка на категорию обязательна" });
    } else {
      const existsResult = await database.query(queries.existsProduct, [
        category_id,
      ]);

      if (!existsResult.rows[0].exists) {
        return res
          .status(422)
          .json({ error: "Идентификатор категории не найден" });
      }
    }

    const result = await database.query(queries.createProduct, [
      name,
      description ? description : null,
      price,
      currency ? currency : "USD",
      quantity ? quantity : 0,
      "active" in req.body ? active : true,
      category_id,
    ]);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, currency, quantity, active, category_id } =
    req.body;
  const { id } = req.params;

  try {
    if (
      (!name.length ||
        !description ||
        !price ||
        !currency ||
        !quantity ||
        !active,
      !category_id)
    ) {
      return res
        .status(422)
        .json({ error: "Все поля обязательны для заполнения" });
    }

    const existsResult = await database.query(queries.existsProduct, [
      category_id,
    ]);

    if (!existsResult.rows[0].exists) {
      return res
        .status(422)
        .json({ error: "Идентификатор категории не найден" });
    }

    const result = await database.query(queries.updateProduct, [
      name,
      description,
      price,
      currency,
      quantity,
      active,
      category_id,
      id,
    ]);

    if (result.rowCount == 0) {
      res.status(404).json({ error: "Продукт не найден" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await database.query(queries.deleteProduct, [id]);

    // 2-ой вариант проверки наличия необходимой сущности

    if (result.rowCount == 0) {
      return res.status(404).json({ error: "Продукт не найден" });
    }

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await database.query(queries.getProductById, [id]);

    if (product.rowCount == 0) {
      return res.status(404).json({ error: "Продукт не найден" });
    }

    return res.status(200).json(product.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  console.log(categoryId);

  try {
    const existsResult = await database.query(queries.existsIdInCategory, [
      categoryId,
    ]);

    if (!existsResult.rows[0].exists) {
      return res.status(404).json({ error: "Категория не найдена" });
    }

    const product = await database.query(queries.getProductCategoryById, [
      categoryId,
    ]);

    if (product.rowCount == 0) {
      return res.status(404).json({ error: "Продукт не найден" });
    }

    return res.status(200).json(product.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
