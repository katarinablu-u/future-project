const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");

const app = express();
const PORT = 3000;
const db = new sqlite3.Database("./shop.db");

app.use(express.json());
app.use(cors());

// Create tables if not exist
const createTables = () => {
  db.run(`CREATE TABLE IF NOT EXISTS shoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    name TEXT,
    rating REAL,
    reviews INTEGER,
    price REAL,
    soldout BOOLEAN,
    color TEXT,
    size TEXT,
    gender TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS clothes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    name TEXT,
    rating REAL,
    reviews INTEGER,
    price REAL,
    soldout BOOLEAN,
    color TEXT,
    size TEXT,
    gender TEXT,
    type TEXT
  )`);
};

createTables();

const insertDummyData = () => {
  // Real shoes data
  const shoesData = [
    {
      id: 35,
      title: "Futuristic Holographic Soccer Cleats",
      price: 39,
      images: [
        "https://i.imgur.com/qNOjJje.jpeg",
        "https://i.imgur.com/NjfCFnu.jpeg",
        "https://i.imgur.com/eYtvXS1.jpeg",
      ],
    },
    {
      id: 36,
      title: "Rainbow Glitter High Heels",
      price: 39,
      images: [
        "https://i.imgur.com/62gGzeF.jpeg",
        "https://i.imgur.com/5MoPuFM.jpeg",
        "https://i.imgur.com/sUVj7pK.jpeg",
      ],
    },
    {
      id: 37,
      title: "Chic Summer Denim Espadrille Sandals",
      price: 33,
      images: [
        "https://i.imgur.com/9qrmE1b.jpeg",
        "https://i.imgur.com/wqKxBVH.jpeg",
        "https://i.imgur.com/sWSV6DK.jpeg",
      ],
    },
    {
      id: 38,
      title: "Vibrant Runners: Bold Orange & Blue Sneakers",
      price: 27,
      images: [
        "https://i.imgur.com/hKcMNJs.jpeg",
        "https://i.imgur.com/NYToymX.jpeg",
        "https://i.imgur.com/HiiapCt.jpeg",
      ],
    },
    {
      id: 39,
      title: "Vibrant Pink Classic Sneakers",
      price: 84,
      images: ["https://i.imgur.com/qNOjJje.jpeg"], // Note: The provided data was cut off, using available image
    },
  ];

  // Real clothes data
  const clothesData = [
    {
      id: 2,
      title: "Classic Red Pullover Hoodie",
      price: 10,
      images: [
        "https://i.imgur.com/1twoaDy.jpeg",
        "https://i.imgur.com/FDwQgLy.jpeg",
        "https://i.imgur.com/kg1ZhhH.jpeg",
      ],
    },
    {
      id: 3,
      title: "Classic Heather Gray Hoodie",
      price: 69,
      images: [
        "https://i.imgur.com/cHddUCu.jpeg",
        "https://i.imgur.com/CFOjAgK.jpeg",
        "https://i.imgur.com/wbIMMme.jpeg",
      ],
    },
    {
      id: 4,
      title: "Classic Grey Hooded Sweatshirt",
      price: 90,
      images: [
        "https://i.imgur.com/R2PN9Wq.jpeg",
        "https://i.imgur.com/IvxMPFr.jpeg",
        "https://i.imgur.com/7eW9nXP.jpeg",
      ],
    },
    {
      id: 5,
      title: "Classic Black Hooded Sweatshirt",
      price: 79,
      images: [
        "https://i.imgur.com/cSytoSD.jpeg",
        "https://i.imgur.com/WwKucXb.jpeg",
        "https://i.imgur.com/cE2Dxh9.jpeg",
      ],
    },
    {
      id: 6,
      title: "Classic Comfort Fit Joggers",
      price: 25,
      images: ["https://i.imgur.com/QkIa5tT.jpeg"], // Using category image as main image wasn't provided
    },
  ];

  // Helper function to generate realistic ratings and reviews
  const generateRating = (index) => (3.8 + index * 0.2 + Math.random() * 0.4).toFixed(1);
  const generateReviews = (index) => Math.floor(50 + index * 15 + Math.random() * 100);

  // Helper function to extract color from title/description
  const extractColor = (title) => {
    const colors = [
      "red",
      "gray",
      "grey",
      "black",
      "blue",
      "orange",
      "pink",
      "rainbow",
      "holographic",
      "denim",
    ];
    const lowerTitle = title.toLowerCase();
    for (let color of colors) {
      if (lowerTitle.includes(color)) {
        return color === "grey" ? "gray" : color;
      }
    }
    return "multi";
  };

  // Helper function to determine gender based on product type
  const determineGender = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("high heel")) return "female";
    if (lowerTitle.includes("soccer") || lowerTitle.includes("runner")) return "unisex";
    return "unisex";
  };

  // Helper function to determine clothing type
  const determineClothingType = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("hoodie") || lowerTitle.includes("sweatshirt")) return "hoodie";
    if (lowerTitle.includes("jogger")) return "pants";
    return "shirt";
  };

  // Insert shoes data
  db.get("SELECT COUNT(*) as count FROM shoes", (err, row) => {
    if (err) {
      console.error("Error checking shoes table:", err);
      return;
    }
    if (row && row.count === 0) {
      const stmt = db.prepare(
        `INSERT INTO shoes (image, name, rating, reviews, price, soldout, color, size, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );

      shoesData.forEach((shoe, index) => {
        stmt.run(
          shoe.images[0], // Use first image as main image
          shoe.title,
          parseFloat(generateRating(index)),
          generateReviews(index),
          shoe.price,
          Math.random() > 0.8 ? 1 : 0, // 20% chance of being sold out
          extractColor(shoe.title),
          index % 2 === 0 ? "9" : "10", // Alternate between sizes
          determineGender(shoe.title)
        );
      });

      stmt.finalize();
      console.log("Real shoes dummy data inserted");
    }
  });

  // Insert clothes data
  db.get("SELECT COUNT(*) as count FROM clothes", (err, row) => {
    if (err) {
      console.error("Error checking clothes table:", err);
      return;
    }
    if (row && row.count === 0) {
      const stmt = db.prepare(
        `INSERT INTO clothes (image, name, rating, reviews, price, soldout, color, size, gender, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );

      clothesData.forEach((cloth, index) => {
        const sizes = ["S", "M", "L", "XL"];
        stmt.run(
          cloth.images[0], // Use first image as main image
          cloth.title,
          parseFloat(generateRating(index)),
          generateReviews(index),
          cloth.price,
          Math.random() > 0.7 ? 1 : 0, // 30% chance of being sold out
          extractColor(cloth.title),
          sizes[index % sizes.length], // Cycle through sizes
          "unisex", // Most hoodies and joggers are unisex
          determineClothingType(cloth.title)
        );
      });

      stmt.finalize();
      console.log("Real clothes dummy data inserted");
    }
  });
};

