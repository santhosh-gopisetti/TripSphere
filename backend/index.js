import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 3050;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// In-memory users array (for demo only)
const users = [];

// Dummy travel packages with local images
const travelPackages = [
  {
    id: 1,
    title: "Goa Beach Getaway",
    city: "Goa",
    address: "Goa, India",
    distance: 450,
    photo: "/goa.jpg",
    desc: "Relax on the golden beaches and enjoy Goa's vibrant nightlife and seafood.",
    price: 5999,
    maxGroupSize: 10
  },
  {
    id: 2,
    title: "Manali Snow Retreat",
    city: "Manali",
    address: "Manali, Himachal Pradesh, India",
    distance: 620,
    photo: "/manali.jpg",
    desc: "Experience snow-capped peaks and adventure sports in the Himalayan town of Manali.",
    price: 7499,
    maxGroupSize: 8
  },
  {
    id: 3,
    title: "Kerala Backwater Bliss",
    city: "Alleppey",
    address: "Alleppey, Kerala, India",
    distance: 800,
    photo: "/kerala.jpg",
    desc: "Cruise the peaceful backwaters of Kerala on a traditional houseboat.",
    price: 8999,
    maxGroupSize: 12
  },
  {
    id: 4,
    title: "Jaipur Heritage Tour",
    city: "Jaipur",
    address: "Jaipur, Rajasthan, India",
    distance: 380,
    photo: "/jaipur.jpg",
    desc: "Explore royal palaces, forts, and the vibrant culture of the Pink City.",
    price: 6299,
    maxGroupSize: 9
  },
  {
    id: 5,
    title: "Varanasi Spiritual Journey",
    city: "Varanasi",
    address: "Varanasi, Uttar Pradesh, India",
    distance: 550,
    photo: "/varanasi.jpg",
    desc: "Witness the spiritual aura of the Ganges and ancient temples of Varanasi.",
    price: 4999,
    maxGroupSize: 8
  },
  {
    id: 6,
    title: "Leh-Ladakh Adventure",
    city: "Leh",
    address: "Leh, Ladakh, India",
    distance: 1050,
    photo: "/leh.jpg",
    desc: "Uncover the high-altitude beauty of Ladakh with monasteries and rugged passes.",
    price: 12999,
    maxGroupSize: 6
  }
];

// AUTH: Register
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields required." });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ success: false, message: "Email already registered." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });
  res.status(201).json({ success: true, message: "User registered successfully." });
});

// AUTH: Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials." });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ success: false, message: "Invalid credentials." });
  }
  const token = jwt.sign({ email: user.email, username: user.username }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ success: true, token, username: user.username });
});

// GET /packages
app.get("/api/packages", (req, res) => {
  res.status(200).json({ success: true, data: travelPackages });
});

// POST /contact
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form submitted:", { name, email, message });
  res.status(200).json({ success: true, message: "Contact form received!" });
});

// POST /book (Booking simulation)
app.post("/api/book", (req, res) => {
  const { name, email, packageId, groupSize } = req.body;
  console.log("Booking received:", { name, email, packageId, groupSize });
  res.status(200).json({ success: true, message: "Booking received!" });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Student Travel API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
