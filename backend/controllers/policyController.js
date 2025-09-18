const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const Policy = require('../models/Policy');
const Quote = require('../models/Quote');

// @desc    Create a new policy from a quote
exports.createPolicy = async (req, res) => {
  const { quoteId } = req.body;

  try {
    const quote = await Quote.findById(quoteId);
    if (!quote || quote.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Quote not found' });
    }

    // Generate a unique policy number
    const policyNumber = `POL-${Date.now()}`;

    // Create a PDF document (simple version for now)
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(`Policy Number: ${policyNumber}`, { x: 50, y: 750, color: rgb(0, 0, 0) });
    page.drawText(`Insured: ${req.user.id}`, { x: 50, y: 700, color: rgb(0, 0, 0) });
    page.drawText(`Price: $${quote.price}`, { x: 50, y: 650, color: rgb(0, 0, 0) });
    const pdfBytes = await pdfDoc.save();

    // Save PDF to a file (in a real app, you'd use cloud storage)
    const pdfPath = path.join(__dirname, `../uploads/policies/${policyNumber}.pdf`);
    await fs.writeFile(pdfPath, pdfBytes);

    // Create an expiration date (e.g., one year from now)
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const newPolicy = new Policy({
      user: req.user.id,
      quote: quoteId,
      policyNumber,
      policyPdfUrl: `/uploads/policies/${policyNumber}.pdf`, // URL to access the PDF
      expirationDate,
    });

    const policy = await newPolicy.save();

    // Update the quote status
    quote.status = 'bound';
    await quote.save();

    res.json(policy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all policies for a user
exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(policies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
