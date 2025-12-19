
/**
 * Striker Configuration
 * Holds constants and mappings for the Hat-Trick Pattern
 */
export const StrikerConfig = {
  // Product Handles/IDs (Mock Values)
  products: {
    customizationService: {
      handle: "customization-service",
      variantId: "gid://shopify/ProductVariant/MOCK_CUSTOM_SERVICE_123",
      productId: "gid://shopify/Product/MOCK_CUSTOM_SERVICE_PRODUCT"
    },
    badges: {
      "LALIGA": {
        handle: "badge-laliga",
        variantId: "gid://shopify/ProductVariant/MOCK_BADGE_LALIGA_456",
        name: "La Liga Badge"
      },
      "UCL": {
        handle: "badge-ucl",
        variantId: "gid://shopify/ProductVariant/MOCK_BADGE_UCL_789",
        name: "Champions League Badge"
      }
    }
  },

  // Customization Properties Keys
  properties: {
    name: "Name",
    number: "Number"
  },

  // Tool Definition for Claude
  toolDefinition: {
    name: "add_customized_jersey_to_cart",
    description: "Adds a customized football jersey to the cart using the 'Hat-Trick' pattern. This includes the jersey itself, a competition badge, and the name/number customization service.",
    input_schema: {
      type: "object",
      properties: {
        jerseyVariantId: {
          type: "string",
          description: "The Variant ID of the base jersey product"
        },
        competition: {
          type: "string",
          enum: ["LALIGA", "UCL"],
          description: "The competition badge to apply (e.g., 'LALIGA', 'UCL')"
        },
        customName: {
          type: "string",
          description: "The player name to print on the jersey"
        },
        customNumber: {
          type: "number",
          description: "The player number to print on the jersey"
        }
      },
      required: ["jerseyVariantId", "competition", "customName", "customNumber"]
    }
  }
};

export default StrikerConfig;
