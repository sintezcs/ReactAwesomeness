import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

const PUSH_ENDPOINT = 'https://http-intake.logs.datadoghq.com/v1/input/xxx';


export default async function registerForPushNotificationsAsync() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
        alert('No notification permissions!');
        return;
    }

    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    alert(`Got token ${token}`);

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "title": "Expo Push Token",
            "text": `Token ${token}`,
            "priority": "normal",
            "tags": ["environment:demo-mobile-app"],
            "alert_type": "info",
            "user": {
                "username": 'Foo',
            },
        }),
    });

    fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": "Expo Device details",
            "text": `Device productName = ${Device.productName} with installation id ${Constants.installationId}`,
            "Device": Device,
            "Constants": Constants,
            "priority": "normal",
            "tags": ["environment:demo-mobile-app"],
            "alert_type": "info",
            "user": {
                "username": 'Foo',
            },
        }),
    });
    alert("response from datadog");

    // let deviceToken = await Notifications.getDevicePushTokenAsync({ gcmSenderId: "760175693457" });
    // alert(`Got deviceToken ${deviceToken}`);
    // fetch(PUSH_ENDPOINT, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         "title": "Expo deviceToken Token",
    //         "text": `deviceToken ${token}`,
    //         "token": deviceToken,
    //         "priority": "normal",
    //         "tags": ["environment:demo-mobile-app"],
    //         "alert_type": "info",
    //         "user": {
    //             "username": 'Foo',
    //         },
    //     }),
    // });

    let deviceToken2 = await Notifications.getDevicePushTokenAsync({ gcmSenderId: "reactexpoapp" });
    fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "title": "Expo deviceToken2 Token",
            "text": `deviceToken ${deviceToken2}`,
            "token": deviceToken2,
            "priority": "normal",
            "tags": ["environment:demo-mobile-app"],
            "alert_type": "info",
            "user": {
                "username": 'Foo',
            },
        }),
    });


    return;
}