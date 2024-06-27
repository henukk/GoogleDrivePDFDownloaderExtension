(function() {
    if (typeof jsPDF === 'undefined') {
        console.error("Fatal error.");
        return;
    }

    let pdf = new jsPDF();
    let elements = document.getElementsByTagName("img");

    let counter = 0;
    for (let i = 0; i < elements.length; i++) {
        let img = elements[i];
        if (!/^blob:/.test(img.src)) {
            counter++;
            continue;
        }

        let canvasElement = document.createElement('canvas');
        let con = canvasElement.getContext("2d");
        canvasElement.width = img.width;
        canvasElement.height = img.height;
        con.drawImage(img, 0, 0, img.width, img.height);
        let imgData = canvasElement.toDataURL("image/jpeg", 1.0);

        if (i > 0 || pdf.internal.getNumberOfPages() > 1) {
            pdf.addPage([img.width, img.height]);
        } else {
            pdf.setPage(1);
            pdf.internal.pageSize = { width: img.width, height: img.height };
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);
    }

    pdf.deletePage(1);
    if (pdf.internal.getNumberOfPages() == 0) {
        return;
    }

    let element = document.getElementsByClassName("ndfHFb-c4YZDc-Wrql6b-V1ur5d ndfHFb-c4YZDc-Wrql6b-V1ur5d-hpYHOb")[0];
    if (element) {
        pdf.save(element.innerHTML.replace(".pdf", "") + ".pdf");
    } else {
        pdf.save("download.pdf");
    }
})();
    