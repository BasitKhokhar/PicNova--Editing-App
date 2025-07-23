// const prisma = require('../prisma/client');

// exports.getFAQs = async (req, res) => {
//   const faqs = await prisma.$queryRaw`SELECT * FROM faq`;
//   res.json(faqs);
// };

// exports.getLogoImage = async (req, res) => {
//   const result = await prisma.$queryRaw`SELECT * FROM logoimage WHERE id = 1`;
//   res.json(result);
// };

// exports.getSliderImages = async (req, res) => {
//   const result = await prisma.$queryRaw`SELECT * FROM sliderimages`;
//   res.json(result);
// };
// exports.getPaymentBtnImage = async (req, res) => {
//   const result = await prisma.$queryRaw`SELECT * FROM sliderimages where id = 3`;
//   console.log("Payment Button Image Data:", result);
//   res.json(result);
// };
// exports.getSocialIcons = async (req, res) => {
//   const result = await prisma.$queryRaw`SELECT icons, routes FROM social_icons`;
//   res.json(result);
// };
const prisma = require('../prisma/client');

exports.getFAQs = async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany(); 
    res.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getLogoImage = async (req, res) => {
  try {
    const logo = await prisma.logoimage.findUnique({
      where: { id: 1 }, 
    });
    console.log("Logo Image Data:", logo);
    if (logo) {
      res.json(logo);
    } else {
      res.status(404).json({ message: "Logo not found" });
    }
  } catch (error) {
    console.error("Error fetching logo image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSliderImages = async (req, res) => {
  try {
    const images = await prisma.sliderimages.findMany(); 
    res.json(images);
  } catch (error) {
    console.error("Error fetching slider images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPaymentBtnImage = async (req, res) => {
  try {
    const image = await prisma.sliderimages.findUnique({
      where: { id: 3 }, 
    });

    if (image) {
      console.log("Payment Button Image Data:", image);
      res.json(image);
    } else {
      res.status(404).json({ message: "Payment image not found" });
    }
  } catch (error) {
    console.error("Error fetching payment button image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSocialIcons = async (req, res) => {
  try {
    const icons = await prisma.social_icons.findMany({
      select: {
        icons: true,
        routes: true
      }
    }); // ✅ Select specific fields
    res.json(icons);
  } catch (error) {
    console.error("Error fetching social icons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
