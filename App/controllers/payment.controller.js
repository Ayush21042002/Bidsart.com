const con = require("../database/db");
const paypal = require("paypal-rest-sdk");
const easyinvoice = require("easyinvoice");
const fs = require("fs");
const path = require("path");

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AbGqK81M3o6HIaOpFFZZs9oudsx6C_661JqkfL4X1FWE--oMzHYbShUAoNtO3Bn7WBm8jFe-8ldwZ9mm',
  'client_secret': 'EOU5_F-YMnDEN6mj9rl_uTYvxH19mAWmeBlRlTptE_GELlm1Ej9c_xo5y2uzRe7EP6BB8xMutHzD5yPE'
});

// console.log(paypal);

exports.makePayment = (req,response) => {

    // const cid = req.customerData.cid;

    const pid = req.body.pid;
    const amount = (Number(req.body.amount) * 0.014).toFixed(2);
    const orderid = req.body.Orderid;
    // console.log(pid,amount);

    con.query("SELECT * FROM product p where p.pid = ?",
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

    con.query("SELECT * FROM Orders where Orderid = ?;",[Orderid], (err,result) => {
        if(err) throw err;

        const cid = result[0].cid;
        const aid = result[0].aid;

        const amount = (Number(result[0].amount) * 0.014).toFixed(2);
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        // console.log(amount);
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
                let query1 = "SELECT s.*,p.title from seller s inner join product p on p.sid = s.sid inner join auction a on a.pid = p.pid and a.aid = ?;";
                let query2 = "SELECT * FROM customer where cid = ?;";
                con.query(query1 + query2,[aid,cid],(err,result) => {
                    if(err) throw err;

                    const sellerProduct = result[0][0];
                    const customer = result[1][0];

                    var data = {
                        //"documentTitle": "RECEIPT", //Defaults to INVOICE
                        "currency": "USD",
                        "taxNotation": "gst", //or gst
                        "marginTop": 25,
                        "marginRight": 25,
                        "marginLeft": 25,
                        "marginBottom": 25,
                        "logo": "http://localhost:3000/images/LOGO.png", //or base64
                        //"logoExtension": "png", //only when logo is base64
                        "sender": {
                            "company": sellerProduct.name,
                            "address": sellerProduct.addrLine,
                            "zip": sellerProduct.zip,
                            "city": sellerProduct.city,
                            "state": sellerProduct.state,
                            "country": "INDIA"
                            //"custom1": "custom value 1",
                            //"custom2": "custom value 2",
                            //"custom3": "custom value 3"
                        },
                        "client": {
                            "company": customer.fname + " " + customer.lname,
                            "address": customer.addLine,
                            "zip": customer.zip,
                            "city": customer.city,
                            "state": customer.state,
                            "country": customer.state,
                            //"custom1": "custom value 1",
                            //"custom2": "custom value 2",
                            //"custom3": "custom value 3"
                        },
                        "invoiceNumber": "2020.0001",
                        "invoiceDate": new Date(),
                        "products": [
                            {
                                "quantity": "1",
                                "description": sellerProduct.title,
                                "tax": 0,
                                "price": amount
                            }
                        ],
                        "bottomNotice": "Please Keep the Invoice safe for future grieviances"
                    };
                    
                    //Create your invoice! Easy!
                    easyinvoice.createInvoice(data, async function (result) {
                        //The response will contain a base64 encoded PDF file
                        // console.log(result.pdf);
                        
                        let filename = path.resolve(__dirname,"../invoices/" + customer.fname + "-" + new Date().getUTCDate + "-"+ Orderid + "-invoice.pdf");

                        await fs.writeFileSync(filename,result.pdf,'base64');

                        const URI = req.protocol + "://" + req.get('host') + "/invoices/" + customer.fname + "-" + new Date().getUTCDate() + "-"+ Orderid + "-invoice.pdf";
                        con.query("UPDATE Orders SET paid = 1,invoiceURI = ? where Orderid = ?;",[URI,Orderid],(err,result) => {
                            if(err) throw err;

                            res.redirect("/html/myOrders.html");
                        });
                    });

                });
            }
        });
    });
};

exports.cancelHandler = (req,res) => {
    res.redirect("/");
};