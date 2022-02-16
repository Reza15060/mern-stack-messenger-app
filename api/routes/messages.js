const router = require("express").Router();
const Message = require("../models/Message");


//add new message
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //delete
  router.delete("/:conversationId", async (req, res) => {
    try {
      const messages = await Message.deleteOne({
        members: { $in: [req.params.conversationId] },
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   router.delete("/:userId", async (req, res) => {
//     try {
//       const messages = await Message.deleteOne({
//         members: { $in: [req.params.userId] },
//       });
//       res.status(200).json(messages);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });




module.exports = router;