insertDummyData();

const buildQuery = (type, query) => {
  const filters = [];
  const values = [];

  ["color", "size", "gender"].forEach((key) => {
    if (query[key]) {
      filters.push(`${key} = ?`);
      values.push(query[key]);
    }
  });

  if (type === "clothes" && query.type) {
    filters.push(`type = ?`);
    values.push(query.type);
  }

  let order = "id DESC";
  if (query.sort === "oldest") order = "id ASC";
  else if (query.sort === "high_rating") order = "rating DESC";

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  return {
    sql: `SELECT * FROM ${type} ${whereClause} ORDER BY ${order}`,
    values,
  };
};

/**
 * @swagger
 * /{type}:
 *   get:
 *     summary: 상품 목록 조회 (신발 또는 의류)
 *     description: "필터 및 정렬 조건을 통해 신발 또는 의류 목록을 조회합니다."
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [shoes, clothes]
 *         description: "상품 종류 (shoes 또는 clothes)"
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: "색상 필터 (예: red)"
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *         description: "사이즈 필터 (예: 10 or M)"
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         description: "성별 필터 (예: male, female, unisex)"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: "의류 타입 필터 (clothes만 해당, 예: shirt, jacket)"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [latest, oldest, high_rating]
 *         description: "정렬 기준 (latest, oldest, high_rating)"
 *     responses:
 *       200:
 *         description: "상품 목록 반환"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   image:
 *                     type: string
 *                   name:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   reviews:
 *                     type: integer
 *                   price:
 *                     type: number
 *                   soldout:
 *                     type: boolean
 *                   color:
 *                     type: string
 *                   size:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   type:
 *                     type: string
 *                     nullable: true
 */
// Middleware to validate type parameter
const validateType = (req, res, next) => {
  const validTypes = ["shoes", "clothes"];
  if (!validTypes.includes(req.params.type)) {
    return res.status(400).json({ error: 'Invalid type. Must be "shoes" or "clothes"' });
  }
  next();
};

