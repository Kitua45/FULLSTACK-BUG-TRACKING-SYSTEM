import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10m', target: 20 },
        { duration: '1h', target: 20 },
        { duration: '5m', target: 0 },
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
