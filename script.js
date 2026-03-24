let history = JSON.parse(localStorage.getItem("qrHistory")) || [];

function generateQR() {
    const text = document.getElementById("text").value;
    const size = parseInt(document.getElementById("size").value);
    const color = document.getElementById("color").value;
    const bgColor = document.getElementById("bgColor").value;
    const canvas = document.getElementById("qrCanvas");
    const logoInput = document.getElementById("logo");

    if (!text) {
        alert("Bitte Text oder URL eingeben!");
        return;
    }

    QRCode.toCanvas(canvas, text, {
        width: size,
        color: {
            dark: color,
            light: bgColor
        }
    }, function (error) {
        if (error) console.error(error);

        // Logo
        if (logoInput.files.length > 0) {
            const ctx = canvas.getContext("2d");
            const img = new Image();

            img.onload = function () {
                const logoSize = size * 0.2;
                const x = (canvas.width - logoSize) / 2;
                const y = (canvas.height - logoSize) / 2;

                ctx.drawImage(img, x, y, logoSize, logoSize);
            };

            img.src = URL.createObjectURL(logoInput.files[0]);
        }
    });

    // HISTORY
    history.push(text);
    localStorage.setItem("qrHistory", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const container = document.getElementById("history");
    container.innerHTML = "";

    history.slice(-5).reverse().forEach(item => {
        const btn = document.createElement("button");
        btn.textContent = item;
        btn.onclick = () => {
            document.getElementById("text").value = item;
            generateQR();
        };
        container.appendChild(btn);
    });
}

function downloadQR() {
    const canvas = document.getElementById("qrCanvas");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL();
    link.click();
}

// Beim Laden
renderHistory();