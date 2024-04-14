import * as admin from "firebase-admin";

const serviceAccount = require("../credentials.json");
const deviceTokens = [
	"dl1ytf9epZ6HkH388iQrGx:APA91bFOSzdp5f8AZ7FCmAZbZMHTeaWqlf8DDFVGpZ7oQQ1acM4DjzNQ0O-l42vqJFhxGc2bvd7fwAkEBawa8E3puD4qTmXcfseZbZtNS29vjX5G5mP12dDwIsPReOSrTfczu8HwbC99",
];

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
