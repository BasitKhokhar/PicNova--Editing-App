const prisma = require('../prisma/client');

exports.getFAQs = async (req, res) => {
  const faqs = await prisma.$queryRaw`SELECT * FROM faq`;
  res.json(faqs);
};

exports.getLogoImage = async (req, res) => {
  const result = await prisma.$queryRaw`SELECT * FROM logoimage WHERE id = 1`;
  res.json(result);
};

exports.getSliderImages = async (req, res) => {
  const result = await prisma.$queryRaw`SELECT * FROM sliderimages`;
  res.json(result);
};

exports.getSocialIcons = async (req, res) => {
  const result = await prisma.$queryRaw`SELECT icons, routes FROM social_icons`;
  res.json(result);
};
