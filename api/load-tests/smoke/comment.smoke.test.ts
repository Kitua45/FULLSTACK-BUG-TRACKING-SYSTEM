import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 3,          // virtual users
    duration: "30s", // run test for 30 seconds
};

export default function () {
    const res = http.get('http://localhost:3000/comments');

    // Safely parse the response as an array
    const comments = res.json() as unknown as Array<any>;

    check(res, {
        "status is 200": (r) => r.status === 200,
        "response is an array": () => Array.isArray(comments),
    });

    sleep(1);
}

