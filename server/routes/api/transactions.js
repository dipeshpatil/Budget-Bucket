const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Middlewares
const auth = require("../../middleware/auth");

// Models
const Transaction = require("../../models/Transaction");

/**
 * @route   POST api/transaction
 * @desc    Create a transaction
 * @access  Private
 */
router.post(
  "/",
  [
    auth,
    [
      check("category", "Category is required").not().isEmpty(),
      check("amount", "Amount is required").not().isEmpty(),
      check("amount", "Amount should be a Number").isNumeric(),
      check("type", "Type is required").not().isEmpty(),
      check("type", "Type should be either Income or Spend").isIn([
        "Spend",
        "Income",
      ]),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { category, description, amount, type } = req.body;
      const newTransaction = {
        user: req.user.id,
        category,
        description,
        amount,
        type,
      };
      const transaction = new Transaction(newTransaction);
      await transaction.save();
      res.json(transaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   GET api/transaction
 * @desc    Get all transactions
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    });
    if (!transactions) {
      return res.status(404).json({ message: "No Transactions Found" });
    }
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   DELETE api/transcation/:id
 * @desc    Delete a transaction
 * @access  Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "No Transaction Found" });
    }
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized!" });
    }
    await transaction.remove();
    res.json({ message: "Transaction Removed!" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Transaction Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/transcation/:id
 * @desc    Edit a transaction
 * @access  Private
 */
router.put(
  "/:id",
  auth,
  [
    check("category", "Category is required").not().isEmpty(),
    check("amount", "Amount is required").not().isEmpty(),
    check("amount", "Amount should be a Number").isNumeric(),
    check("type", "Type is required").not().isEmpty(),
    check("type", "Type should be either Income or Spend").isIn([
      "Spend",
      "Income",
    ]),
  ],
  async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id);

      if (!transaction) {
        return res.status(404).json({ message: "No Transaction Found" });
      }
      if (transaction.user.toString() !== req.user.id) {
        return res.status(401).json({ message: "Not Authorized!" });
      }
      if (transaction) {
        const { category, amount, date, type, description } = req.body;

        if (category) transaction.category = category;
        if (amount) transaction.amount = amount;
        if (date) transaction.date = date;
        if (type) transaction.type = type;
        if (description) transaction.description = description;

        await transaction.save();
      }
      res.json({ message: "Transaction Updated!", transaction });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: "Transaction Not Found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
