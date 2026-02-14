const axios = require('axios');

async function test() {
    try {
        console.log("Sending request to http://localhost:8000/api/outlets...");
        const res = await axios.post('http://localhost:8000/api/outlets', {
            name: "Test Node Script",
            address: "Test Address",
            city: "Test City",
            manager: "Test Manager",
            phone: "08123456789",
            openTime: "08:00 - 21:00",
            status: "ACTIVE"
        });
        console.log("Success:", res.data);
    } catch (e) {
        console.error("Error:", e.message);
        if (e.response) {
            console.error("Response data:", e.response.data);
            console.error("Response status:", e.response.status);
        }
    }
}

test();
