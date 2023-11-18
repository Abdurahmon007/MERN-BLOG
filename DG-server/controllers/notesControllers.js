const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcryt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

// @desc    Get all notes
// @route   GET /
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes?.length) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Not found notes" });
  }
  res.status(StatusCodes.BAD_REQUEST).json(notes);
});

// @desc    Create New Note
// @route   Post /
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;
  console.log("create");
  // Confirm data;
  if (!user || !title || !text) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  // Check for duplicate
  const duplicate = await Note.findOne({ title: title }).lean().exec();
  if (duplicate) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "duplicate note title" });
  }

  // Create and store new user
  const note = await Note.create({ user, title, text });

  if (note) {
    res
      .status(StatusCodes.CREATED)
      .json({ message: `New note ${title} created` });
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid note received" });
  }
});

// @desc    Update a note
// @route   Patch /
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const { user, title, text, completed } = req.body;
  // Confirm data
  if (!user || !title || !text) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }
  const note = await Note.findById(id).exec();

  if (!note) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `Note not found` });
  }

  // check for duplicate
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate && duplicate._id.toString() !== id) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Duplicate values not allowed" });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedUser = await note.save();
  res.status(StatusCodes.OK).json({ message: `${title} updated` });
});

// @desc    Delete a User
// @route   Delete /
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Note ID is Required" });
  }
  const note = await User.findById(id).exec();
  if (!note) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "note not found" });
  }

  const result = await Note.deleteOne({ _id: id });
  const reply = `Note ${note.title} with ID ${note._id} deleted`;
  res.status(StatusCodes.OK).json(reply);
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
