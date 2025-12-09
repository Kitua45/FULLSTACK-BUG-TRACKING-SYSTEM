import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 300 },
        { duration: '2m', target: 500 },
        { duration: '30s', target: 0 },
    ],
};

export default function () {
    const res = http.get('http://localhost:3000/allbugs');

    const bugs = res.json() as unknown as Array<any>;

    check(res, {
        "status is 200": (r) => r.status === 200,
        "response is an array": () => Array.isArray(bugs),
    });

    sleep(1);
}
