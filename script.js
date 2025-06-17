function getRecommendations() {
    const userId = document.getElementById("userId").value.trim();
    const resultBox = document.getElementById("recommendationList");
    resultBox.innerHTML = "";

    if (!userId) {
        alert("Please enter a valid user ID.");
        return;
    }

    fetch(`http://localhost:8080/api/recommend/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                resultBox.innerHTML = "<li>No recommendations found.</li>";
            } else if (data[0].startsWith("Error")) {
                resultBox.innerHTML = `<li style="color:red;">${data[0]}</li>`;
            } else {
                data.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item;
                    resultBox.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            resultBox.innerHTML = `<li style="color:red;">Error: ${error.message}</li>`;
        });
}
