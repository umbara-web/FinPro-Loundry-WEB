const axios = require('axios');

async function test() {
    try {
        console.log("Sending request to http://localhost:8000/api/workers...");
        // Attempts to create a worker with user details, which should fail because backend tries to put this into Staff table
        const res = await axios.post('http://localhost:8000/api/workers', {
            name: "Test Worker",
            email: "test.worker@example.com",
            phone: "08123456789",
            role: "WORKER",
            status: "ACTIVE",
            outletId: "d1c88077-6143-436f-bb1a-62787c6755d6" // Valid ID from previous step
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
