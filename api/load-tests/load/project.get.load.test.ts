import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 50 },
        { duration: '2m', target: 100 },
        { duration: '30s', target: 0 },
    ],
};

export default function () {
    const res = http.get('http://localhost:3000/projects');
    const projects = res.json();

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response is an array': () => Array.isArray(projects),
    });

    sleep(1);
}
