function generateQR() {
    const text = document.getElementById("text").value;
    const size = parseInt(document.getElementById("size").value);
    const color = document.getElementById("color").value;
    const bgColor = document.getElementById("bgColor").value;
    const canvas = document.getElementById("qrCanvas");

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
    });
}

function downloadQR() {
    const canvas = document.getElementById("qrCanvas");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL();
    link.click();
}