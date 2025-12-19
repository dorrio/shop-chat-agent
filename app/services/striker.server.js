import StrikerConfig from "./strikerConfig";
import MockData from "./mockData";

/**
 * Striker Service
 * Orchestrates the "Hat-Trick Pattern" for customized jersey orders.
 */
export const StrikerService = {
  /**
   * Adds a customized jersey to the cart (Mock Implementation).
   *
   * @param {Object} params - The parameters for the customization
   * @param {string} params.jerseyVariantId - The ID of the jersey variant
   * @param {string} params.competition - The competition code (LALIGA, UCL)
   * @param {string} params.customName - The name to print
   * @param {number} params.customNumber - The number to print
   * @returns {Promise<Object>} The result of the operation
   */
  async addCustomizedJerseyToCart({ jerseyVariantId, competition, customName, customNumber }) {
    console.log("Executing Hat-Trick Pattern for:", { jerseyVariantId, competition, customName, customNumber });

    // 1. Validate Inputs
    if (!jerseyVariantId) throw new Error("Jersey Variant ID is required");
    if (!competition) throw new Error("Competition is required");
    if (!customName) throw new Error("Custom Name is required");
    if (customNumber === undefined || customNumber === null) throw new Error("Custom Number is required");

    // Validate Number (0-99)
    const number = parseInt(customNumber);
    if (isNaN(number) || number < 0 || number > 99) {
      return {
        error: {
          type: "validation_error",
          data: "Jersey number must be between 0 and 99."
        }
      };
    }

    // 2. Resolve Badge
    const badge = StrikerConfig.products.badges[competition];
    if (!badge) {
      return {
        error: {
          type: "validation_error",
          data: `Invalid competition: ${competition}. Supported: ${Object.keys(StrikerConfig.products.badges).join(", ")}`
        }
      };
    }

    // 3. Resolve Customization Service
    const customizationService = StrikerConfig.products.customizationService;

    // 4. Construct Cart Lines (Conceptually - for the mock response)
    const cartLines = [
      // Line 1: The Jersey
      {
        merchandiseId: jerseyVariantId,
        quantity: 1
      },
      // Line 2: The Badge
      {
        merchandiseId: badge.variantId,
        quantity: 1
      },
      // Line 3: The Customization Service
      {
        merchandiseId: customizationService.variantId,
        quantity: 1,
        attributes: [
          { key: StrikerConfig.properties.name, value: customName },
          { key: StrikerConfig.properties.number, value: number.toString() }
        ]
      }
    ];

    // 5. Mock Response (Since we don't have real API access yet)
    // In a real implementation, we would call the Shopify API / MCP Tool here.

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            message: "Hat-Trick! Customized Jersey added to cart successfully.",
            details: {
              jersey: jerseyVariantId,
              badge: badge.name,
              customization: `${customName} #${number}`,
              items_added: 3
            },
            cart_lines: cartLines
          })
        }
      ]
    };
  },

  /**
   * Searches for mock jerseys.
   *
   * @param {Object} params - Search parameters (optional)
   * @param {string} params.query - The search query
   * @returns {Promise<Object>} The result of the operation
   */
  async searchJerseys({ query } = {}) {
    console.log("Searching mock jerseys with query:", query);

    // Filter jerseys if query is provided
    let jerseys = MockData.jerseys;
    if (query) {
      const lowerQuery = query.toLowerCase();
      jerseys = jerseys.filter(jersey =>
        jersey.title.toLowerCase().includes(lowerQuery)
      );
    }

    // Return formatted as a tool result
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            products: jerseys.map(jersey => ({
              product_id: jersey.id,
              title: jersey.title,
              variants: jersey.variants,
              price_range: {
                min: jersey.variants[0].price,
                currency: jersey.variants[0].currency
              }
            }))
          })
        }
      ]
    };
  },

  /**
   * Gets the list of available players for customization.
   *
   * @param {Object} params - Search parameters (optional)
   * @param {string} params.team - Filter by team
   * @returns {Promise<Object>} The result of the operation
   */
  async getPlayerList({ team } = {}) {
    console.log("Getting player list, team filter:", team);

    let players = MockData.players;
    if (team) {
      const lowerTeam = team.toLowerCase();
      players = players.filter(p => p.team.toLowerCase().includes(lowerTeam));
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            players: players
          })
        }
      ]
    };
  },

  /**
   * Helper to get the tool definition
   */
  getToolDefinitions() {
    return [
      StrikerConfig.toolDefinition,
      {
        name: "search_mock_jerseys",
        description: "Searches for football jerseys in the mock catalog. Use this to find available jerseys for customization.",
        input_schema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search term for the jersey (e.g., 'Real Madrid')"
            }
          }
        }
      },
      {
        name: "get_player_list",
        description: "Retrieves a list of famous players (Name and Number) to choose from for customization. Can filter by team.",
        input_schema: {
          type: "object",
          properties: {
            team: {
              type: "string",
              description: "Optional team name to filter players (e.g., 'Real Madrid')"
            }
          }
        }
      }
    ];
  },

  getToolDefinition() {
     // Backwards compatibility if needed, but we should switch to getToolDefinitions
     return StrikerConfig.toolDefinition;
  }
};

export default StrikerService;
