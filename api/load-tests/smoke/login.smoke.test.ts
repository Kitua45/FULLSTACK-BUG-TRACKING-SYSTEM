import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,          // virtual user
    duration: "5s", // run test for 30 seconds
};

export default function () {
    const payload = JSON.stringify({
        email: 'ombachi@testmail.com',
        password: 'ombachi'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post('http://localhost:3000/login', payload, params);

    check(res, {
        "status is 200": (r) => r.status === 200,
    });

    // Safely handle response array
    const data = Array.isArray(res.json()) ? res.json() : [res.json()];
    console.log('Response array:', data);

    sleep(1);
}
