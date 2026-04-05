import PDFDocument from "pdfkit";
import fs from "fs";

export const generateInvoice = (order, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("WaynTech Invoice", { align: "center" });

  doc.text(`\nCustomer: ${order.customerName}`);
  doc.text(`Phone: ${order.phone}`);
  doc.text(`Email: ${order.email}`);

  doc.text("\nItems:");

  order.items.forEach((item, i) => {
    doc.text(
      `${i + 1}. ${item.name} - ₹${item.price} x ${item.qty}`
    );
  });

  doc.text(`\nTotal: ₹${order.totalAmount}`);

  doc.end();
};