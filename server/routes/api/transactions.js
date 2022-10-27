const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Middlewares
const auth = require("../../middleware/auth");

// Models
const Transaction = require("../../models/Transaction");

const {
  SERVER_ERROR,
  NOT_AUTHORIZED,
  CATEGORY_REQUIRED,
  AMOUNT_REQUIRED,
  VALID_AMOUNT,
  TYPE_REQUIRED,
  VALID_TYPE,
  VALID_TYPE_VALUES,
  TRANSACTION_NOT_FOUND,
  TRANSACTION_REMOVED,
  TRANSACTION_UPDATED,
} = config.get("strings");

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
      check("category", CATEGORY_REQUIRED).not().isEmpty(),
      check("amount", AMOUNT_REQUIRED).not().isEmpty(),
      check("amount", VALID_AMOUNT).isNumeric(),
      check("type", TYPE_REQUIRED).not().isEmpty(),
      check("type", VALID_TYPE).isIn(VALID_TYPE_VALUES),
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
      res.status(500).send(SERVER_ERROR);
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
      return res.status(404).json({ message: TRANSACTION_NOT_FOUND });
    }
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR);
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
      return res.status(404).json({ message: TRANSACTION_NOT_FOUND });
    }
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: NOT_AUTHORIZED });
    }
    await transaction.remove();
    res.json({ message: TRANSACTION_REMOVED });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: TRANSACTION_NOT_FOUND });
    }
    res.status(500).send(SERVER_ERROR);
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
    check("category", CATEGORY_REQUIRED).not().isEmpty(),
    check("amount", AMOUNT_REQUIRED).not().isEmpty(),
    check("amount", VALID_AMOUNT).isNumeric(),
    check("type", VALID_TYPE).not().isEmpty(),
    check("type", TYPE_REQUIRED).isIn(VALID_TYPE_VALUES),
  ],
  async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id);

      if (!transaction) {
        return res.status(404).json({ message: TRANSACTION_NOT_FOUND });
      }
      if (transaction.user.toString() !== req.user.id) {
        return res.status(401).json({ message: NOT_AUTHORIZED });
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
      res.json({ message: TRANSACTION_UPDATED, transaction });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: TRANSACTION_NOT_FOUND });
      }
      res.status(500).send(SERVER_ERROR);
    }
  }
);

module.exports = router;
