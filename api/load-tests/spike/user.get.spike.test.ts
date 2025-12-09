import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 0 },    // start from 0 users
        { duration: '30s', target: 200 },  // sudden spike to 200 users
        { duration: '1m', target: 0 },     // drop back to 0
    ],
};

export default function () {
    const res = http.get('http://localhost:3000/users');
    const users = res.json() as unknown as Array<any>;

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response is an array': () => Array.isArray(users),
    });

    sleep(1);
}
