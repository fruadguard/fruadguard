import express from "express";
import Stripe from "stripe";
import cors from "cors";


const app = express();


app.use(cors());

app.use(express.json());



// Stripe Secret Key

const stripe = new Stripe(
"
import express from "express";
import Stripe from "stripe";
import cors from "cors";


const app = express();


app.use(cors());

app.use(express.json());



// Stripe Secret Key

const stripe = new Stripe(
"sk_test_51Tyxxm1jZUdyMZ5r9gHMe7OGKPOwQeJTytOuIpqggrNhtzjU5UOEkrhhThwzdXOE95zJARwtHWQAbwYMWzeV0xYp00RFCKIUwv"
);





// Create Checkout Session


app.post(
"/create-checkout-session",
async(req,res)=>{


try{


const {priceId}=req.body;



const session =

await stripe.checkout.sessions.create({


mode:"subscription",



line_items:[

{

price:priceId,

quantity:1

}

],



success_url:

"http://localhost:5500/payment-success.html",



cancel_url:

"http://localhost:5500/payment.html"



});




res.json({

url:session.url

});



}


catch(error){


res.status(500).json({

error:error.message

});


}



});







app.listen(
3000,
()=>{

console.log(
"FraudGuard Stripe Server Running"
);

}

);"
);





// Create Checkout Session


app.post(
"/create-checkout-session",
async(req,res)=>{


try{


const {priceId}=req.body;



const session =

await stripe.checkout.sessions.create({


mode:"subscription",



line_items:[

{

price:priceId,

quantity:1

}

],



success_url:

"http://localhost:5500/payment-success.html",



cancel_url:

"http://localhost:5500/payment.html"



});




res.json({

url:session.url

});



}


catch(error){


res.status(500).json({

error:error.message

});


}



});







app.listen(
3000,
()=>{

console.log(
"FraudGuard Stripe Server Running"
);

}

);

