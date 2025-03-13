const express = require("express");
const router = express.Router();
const db = require("../db/config");


router.post("/", (req, res) => {
    const { name, description, price } = req.body;
    const sql = "INSERT INTO items (name, description, price) VALUES (?, ?, ?)";
    db.query(sql, [name, description, price], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, name, description, price });
    });
});


router.get("/", (req, res) => {
    db.query("SELECT * FROM items", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get("/:id", (req, res) => {
    const sql = "SELECT * FROM items WHERE id = ?";
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Item not found" });
        res.status(200).json(results[0]);
    });
});


router.put("/:id", (req, res) => {
    const { name, description, price } = req.body;
    const sql = "UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?";
    db.query(sql, [name, description, price, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Item not found" });
        res.status(200).json({ message: "Item updated successfully" });
    });
});


router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM items WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Item not found" });
        res.status(200).json({ message: "Item deleted successfully" });
    });
});

module.exports = router;
