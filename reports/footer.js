const createFooter = (currentPage, pageCount) => {
  return {
    stack: [
      {
        canvas: [
          { text: "", margin: [0, 100, 0, 0] },
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 600,
            y2: 0,
            lineWidth: 0.5,
            lineColor: "#000000",
          },
        ],
      },

      {
        text:
          "Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad-500079, Telangana.\n" +
          "Mobile: 9985122283, Email: info@kdmengineers.com, Website: www.kdmengineers.com",
        alignment: "center",
        fontSize: 10,
        margin: [0, 4, 0, 0],
      },
      // Page number
      {
        text: `Page ${currentPage} of ${pageCount}`,
        alignment: "center",
        fontSize: 10,
      },
    ],
  };
};

module.exports = createFooter;
