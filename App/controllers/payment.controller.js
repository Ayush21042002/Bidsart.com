const con = require("../database/db");
const paypal = require("paypal-rest-sdk");

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AbGqK81M3o6HIaOpFFZZs9oudsx6C_661JqkfL4X1FWE--oMzHYbShUAoNtO3Bn7WBm8jFe-8ldwZ9mm',
  'client_secret': 'EOU5_F-YMnDEN6mj9rl_uTYvxH19mAWmeBlRlTptE_GELlm1Ej9c_xo5y2uzRe7EP6BB8xMutHzD5yPE'
});

// console.log(paypal);

exports.makePayment = (req,response) => {

    // const cid = req.customerData.cid;

    const pid = req.body.pid;
    const amount = req.body.amount;
    const orderid = req.body.Orderid;
    // console.log(pid,amount);

    con.query("SELECT p.*,s.* FROM product p inner join has_pd h on h.pid = p.pid inner join seller s on s.sid = h.sid where p.pid = ?",
    [pid], (err,result) => {
        if(err) throw err;

        const product = result[0];

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/customer/success/" + orderid,
                "cancel_url": "http://localhost:3000/customer/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": product.title,
                        "sku": "item",
                        "price": amount,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": amount
                },
                "description": "This is the payment description."
            }]
        };
    
    
        // console.log(paypal.payment);

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i=0;i<payment.links.length; i++){
                    if(payment.links[i].rel === 'approval_url'){
                        response.json({
                            redirect: payment.links[i].href
                        })
                    }
                }
            }
        });
    });
};

exports.successHandler = (req,res) => {
    const Orderid = req.params.id;

    con.query("SELECT * FROM Orders where Orderid = ?;UPDATE Orders SET paid = 1 where Orderid = ?;",[Orderid,Orderid], (err,result) => {
        if(err) throw err;

        const amount = result[0][0].amount;

        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": amount
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.redirect("/");
            }
        });
    });
};

exports.cancelHandler = (req,res) => {
    res.redirect("/");
};