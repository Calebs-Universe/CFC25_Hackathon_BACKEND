import payObj from "../utilities/nkwa.js";

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