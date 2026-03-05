import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
  Alert,
} from "react-bootstrap";

function SearchScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [expandedGames, setExpandedGames] = useState([]);

  // Toggle game rules visibility
  const toggleGameRules = (gameId) => {
    setExpandedGames(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  // All available games database
  const allGames = [
    { 
      id: 1, 
      name: "Chess", 
      category: "Classic", 
      description: "Strategic two-player game with pieces moving on a checkered board",
      rules: [
        "Setup: Place pieces on the first two rows for each player",
        "Objective: Checkmate the opponent's king",
        "Pawns move forward one square (two on first move)",
        "Rooks move horizontally or vertically any distance",
        "Knights move in an L-shape",
        "Bishops move diagonally any distance",
        "Queen moves in any direction any distance",
        "King moves one square in any direction",
        "Check: King is under threat and must move",
        "Checkmate: King cannot escape check - game over"
      ]
    },
    { 
      id: 2, 
      name: "Monopoly", 
      category: "Family", 
      description: "Property trading game where players buy, trade, and develop properties",
      rules: [
        "Each player starts with $1,500",
        "Roll dice, move clockwise, follow space instructions",
        "Buy properties when landing on unowned spaces",
        "Pay rent when landing on owned property",
        "Build houses & hotels after owning color set",
        "Collect $200 when passing GO",
        "Bankruptcy: Out when unable to pay debts"
      ]
    },
    { 
      id: 3, 
      name: "Catan", 
      category: "Strategy", 
      description: "Resource management and trading game set on the island of Catan",
      rules: [
        "First to 10 victory points wins",
        "Roll dice to collect resources",
        "Build settlements (1pt), cities (2pts), roads",
        "Trade resources with players or ports",
        "Robber blocks production on roll of 7",
        "Longest Road: 2 bonus points",
        "Largest Army: 2 bonus points"
      ]
    },
    { 
      id: 4, 
      name: "Scrabble", 
      category: "Word Game", 
      description: "Word formation game using letter tiles on a game board",
      rules: [
        "Each player draws 7 letter tiles",
        "Form words on board connecting to existing words",
        "First word must cover center star",
        "Score: Add letter values × multipliers",
        "Bingo: Use all 7 tiles = +50 bonus",
        "End when tiles run out and player empties rack"
      ]
    },
    { 
      id: 5, 
      name: "Risk", 
      category: "Strategy", 
      description: "Global conquest strategy game with dice-based combat",
      rules: [
        "Conquer all territories or complete secret mission",
        "Turn: Get armies, Attack, Fortify",
        "Attack by rolling dice vs defender",
        "Attacker rolls up to 3, defender up to 2",
        "Conquer by eliminating all defending armies",
        "Earn cards by conquering territories",
        "Trade card sets for bonus armies"
      ]
    },
    { 
      id: 6, 
      name: "Clue", 
      category: "Mystery", 
      description: "Mystery solving game where players deduce who committed the murder",
      rules: [
        "Deduce the murder suspect, weapon, and location",
        "Roll and move to rooms",
        "Make suggestions: suspect + weapon + room",
        "Players disprove by showing cards",
        "Make one accusation per game",
        "Correct accusation wins immediately",
        "Wrong accusation eliminates you"
      ]
    },
    { 
      id: 7, 
      name: "Checkers", 
      category: "Classic", 
      description: "Two-player game where pieces move diagonally and capture opponents",
      rules: [
        "12 pieces per player on dark squares",
        "Move diagonally forward one square",
        "Jump over opponent to capture",
        "Multiple jumps in one turn if possible",
        "Reach opposite end to become King",
        "Kings can move backward",
        "Win by capturing all opponent pieces"
      ]
    },
    { 
      id: 8, 
      name: "Backgammon", 
      category: "Classic", 
      description: "Ancient board game combining strategy and luck with dice rolls",
      rules: [
        "Move 15 checkers around board to home zone",
        "Roll two dice, move that many points",
        "Can split dice between two checkers",
        "Hit opponent's single checker to send to bar",
        "Must enter from bar before other moves",
        "Bear off: Remove checkers from home zone",
        "First to bear off all checkers wins"
      ]
    },
    { 
      id: 9, 
      name: "Ticket to Ride", 
      category: "Strategy", 
      description: "Railway-themed board game about connecting cities",
      rules: [
        "Draw train cards or claim routes",
        "Claim routes by playing matching colored cards",
        "Longer routes score more points",
        "Complete destination tickets for bonus points",
        "Incomplete tickets lose points",
        "Longest continuous route earns bonus",
        "Highest score when someone has ≤2 trains left"
      ]
    },
    { 
      id: 10, 
      name: "Pandemic", 
      category: "Cooperative", 
      description: "Team-based game where players work to stop global disease outbreaks",
      rules: [
        "Team wins by curing all 4 diseases",
        "Each player has unique role/ability",
        "4 actions per turn: move, treat, share cards, build",
        "Draw 2 cards then infect cities",
        "Outbreak spreads disease to adjacent cities",
        "Epidemics increase infection rate",
        "Lose if: 8 outbreaks, no disease cubes, or no cards"
      ]
    },
    { 
      id: 11, 
      name: "Dominion", 
      category: "Card Game", 
      description: "Deck-building game where players acquire cards to build their kingdom",
      rules: [
        "Start with 10 cards (7 copper, 3 estates)",
        "Buy cards from supply to add to deck",
        "Action phase: Play one action card",
        "Buy phase: Buy one card with coins",
        "Discard hand and played cards, draw 5 new",
        "Most victory points when provinces run out wins",
        "Balance buying treasure, actions, and victory cards"
      ]
    },
    { 
      id: 12, 
      name: "Azul", 
      category: "Puzzle", 
      description: "Tile-placement game inspired by Portuguese tiles",
      rules: [
        "Draft tiles from factory displays",
        "Place tiles in pattern lines",
        "Complete pattern line to move to wall",
        "Score points for adjacent tiles on wall",
        "Penalty for tiles that don't fit",
        "Bonus for completing rows, columns, colors",
        "Highest score after all tiles placed wins"
      ]
    },
  ];

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Filter games based on search query (case-insensitive)
    const results = allGames.filter(
      (game) =>
        game.name.toLowerCase().includes(query.toLowerCase()) ||
        game.category.toLowerCase().includes(query.toLowerCase()) ||
        game.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const currentQuery = searchParams.get("q") || "";

  return (
    <Container className="py-5">
      {/* Search Bar */}
      <Row className="mb-4">
        <Col lg={8} className="mx-auto">
          <Form onSubmit={handleSearch}>
            <InputGroup size="lg">
              <Form.Control
                type="text"
                placeholder="Search for a board game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {/* Search Results */}
      {currentQuery && (
        <>
          <Row className="mb-4">
            <Col>
              <h3>
                Search Results for: <span className="text-primary">"{currentQuery}"</span>
              </h3>
              <p className="text-muted">
                Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
              </p>
            </Col>
          </Row>

          {searchResults.length > 0 ? (
            <Row>
              {searchResults.map((game) => (
                <Col key={game.id} md={6} lg={4} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>{game.name}</Card.Title>
                      <Badge bg="secondary" className="mb-3">
                        {game.category}
                      </Badge>
                      
                      {expandedGames.includes(game.id) ? (
                        <div className="rules-list mb-3">
                          <h6 className="mb-2">Game Rules:</h6>
                          <ul className="small">
                            {game.rules.map((rule, index) => (
                              <li key={index} className="mb-1">{rule}</li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Card.Text>{game.description}</Card.Text>
                      )}
                      
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => toggleGameRules(game.id)}
                      >
                        {expandedGames.includes(game.id) ? 'Hide Rules' : 'View Rules'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="info">
              <Alert.Heading>No results found</Alert.Heading>
              <p>
                We couldn't find any board games matching "<strong>{currentQuery}</strong>".
                Try searching for:
              </p>
              <ul>
                <li>Popular games like Chess, Monopoly, or Catan</li>
                <li>Game categories like Strategy, Family, or Classic</li>
                <li>Different spellings or variations</li>
              </ul>
            </Alert>
          )}
        </>
      )}

      {/* Initial State - No Search Yet */}
      {!currentQuery && (
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <h4 className="mb-3">Search for Board Game Rules</h4>
            <p className="text-muted">
              Enter a game name or category to find detailed rules, win conditions,
              and turn phases for your favorite board games.
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default SearchScreen;
