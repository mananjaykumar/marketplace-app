require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Airtable = require("airtable");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Airtable configuration
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// Function to return recordID
const getRecordID = async (product_id) => {
  const records = await base("Products")
    .select({
      filterByFormula: `ID = "${product_id}"`, // Use RECORD_ID() for matching record IDs
      maxRecords: 1, // Get only one record
    })
    .firstPage();

  if (records.length === 0) {
    throw new Error("No matching product found.");
  }
  return records;
};

// Routes

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = [];
    await base("Products")
      .select()
      .eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
          products.push({ id: record.id, ...record.fields });
        });
        fetchNextPage();
      });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new product
app.post("/api/products", async (req, res) => {
  try {
    const { name, description, price, image, email } = req.body;
    const createdProduct = await base("Products").create({
      name: name,
      description: description,
      price: price,
      image: image,
      email: email,
    });
    res.status(201).json({ id: createdProduct.id, ...createdProduct.fields });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const records = await getRecordID(id);
    await base("Products").destroy(records[0]?.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Find a product
app.get("/api/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const records = await getRecordID(id);
    res.status(200).json({
      message: "Product fetched Successfully",
      data: records[0]._rawJson,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit a product
app.post("/api/product/edit", async (req, res) => {
  const { name, description, image, email, price, recordId } = req.body;
  const updatedFields = {
    name,
    description,
    image,
    price,
    email,
  };
  try {
    const updatedRecord = await base("Products").update(
      recordId,
      updatedFields
    );
    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedRecord });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place an order
app.post("/api/orders", async (req, res) => {
  const { product_id, buyer_name, buyer_email } = req.body;

  try {
    const records = await getRecordID(product_id);
    const createdOrder = await base("Orders").create({
      product_id: [records[0]?.id],
      buyer_name: buyer_name,
      buyer_email: buyer_email,
    });
    res.status(201).json({ id: createdOrder.id, ...createdOrder.fields });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = [];
    await base("Orders")
      .select()
      .eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
          orders.push({ id: record.id, ...record.fields });
        });
        fetchNextPage();
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
