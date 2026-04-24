const e=require("express"),c=require("cors"),m=require("mysql2/promise"),app=e(),PORT=process.env.PORT||3000;
app.use(c()); app.use(e.json());
const db=m.createPool({host:"localhost",user:"root",password:"root",database:"hotel_db",connectionLimit:10});

app.get("/bookings",async(_,res)=>{try{const [r]=await db.query("SELECT name,room,days FROM bookings ORDER BY id DESC");res.json(r)}catch{res.status(500).json({error:"DB read failed"})}});
app.post("/bookings",async(req,res)=>{const {name,room,days}=req.body||{};if(!name||!room||!days)return res.status(400).json({error:"name, room, days required"});
try{await db.query("INSERT INTO bookings(name,room,days) VALUES (?,?,?)",[name,+room,+days]);res.status(201).json({message:"Booking added"})}catch{res.status(500).json({error:"DB write failed"})}});

app.listen(PORT,()=>console.log("Server running on http://localhost:"+PORT));
