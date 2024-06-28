const { MaterialTestingQuotation } = require("../models/index");

const PdfPrinter = require("pdfmake");
const fs = require("fs");
const path = require("path");
const { logoBase64 } = require("./filePaths");
const createHeader = require("./header");
const createFooter = require("./footer");
const createWaterMark = require("./waterMark.js");
require("dotenv").config();
const mtQuotationBusket = process.env.MATERIAL_TESTING_QUOTATIONS;

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear().toString();
  let month = (now.getMonth() + 1).toString();
  let day = now.getDate().toString();
  let hours = now.getHours().toString();
  let minutes = now.getMinutes().toString();
  let seconds = now.getSeconds().toString();
  let milliseconds = now.getMilliseconds().toString();

  // Pad single-digit values with leading zeros
  month = month.padStart(2, "0");
  day = day.padStart(2, "0");
  hours = hours.padStart(2, "0");
  minutes = minutes.padStart(2, "0");
  seconds = seconds.padStart(2, "0");
  milliseconds = milliseconds.padStart(3, "0");

  // Combine date and time components
  const dateTimeString = `${day}${month}${year}${hours}${minutes}${seconds}${milliseconds}`;

  return dateTimeString;
}

//aws
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const {
  renderDiscipline,
  calculateDiscountedPrice,
} = require("../defs/customFunctions.js");

const fonts = {
  Roboto: {
    normal: path.join(__dirname, "../fonts/PlayfairDisplay-Regular.ttf"),
    bold: path.join(__dirname, "../fonts/PlayfairDisplay-Bold.ttf"),
    italics: path.join(__dirname, "../fonts/PlayfairDisplay-Italic.ttf"),
    bolditalics: path.join(__dirname, "../fonts/PlayfairDisplay-Bold.ttf"),
  },
};

const printer = new PdfPrinter(fonts);

const createTermsOfPayments = () => {
  return [
    {
      text: `Note :- The work will begin once 100% of the advance payment has been given with the work order.`,
      color: "#2596be",
      italics: true,
      fontSize: 10,
      margin: [0, 2, 0, 6],
    },
    { text: "Terms of Payment:", fontSize: 9, bold: true },
    {
      text: `         \t1. Balance amount if any prior to the submission of report`,
      fontSize: 10,
      margin: [16, 2, 0, 0],
    },
    {
      text: "\t 2. Witness Charges will be 100% Extra (or) Equal to the test charges per person",
      fontSize: 10,
      margin: [16, 2, 0, 0],
    },
    {
      text: "\t 3. This Quote is Valid until the Closing Hours of Business on 15th March, 2024",
      color: "red",
      fontSize: 10,
      margin: [16, 2, 0, 0],
    },
    {
      text: "\t 4. Transportation Charges will be Rs 1200 per Trip If site with in ORR Limits (or) if out of ORR limits Transportation Charges will be Rs 20/Km will be charged extra",
      fontSize: 10,
      margin: [16, 2, 0, 0],
    },

    {
      text: "All the payment shall be made in favour of KDM Engineers (India) Pvt. Ltd. Payable at Hyderabad.",
      fontSize: 10,
      margin: [0, 16, 0, 0],
      color: "green",
    },
  ];
};

