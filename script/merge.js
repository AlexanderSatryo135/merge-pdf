// Preview first file on button click
document.getElementById('previewBtn').addEventListener('click', () => {
  const files = document.getElementById('pdfFiles').files;
  if (files.length === 0) {
    alert("Please select at least one PDF to preview.");
    return;
  }

  const fileURL = URL.createObjectURL(files[0]);
  const viewer = document.getElementById('pdfViewer');
  viewer.src = fileURL;
  document.getElementById('previewArea').classList.remove('hidden');
});

// Merge PDF files
document.getElementById('pdfForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const input = document.getElementById('pdfFiles');
  const files = input.files;

  if (files.length < 2) {
    alert('Please upload at least 2 PDF files.');
    return;
  }

  const mergedPdf = await PDFLib.PDFDocument.create();

  for (let file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // Set preview and download
  document.getElementById('pdfPreview').src = url;
  document.getElementById('downloadLink').href = url;
  document.getElementById('result').classList.remove('hidden');
});
