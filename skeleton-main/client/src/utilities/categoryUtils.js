// Map of basic category names to their emoji versions
const categoryToEmojiMap = {
  "Textbooks": "Textbooks 📚",
  "Electronics": "Electronics 💻",
  "Furniture": "Furniture 🪑",
  "Clothing": "Clothing 👕",
  "School Supplies": "School Supplies ✏️",
  "Other": "Other 🦫"
};

// Convert a basic category to its emoji version
export const getCategoryWithEmoji = (category) => {
  const basicCategory = category.split(" ")[0]; // Remove any existing emoji
  return categoryToEmojiMap[basicCategory] || category;
};

// Get basic category without emoji
export const getBasicCategory = (category) => {
  return category.split(" ")[0];
}; 