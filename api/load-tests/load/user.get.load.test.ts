import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 50 },  // 50 users over 1 minute
        { duration: '2m', target: 100 }, // 100 users over 2 minutes
        { duration: '30s', target: 0 },  // 0 users over 30 seconds
    ],
};

export default function () {
    const res = http.get('http://localhost:3000/users');

    // Parse response as JSON
    const users = res.json() as unknown as Array<any>;

    check(res, {
        "status is 200": (r) => r.status === 200,
        "response is an array": () => Array.isArray(users),
    });

    sleep(1);
}
