const Journal = require("../models/Journal");
const Comment = require("../models/Comment");
// const path = require('path')
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");

module.exports = {
  //Create a Journal Entry
  //POST
  //url/api/journal/createJournal
  createJournal: async (req, res) => {
    console.log(req.sessionID);
    try {
      const {
        title,
        posPromptOne,
        posPromptTwo,
        posPromptThree,
        improvPrompt,
        isPublic,
        image,
        dayRating,
        date,
      } = req.body;

      //Check if there is a Journal that exists for the current date, if there is a Journal that exists already tell the user to pick a diff date
      const findDate = await Journal.find({ stringDate: date });
      console.log(findDate);
      if (findDate.length != 0) {
        return res.json("There already exists a journal for this date");
      }

      //The image body is sent as an array and needs to be converted into the correct array format prior to saving in the MongoDB document store
      const result = [];
      const cloud = [];
      //Loop through the image array and upload each image onto cloudinary and save the URL and IDs in the result and cloud array
      for (let i = 0; i < image.length; i++) {
        if (image[i] == 0) {
          continue;
        }
        result[i] = await cloudinary.uploader.upload(image[i]);
        cloud[i] = result[i].public_id;
        result[i] = result[i].secure_url;
      }

      //Create the journal in the MongoDB store
      const journal = await Journal.create({
        title: title,
        posPromptOne: posPromptOne,
        posPromptTwo: posPromptTwo,
        posPromptThree: posPromptThree,
        improvPrompt: improvPrompt,
        isPublic: isPublic == "1" ? true : false, //if the string is true set isPublic to true
        cloudinaryID: cloud,
        imageURL: result,
        user: req.user,
        likes: 0,
        moodState: dayRating,
        journalDate: date,
        stringDate: date,
      });
      console.log("Journal Entry has been created");
      res.json({ journal });
    } catch (err) {
      console.log(err);
    }
  },
  //Get A single Journal Entry
  //GET
  //api/journal/:id
  getJournal: async (req, res) => {
    try {
      const journal = await Journal.findById(req.params.id);
      const user = await User.findById(journal.user);
      const profile = await Profile.find({user: req.user.id})
      res.json({ journal: journal, user: user, profile: profile[0].favourites });
    } catch (err) {
      console.log(err);
    }
  },
  //Get all Jounral Entries by the user
  //GET
  // url/dashboard/:id
  getUserFeed: async (req, res) => {
    try {
      //const user = await User.findById({id: req.user})    //change to req.user
      const journals = await Journal.find({ user: req.params.id }).sort({
        createAt: "desc",
      });
      //Find the profile information as well
      const profile = await Profile.find({ user: req.params.id });
      res.json({ journal: journals, profile: profile });
    } catch (err) {
      console.log(err);
    }
  },
  //Delete a specific Journal Entry
  //DELETE
  // api/journal/deleteJournal/:id
  deleteJournal: async (req, res) => {
    try {
      //Find Journal
      let journal = await Journal.findById({ _id: req.params.id });
      //Delete image from cloudinary by looping through the cloudinary array and deleting each image
      for (let i = 0; i < journal.cloudinaryID.length; i++) {
        await cloudinary.uploader.destroy(journal.cloudinaryID[i]);
      }

      //Need to delete any comments that have this JournalID associated with them
      await Comment.deleteMany({ journalID: req.params.id });
      //Delete Post from DB
      await Journal.deleteOne({ _id: req.params.id });
      res.json("Deleted Journal");
    } catch (err) {
      console.log(err);
    }
  },
  //Update a Journal
  //PUT
  //api/journal/updateJournal/:id'
  updateJournal: async (req, res) => {
    //Add method to update the image
    try {
      const {
        title,
        posPromptOne,
        posPromptTwo,
        posPromptThree,
        improvPrompt,
        isPublic,
      } = req.body;

      const editJournal = await Journal.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title,
          posPromptOne: posPromptOne,
          posPromptTwo: posPromptTwo,
          posPromptThree: posPromptThree,
          improvPrompt: improvPrompt,
          isPublic: isPublic == "1" ? true : false,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(editJournal);
    } catch (err) {
      console.log(err);
    }
  },
  //Search journals and followers and returns both
  //GET
  // api/journal/search/:id
  searchJournals: async (req, res) => {
    try {
      const query = req.query.search;
      const id = req.params.id;
      const profiles = [];

      //The Journal Query
      const journal = await Journal.aggregate([
        {
          $search: {
            index: "search-text",
            text: {
              query: query,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      //Filter search results for the journal based on the userID
      //Obviously not very effecient, but the best we can do for right now
      //Most effective way is to query using the userID then search smaller collection subset
      const result = journal.map((journal) => {
        if (journal.user == id) {
          return journal;
        }
      });

      //The User Query
      //Only need the userID to query for the profiles
      const users = await User.aggregate([
        {
          $search: {
            index: "userSearch",
            text: {
              query: query,
              path: {
                wildcard: "*",
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
          },
        },
      ]);

      //Loop through the userIds and find all the corresponding profiles
      for (let i = 0; i < users.length; i++) {
        let temp = await Profile.find({
          user: users[i]._id,
        });
        profiles.push(temp);
      }

      return res.json({ profiles: profiles, journals: result });
    } catch (err) {
      console.log(err);
    }
  },
  //Add the journal to the favourites
  //PUT
  //api/journal/addFav/:id
  addToFavourites: async (req, res) => {
    try {
      const profile = await Profile.findOneAndUpdate({user: req.user.id}, {
        $push:{favourites: req.params.id}
      }, {
        new: true
      })
      return res.json('Added journal to favourites')
      
    } catch (err) {
      console.log(err);
    }
  },
  //Get the favourite Journals and returns the journal data
  //GET
  //api/
  getFavourites: async (req, res) => {
    try {
      //Get the Profile and then grab the favourites array
      const profile = await Profile.find({ user: req.params.id });
      //Initialize array of favourites and iterate through the profile favourite journals
      const favArray = profile[0].favourites;
      const favourites = [];
      for (let i = 0; i < favArray.length; i++) {
        let temp = await Journal.findById(favArray[i])
        favourites.push(temp)
      }
      return res.json({journal: favourites, profile: profile})
    } catch (err) {
      console.log(err);
    }
  },
  //Remove the journal from the favourites
  //PUT
  //api/journal/removeFav/:id
  removeFavourites: async (req, res) => {
    try {
      const profile = await Profile.findOneAndUpdate({user: req.user.id}, {
        $pull: {favourites: req.params.id}
      }, {
        new: true
      })
      return res.json('Something something')
    } catch (err) {
      console.log(err);
    }
  },
};
