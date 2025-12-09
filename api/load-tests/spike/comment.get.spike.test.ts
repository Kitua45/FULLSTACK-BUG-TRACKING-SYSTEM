import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 0 },
        { duration: '30s', target: 200 },
        { duration: '1m', target: 0 },
    ],
};

export default function () {
    const res = http.get('http://localhost:3000/comments');
    const comments = res.json() as unknown as Array<any>;

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response is an array': () => Array.isArray(comments),
    });

    sleep(1);
}
