import payObj from "../utilities/nkwa.js";

export const payMoney = async (req, res, next) => {
    try {
        console.log(req.params.number);
        const result = await payObj.collect.post({
            requestBody: {
                amount: 1000,
                phoneNumber: req.params.number,
                description: "Payment for your car"
            }
        });

        console.log(result.payment.id);
        res.status(200).json({message: "All working here", success: "true" });
    } catch (error) {
        res.status(500).json({error, success: "false"});
    }
}