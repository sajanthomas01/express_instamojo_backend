var express = require('express');
var router = express.Router();

var request = require('request');

router.post('/', function (req, res) {




    if (!req.body.purpose || !req.body.amount || !req.body.email) {
        res.status(400).json({ success: false, message: 'Needed fields mismatch.', statusCode: 400 });
    } else {


        var headers = { 'X-Api-Key': 'test_f73ff845e7ed31e197ea3bacb91', 'X-Auth-Token': 'test_f20029c6f0a6c905bf7537efb04'  }
        var payload = {
            purpose: req.body.purpose,
            amount: req.body.amount,
            buyer_name: req.body.buyer_name,
            redirect_url: req.body.redirect_url,
            send_email: req.body.send_email,
            email: req.body.email,
            allow_repeated_payments: false
        }

        request.post('https://test.instamojo.com/api/1.1/payment-requests/', { form: payload, headers: headers }, function (error, response, body) {
            if (!error && response.statusCode == 201) {
                let data = JSON.parse(response.body)
                console.log(data.payment_request.longurl)

                res.status(200).json({ success: true, message: 'Initiating payment gateway.', statusCode: 200, url : data.payment_request.longurl});

            }
        })




    }
});

module.exports = router;
