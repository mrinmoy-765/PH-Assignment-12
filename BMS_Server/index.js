const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Allow frontend origin
// CORS
//middleware
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncoxxcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const BMS_userCollection = client.db("BMS").collection("BmsUsers");
    const apartmentsCollection = client.db("BMS").collection("Apartments");
    const agreementCollection = client.db("BMS").collection("Agreements");
    const reviewCollection = client.db("BMS").collection("Reviews");
    const announcementCollection = client.db("BMS").collection("Announcements");
    const couponCollection = client.db("BMS").collection("Coupons");

    //middleware
    const verifyToken = (req, res, next) => {
      const token = req.cookies.accessToken;
      console.log("inside verify token", token);

      if (!token) return res.status(401).send("Unauthorized");

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send("Forbidden");
        req.user = decoded;
        next();
      });
    };

    //Auth related APIs
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      // Create JWT token
      const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      // Set cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });
      res.send({ sucess: true });
    });

    //clear cookie
    app.post("/logout", (req, res) => {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });
      return res.status(200).json({ message: "Logged out successfully" });
    });

    //create User
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await BMS_userCollection.insertOne(user);
      res.send(result);
    });

    //get user by firebase id
    app.get("/users", verifyToken, async (req, res) => {
      try {
        const uid = req.query.uid;
        if (!uid) return res.status(400).send({ message: "uid is required" });

        const user = await BMS_userCollection.findOne({
          uid,
        });

        if (!user) return res.status(404).send({ message: "User not found" });

        res.send(user);
      } catch (error) {
        console.error("Error in /users route:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    //update user profile response
    app.put("/users/update", verifyToken, async (req, res) => {
      try {
        const { email, name, uid } = req.body;

        if (!email || !name || !uid) {
          return res.status(400).json({ message: "Missing fields." });
        }

        const updateDoc = { $set: {} };

        if (name) updateDoc.$set.name = name;
        if (email) updateDoc.$set.email = email;

        const result = await BMS_userCollection.updateOne({ uid }, updateDoc);
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "User not found." });
        }

        res.json({ message: "User profile updated in MongoDB." });
      } catch (error) {
        console.error("MongoDB update error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    //get apartments
    app.get("/apartments", async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const sortOrder = req.query.sort;
        const search = req.query.search || "";
        const availability = req.query.availability || "all";
        const slider = parseInt(req.query.slider) || 22000; // default max rent

        const skip = (page - 1) * limit;

        let sortCondition = {};
        if (sortOrder === "asc") sortCondition = { rent: 1 };
        else if (sortOrder === "desc") sortCondition = { rent: -1 };

        const searchCondition = {
          $or: [
            { block: { $regex: search, $options: "i" } },
            { apartment_no: { $regex: search, $options: "i" } },
            { floor: { $regex: search, $options: "i" } },
          ],
          rent: { $lte: slider },
        };

        if (availability === "available") {
          searchCondition.is_available = true;
        } else if (availability === "rented") {
          searchCondition.is_available = false;
        }

        const totalCount = await apartmentsCollection.countDocuments(
          searchCondition
        );

        const result = await apartmentsCollection
          .find(searchCondition)
          .sort(sortCondition)
          .skip(skip)
          .limit(limit)
          .toArray();

        res.send({ result, totalCount });
      } catch (error) {
        console.error("Error fetching apartments:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    // 🔄 Optional: Add new apartment (POST)
    app.post("/apartments", async (req, res) => {
      const newApartment = req.body;
      const result = await apartmentsCollection.insertOne(newApartment);
      res.send(result);
    });

    // write a review
    app.post("/reviews", verifyToken, async (req, res) => {
      const newReview = req.body;
      const result = await reviewCollection.insertOne(newReview);
      res.send(result);
    });

    // GET /reviews/latest
    app.get("/getReview", async (req, res) => {
      try {
        const latestReviews = await reviewCollection
          .find()
          .sort({ date: -1 })
          .limit(6)
          .toArray();
        res.status(200).json(latestReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    //Make an Agreement
    // POST: Create agreement with validation
    app.post("/agreement", verifyToken, async (req, res) => {
      const newAgreement = req.body;
      const userEmail = newAgreement.email;

      try {
        // Check for existing pending or approved agreement for this user
        const existing = await agreementCollection.findOne({
          email: userEmail,
          status: { $in: ["pending", "approved"] },
        });

        if (existing) {
          return res.status(400).send({
            message:
              "You already have a pending or approved agreement. Cannot request another.",
          });
        }

        // Insert new agreement
        const result = await agreementCollection.insertOne(newAgreement);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error inserting agreement:", error);
        res.status(500).send({ message: "Server error" });
      }
    });

    //Admin Information Part----------------------------------------------------------------------------------------------------------

    app.get("/dashboard/admin-stats", verifyToken, async (req, res) => {
      try {
        const totalRooms = await apartmentsCollection.countDocuments();
        const availableRooms = await apartmentsCollection.countDocuments({
          is_available: true,
        });
        const unavailableRooms = await apartmentsCollection.countDocuments({
          is_available: false,
        });

        const totalUsers = await BMS_userCollection.countDocuments({
          role: "user",
        });
        const memberUsers = await BMS_userCollection.countDocuments({
          role: "member",
        });

        res.send({
          totalRooms,
          availableRooms,
          unavailableRooms,
          totalUsers,
          memberUsers,
        });
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch dashboard stats" });
      }
    });

    //get members
    app.get("/people", async (req, res) => {
      try {
        const { role = "member", search = "" } = req.query;

        // build base filter with role
        const query = { role };

        // if search keyword is provided
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ];
        }

        const people = await BMS_userCollection.find(query).toArray();
        res.json(people);
      } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //remove user
    app.patch("/people/:id", async (req, res) => {
      const userId = req.params.id;
      const { role } = req.body;

      try {
        const result = await BMS_userCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { role } }
        );

        res.json(result);
      } catch (err) {
        console.error("Error updating role:", err);
        res.status(500).json({ error: "Failed to update user role" });
      }
    });

    //post announcement
    app.post("/announcements", verifyToken, async (req, res) => {
      console.log("hit announce");

      const newAnnouncement = {
        ...req.body,
        createdAt: new Date(),
      };

      try {
        const result = await announcementCollection.insertOne(newAnnouncement);
        res.send(result);
      } catch (err) {
        console.error("Failed to insert announcement:", err);
        res.status(500).send({ error: "Insertion failed" });
      }
    });

    //get announcements
    app.get("/getannoucements", verifyToken, async (req, res) => {
      try {
        const announcements = await announcementCollection
          .find()
          .sort({ craetedAt: -1 }) //sort by newest
          .toArray();

        res.json(announcements);
      } catch (err) {
        console.error("Error fetching announcements", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // 🔄 Add newCoupon (POST)
    app.post("/generate-coupon", verifyToken, async (req, res) => {
      const newCoupon = req.body;
      const result = await couponCollection.insertOne(newCoupon);
      res.send(result);
    });

    //get coupons
    app.get("/get-coupons", verifyToken, async (req, res) => {
      try {
        const coupons = await couponCollection
          .find()
          .sort({ craetedAt: -1 }) //sort by newest
          .toArray();

        res.json(coupons);
      } catch (err) {
        console.error("Error fetching coupon", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //delete coupon
    app.delete("/delete-coupon/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await couponCollection.deleteOne(query);

        res.json(result);
      } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
      }
    });

    //update coupon
    app.patch("/coupon-availability/:id", async (req, res) => {
      const id = req.params.id;
      const { available } = req.body;

      try {
        const result = await couponCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { available: available } }
        );

        res.json(result);
      } catch (err) {
        console.error("Availability toggle error:", err);
        res.status(500).json({ error: "Failed to update availability" });
      }
    });

    // Send a ping to confirm a successful connection
    //  await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("BMS server is running");
});

app.listen(port, () => {
  console.log(`BMS is running on port: ${port}`);
});
