import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 300 },   // ramp up to 300 users
        { duration: '2m', target: 500 },  // peak load at 500 users
        { duration: '30s', target: 0 },   // down
    ],
};

export default function () {
    const res = http.get('http://localhost:3000/users');

    const users = res.json() as unknown as Array<any>;

    check(res, {
        "status is 200": (r) => r.status === 200,
        "response is an array": () => Array.isArray(users),
    });

    sleep(1);
}
