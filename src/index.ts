import * as admin from "firebase-admin";

const serviceAccount = require("../credentials.json");
const deviceTokens = require("../device-tokens.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async (tokens: string[]) => {
	const message = {
		tokens: tokens,
		data: {
			title: "新しいメッセージ",
			body: "これはテストプッシュ通知です。",
		},
	};

	try {
		const response = await admin.messaging().sendEachForMulticast(message);
		console.log("Successfully sent message:", response);
	} catch (error) {
		console.error("Error sending message:", error);
	}
};

sendPushNotification(deviceTokens);