const createContent = (data, contactInfo, dateDay) => {
  const { name, email, mobile } = contactInfo;
  const { date } = dateDay;
  const content = [];
  let totalFinalPrice = 0;
  let totalGST = 0;

  content.push([
    { text: "S.No", style: "tableHeader" },
    { text: "Sample Name", style: "tableHeader" },
    { text: "Parameters", style: "tableHeader" },
    { text: "Discipline", style: "tableHeader" },
    { text: "Actual Price", style: "tableHeader" },
    { text: "Offer", style: "tableHeader" },
    { text: "Final Price", style: "tableHeader" },
  ]);

  let serialNumber = 1;

  data.forEach((sample) => {
    const totalGroups = sample.parameters.reduce(
      (acc, param) => acc + param.group.length,
      0
    );
    let firstParameter = true;

    sample.parameters.forEach((param) => {
      const paramNames = param.group.join(",\n");
      const finalPrice = calculateDiscountedPrice(param.price, sample.offer);

      const row = [];
      if (firstParameter) {
        row.push({
          text: serialNumber++,
          rowSpan: totalGroups - param.group.length + 1,
          fontSize: 9,
        });
        row.push({
          text: sample.sampleName,
          rowSpan: totalGroups - param.group.length + 1,
          fontSize: 9,
        });
      } else {
        // Add empty cells for subsequent parameters
        row.push("", "");
      }

      // Add group name
      row.push({
        text: paramNames,
        fontSize: 9,
      });

      if (firstParameter) {
        // Add discipline, price, offer, and final price for the first parameter
        row.push({
          text: renderDiscipline(param.discipline),
          fontSize: 9,
        });
        row.push({
          text: param.price,
          // rowSpan: totalGroups - param.group.length + 1,
          fontSize: 9,
        });
        row.push({
          text: `${sample.offer} %`,
          rowSpan: totalGroups - param.group.length + 1,
          fontSize: 9,
        });
        row.push({
          text: finalPrice.toFixed(2),
          fontSize: 9,
        });
      } else {
        row.push({
          text: renderDiscipline(param.discipline),
          fontSize: 9,
        });
        row.push({
          text: param.price,
          fontSize: 9,
        });
        row.push("");
        row.push({
          text: finalPrice.toFixed(2),
          fontSize: 9,
        });
      }
      totalFinalPrice += finalPrice;

      content.push(row);
      firstParameter = false;
    });
  });

  totalGST = totalFinalPrice * 0.18;
  const totalPrice = totalFinalPrice + totalGST;
  //summary of quotation
  content.push(
    [
      {
        text: "Total Sum (A)",
        colSpan: 6,
        alignment: "right",
        bold: true,
        fontSize: 10,
      },
      "",
      "",
      "",
      "",
      "",
      {
        text: totalFinalPrice.toFixed(2),
        colSpan: 1,
        alignment: "right",
        bold: true,
        fontSize: 10,
      },
    ],
    [
      {
        text: "GST 18% (B)",
        colSpan: 6,
        alignment: "right",
        bold: true,
        fontSize: 10,
      },
      "",
      "",
      "",
      "",
      "",
      {
        text: totalGST.toFixed(2),
        colSpan: 1,
        alignment: "right",
        bold: true,
        fontSize: 10,
      },
    ],
    [
      {
        text: "Total (A) + (B)",
        colSpan: 6,
        alignment: "right",
        bold: true,
        fontSize: 10,
      },
      "",
      "",
      "",
      "",
      "",
      {
        text: totalPrice.toFixed(2),
        colSpan: 1,
        alignment: "right",
        bold: true,
        fontSize: 10,
      },
    ]
  );

  return [
    {
      columns: [
        {
          width: "*",
          text: [
            { text: `REF: KDMEI/Quote/${date}\n`, bold: true },
            { text: "To,\n" },
            { text: `${name},\n` },
            { text: `Phone: ${mobile}` },
          ],
          alignment: "left",
        },

        {
          width: "*",
          stack: [
            { text: `Date: ${new Date().toLocaleDateString()}\n` },
            {
              text: `Day: ${new Date().toLocaleDateString("en-US", {
                weekday: "long",
              })}     `,
            },
          ],
          alignment: "right",
        },
      ],
      margin: [0, 0, 0, 0],
    },
    {
      text: "Thank you for your interest in KDM Engineers Group. We appreciate the opportunity to provide you with a quotation for Selected samples in our website.\n Based on your requirements, here is an instant automated quotation for your convenience",
      alignment: "center",
      fontSize: 10,
      margin: [2, 20, 2, 10],
    },
    {
      table: {
        headerRows: 1,
        widths: ["auto", "auto", "*", "auto", "auto", "auto", "auto"],
        body: content,
      },
    },
    ...createTermsOfPayments(),
  ];
};

const docDefinition = (data, contactInfo, dateDay) => ({
  pageMargins: [40, 90, 40, 60],
  header: createHeader,
  footer: (currentPage, pageCount) => createFooter(currentPage, pageCount),
  content: createContent(data, contactInfo, dateDay),
  background: (currentPage, pageCount) =>
    createWaterMark(currentPage, pageCount),
  styles: {
    title: {
      fontSize: 24,
      bold: true,
    },
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
    },
    tableHeader: {
      fontSize: 10,
      color: "black",
      fillColor: "#CCCCCC",
    },
    defaultStyle: {
      font: "Roboto",
    },
    listItem: {
      fontSize: 8,
    },
  },
});

const materialTestingQuotation = async (req, res) => {
  try {
    const { contactInfo, samples } = req.body;
    const date = getCurrentDateTime();

    const dateDay = { date };

    const pdfDoc = printer.createPdfKitDocument(
      docDefinition(samples, contactInfo, dateDay)
    );

    // Create a writable stream buffer to capture PDF data
    const chunks = [];

    // Event listener for receiving PDF data chunks
    pdfDoc.on("data", (chunk) => chunks.push(chunk));

    // Event listener for PDF document completion
    pdfDoc.on("end", async () => {
      try {
        // Concatenate PDF data chunks into a single buffer
        const pdfBuffer = Buffer.concat(chunks);

        // Upload the PDF buffer to AWS S3
        const uploadParams = {
          Bucket: mtQuotationBusket,
          Key: `quotation-${date}.pdf`,
          Body: pdfBuffer,
          ContentType: "application/pdf",
        };

        const uploadResult = await s3.upload(uploadParams).promise();
        console.log("PDF uploaded successfully:", uploadResult.Location);

        const location = uploadResult.Location;
        // Insert the new quotation into the database
        await MaterialTestingQuotation.create({
          location,
        });

        // Log the successful database update
        console.log("DB updates successfully");

        // Send the response with the created quotation link
        return res.status(200).json({ link: location });
      } catch (error) {
        console.error("Error handling PDF document completion:", error);
        return res
          .status(500)
          .send({ error: "Error handling PDF document completion" });
      }
    });

    // End the PDF document
    pdfDoc.end();
  } catch (error) {
    console.error("Error creating PDF:", error);
    return res.status(500).send({ error: "Error creating PDF" });
  }
};

module.exports = materialTestingQuotation;
