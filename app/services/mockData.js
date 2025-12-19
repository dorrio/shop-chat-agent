/**
 * Mock Data for Striker
 * Simulates catalog and player database
 */

export const MockData = {
  // Mock Jerseys
  jerseys: [
    {
      id: "gid://shopify/Product/MOCK_JERSEY_RM_HOME",
      title: "Real Madrid Home Jersey 23/24",
      variants: [
        {
          id: "gid://shopify/ProductVariant/MOCK_VAR_RM_HOME_M",
          title: "Medium",
          price: "120.00",
          currency: "EUR"
        }
      ]
    },
    {
      id: "gid://shopify/Product/MOCK_JERSEY_BARCA_HOME",
      title: "FC Barcelona Home Jersey 23/24",
      variants: [
        {
          id: "gid://shopify/ProductVariant/MOCK_VAR_BARCA_HOME_M",
          title: "Medium",
          price: "115.00",
          currency: "EUR"
        }
      ]
    }
  ],

  // Mock Player Database
  players: [
    { name: "VINICIUS JR", number: 7, team: "Real Madrid" },
    { name: "BELLINGHAM", number: 5, team: "Real Madrid" },
    { name: "MODRIC", number: 10, team: "Real Madrid" },
    { name: "LEWANDOWSKI", number: 9, team: "FC Barcelona" },
    { name: "PEDRI", number: 8, team: "FC Barcelona" },
    { name: "GAVI", number: 6, team: "FC Barcelona" }
  ]
};

export default MockData;
