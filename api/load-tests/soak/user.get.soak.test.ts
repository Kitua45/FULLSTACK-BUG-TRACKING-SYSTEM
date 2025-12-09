import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10m', target: 20 },  // go up to  20 users over 10 min
        { duration: '1h', target: 20 },   // sustain 20 users for 1 hour
        { duration: '5m', target: 0 },    // down
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
