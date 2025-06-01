import payObj from "../utilities/nkwa.js";
import dotenv from "dotenv";

dotenv.config();

export const payMoney = async (req, res, next) => {
    try {
        console.log(req.params.number);
        // console.log(payObj);
        const result = await payObj.payments.collect({
            amount: 1000,
            phoneNumber: req.params.number
        });

        // console.log(result.payment.id);
        res.status(200).json({ message: "All working here", success: "true" });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ error, success: "false" });

    }
}

const initiatePay = async (amount, number) => {
    try {
        console.log('Initiating payment');
        const id = await fetch(`${process.env.NKWA_URL}/collect`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-Key': process.env.NKWA_API_KEY
            },
            body: JSON.stringify({
                amount: amount,
                phoneNumber: number
            })
        }).then(res => res.json())
        .then((res) => {return res.id});
        console.log(id);
        return id;
    } catch (error) {
        throw new Error('An error occured');
    }
}

export const processPay = async (req, res, next) => {
    console.log("wooow");
    try {
        const { amount, phoneNumber } = req.body;

        if (!amount || !phoneNumber) {
            res.status(400).json({ success: false, message: "Amount and phoneNumber are both required"});
        }

        const id = await initiatePay(amount, phoneNumber);

        const response = await fetch(`${process.env.NKWA_URL}/payments/${id}`, {
            method: 'GET',
            headers: {
                'X-API-Key': process.env.NKWA_API_KEY
            }
        }).then(res => res.json())
        .then(res => {return res})
        res.status(200).json({ success: true, response });
    } catch (error) {
        console.error(error);
    }
}
