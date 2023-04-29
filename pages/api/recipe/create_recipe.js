import db from "@/database/db";

export default async (req, res) => {
  try {
    const {
      name,
      email,
      title,
      url,
      description,
      cuisine,
      mealtype,
      dietrestricts,
      ingredients,
      steps,
    } = req.body;
    await db.query(
      `INSERT INTO recipe(name,email,title,url,description,cuisine, mealtype, dietrestricts, ingredients,steps) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        name,
        email,
        title,
        url,
        description,
        cuisine,
        mealtype,
        dietrestricts,
        ingredients,
        steps,
      ]
    );
    res.json({
      status: true,
      message: "Recipe Created",
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
