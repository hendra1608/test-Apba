const randomString = "PT.AbadI*perKASa@BeRsAmA-DIGItAL#SolUTiONs";
const cleaned = randomString
  .replace(/[^a-zA-Z. ]/g, " ")
  .replace(/\s+/g, " ")
  .toLowerCase()
  .replace(/\b\w/g, (c) => c.toUpperCase());

console.log(cleaned);