// Swagger options and setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shoes & Clothes API",
      version: "1.0.0",
      description: "신발과 의류 상품을 조회 및 관리할 수 있는 API 입니다.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [__filename],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/:type", validateType, (req, res) => {
  const { sql, values } = buildQuery(req.params.type, req.query);
  db.all(sql, values, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/**
 * @swagger
 * /{type}:
 *   post:
 *     summary: 새 상품 등록 (신발 또는 의류)
 *     description: "신발 또는 의류 상품을 새로 등록합니다."
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [shoes, clothes]
 *         description: "상품 종류"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               name:
 *                 type: string
 *                 example: "New Shoe"
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               reviews:
 *                 type: integer
 *                 example: 100
 *               price:
 *                 type: number
 *                 example: 59.99
 *               soldout:
 *                 type: boolean
 *                 example: false
 *               color:
 *                 type: string
 *                 example: "red"
 *               size:
 *                 type: string
 *                 example: "10"
 *               gender:
 *                 type: string
 *                 example: "male"
 *               type:
 *                 type: string
 *                 example: "shirt"
 *                 nullable: true
 *     responses:
 *       201:
 *         description: "상품 등록 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 */
app.post("/:type", validateType, (req, res) => {
  const data = req.body;

  // Validate required fields
  if (!data.name || !data.price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  // Filter out undefined/null values and invalid fields
  const validFields =
    req.params.type === "shoes"
      ? ["image", "name", "rating", "reviews", "price", "soldout", "color", "size", "gender"]
      : [
          "image",
          "name",
          "rating",
          "reviews",
          "price",
          "soldout",
          "color",
          "size",
          "gender",
          "type",
        ];

  const filteredData = {};
  validFields.forEach((field) => {
    if (data[field] !== undefined && data[field] !== null) {
      filteredData[field] = data[field];
    }
  });

  const keys = Object.keys(filteredData);
  const values = Object.values(filteredData);
  const placeholders = keys.map(() => "?").join(", ");

  db.run(
    `INSERT INTO ${req.params.type} (${keys.join(",")}) VALUES (${placeholders})`,
    values,
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

/**
 * @swagger
 * /{type}/{id}:
 *   get:
 *     summary: 특정 상품 조회
 *     description: "ID로 특정 상품을 조회합니다."
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [shoes, clothes]
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "조회할 상품 ID"
 *     responses:
 *       200:
 *         description: "상품 정보 반환"
 *       404:
 *         description: "상품을 찾을 수 없음"
 */
app.get("/:type/:id", validateType, (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  db.get(`SELECT * FROM ${req.params.type} WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Item not found" });
    res.json(row);
  });
});

/**
 * @swagger
 * /{type}/{id}:
 *   put:
 *     summary: 상품 전체 수정 (신발 또는 의류)
 *     description: "상품 정보를 전체 수정합니다."
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [shoes, clothes]
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "수정할 상품 ID"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *               name:
 *                 type: string
 *               rating:
 *                 type: number
 *               reviews:
 *                 type: integer
 *               price:
 *                 type: number
 *               soldout:
 *                 type: boolean
 *               color:
 *                 type: string
 *               size:
 *                 type: string
 *               gender:
 *                 type: string
 *               type:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: "수정 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: integer
 *                   description: "수정된 행 개수"
 *       404:
 *         description: "상품을 찾을 수 없음"
 */
app.put("/:type/:id", validateType, (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const data = req.body;

  // Validate required fields for PUT
  if (!data.name || !data.price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  // Filter valid fields
  const validFields =
    req.params.type === "shoes"
      ? ["image", "name", "rating", "reviews", "price", "soldout", "color", "size", "gender"]
      : [
          "image",
          "name",
          "rating",
          "reviews",
          "price",
          "soldout",
          "color",
          "size",
          "gender",
          "type",
        ];

  const filteredData = {};
  validFields.forEach((field) => {
    if (data[field] !== undefined) {
      filteredData[field] = data[field];
    }
  });

  const keys = Object.keys(filteredData);
  const values = Object.values(filteredData);
  const assignments = keys.map((k) => `${k} = ?`).join(", ");
  values.push(id);

  db.run(`UPDATE ${req.params.type} SET ${assignments} WHERE id = ?`, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Item not found" });
    res.json({ updated: this.changes });
  });
});

/**
 * @swagger
 * /{type}/{id}:
 *   patch:
 *     summary: 상품 부분 수정 (신발 또는 의류)
 *     description: "상품 정보를 일부 수정합니다."
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [shoes, clothes]
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "수정할 상품 ID"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             name: "new name"
 *     responses:
 *       200:
 *         description: "수정 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: integer
 *                   description: "수정된 행 개수"
 *       404:
 *         description: "상품을 찾을 수 없음"
 */
app.patch("/:type/:id", validateType, (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const data = req.body;

  // Check if request body is empty
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: "Request body cannot be empty" });
  }

  // Filter valid fields
  const validFields =
    req.params.type === "shoes"
      ? ["image", "name", "rating", "reviews", "price", "soldout", "color", "size", "gender"]
      : [
          "image",
          "name",
          "rating",
          "reviews",
          "price",
          "soldout",
          "color",
          "size",
          "gender",
          "type",
        ];

  const filteredData = {};
  validFields.forEach((field) => {
    if (data[field] !== undefined) {
      filteredData[field] = data[field];
    }
  });

  if (Object.keys(filteredData).length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  const keys = Object.keys(filteredData);
  const values = Object.values(filteredData);
  const assignments = keys.map((k) => `${k} = ?`).join(", ");
  values.push(id);

  db.run(`UPDATE ${req.params.type} SET ${assignments} WHERE id = ?`, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Item not found" });
    res.json({ updated: this.changes });
  });
});

/**
 * @swagger
 * /{type}/{id}:
 *   delete:
 *     summary: 상품 삭제
 *     description: "특정 상품을 삭제합니다."
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [shoes, clothes]
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "삭제할 상품 ID"
 *     responses:
 *       200:
 *         description: "삭제 성공"
 *       404:
 *         description: "상품을 찾을 수 없음"
 */
app.delete("/:type/:id", validateType, (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  db.run(`DELETE FROM ${req.params.type} WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Item not found" });
    res.json({ deleted: this.changes });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
