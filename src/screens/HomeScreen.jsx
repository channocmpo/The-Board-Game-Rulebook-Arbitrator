import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";

function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
    const [expandedGames, setExpandedGames] = useState([]);
  const navigate = useNavigate();

  const popularGames = [
    { 
      id: 1, 
      name: "Chess", 
      category: "Classic",
      rules: [
        "Setup: Place pieces on the first two rows for each player",
        "Objective: Checkmate the opponent's king",
        "Movement: Each piece has unique movement patterns",
        "Pawns move forward one square (two on first move)",
        "Rooks move horizontally or vertically any distance",
        "Knights move in an L-shape (2 squares + 1 square perpendicular)",
        "Bishops move diagonally any distance",
        "Queen moves in any direction any distance",
        "King moves one square in any direction",
        "Special moves: Castling, En Passant",
        "Check: King is under threat and must move",
        "Checkmate: King cannot escape check - game over"
      ]
    },
    { 
      id: 2, 
      name: "Monopoly", 
      category: "Family",
      rules: [
        "Setup: Each player starts with $1,500",
        "Objective: Bankrupt all other players",
        "Turn: Roll dice, move clockwise, follow space instructions",
        "Properties: Can be purchased if unowned",
        "Rent: Must be paid when landing on owned property",
        "Houses & Hotels: Build after owning all properties of a color",
        "Chance & Community Chest: Draw and follow card instructions",
        "GO: Collect $200 when passing or landing",
        "Jail: Move there by landing, rolling doubles 3x, or drawing card",
        "Free Parking: Safe space with no action",
        "Bankruptcy: Out of game when unable to pay debts"
      ]
    },
    { 
      id: 3, 
      name: "Catan", 
      category: "Strategy",
      rules: [
        "Setup: Create island with hexagonal terrain tiles",
        "Objective: First to 10 victory points wins",
        "Turn: Roll dice, collect resources, build, trade",
        "Resources: Brick, lumber, wool, grain, ore",
        "Building: Settlements (1 point), Cities (2 points), Roads",
        "Development Cards: Bought with resources, provide advantages",
        "Trading: Exchange resources with other players or ports",
        "Robber: Activated on rolling 7, blocks resource production",
        "Longest Road: 2 bonus points for 5+ connected roads",
        "Largest Army: 2 bonus points for 3+ knight cards played"
      ]
    },
    { 
      id: 4, 
      name: "Scrabble", 
      category: "Word Game",
      rules: [
        "Setup: Each player draws 7 letter tiles",
        "Objective: Highest score after all tiles are played",
        "Turn: Form words on board using your tiles",
        "Scoring: Add letter values (A=1, Z=10, etc.)",
        "First word: Must cover center star square",
        "Words: Must connect to existing words",
        "Direction: Words read left-to-right or top-to-bottom",
        "Double/Triple: Letter and Word score multipliers",
        "Bingo: Use all 7 tiles in one turn = +50 bonus points",
        "Challenge: Disputed words can be checked in dictionary",
        "End: Game ends when tile bag is empty and one player uses all tiles"
      ]
    },
    { 
      id: 5, 
      name: "Risk", 
      category: "Strategy",
      rules: [
        "Setup: Distribute territories and place initial armies",
        "Objective: Conquer all territories or complete secret mission",
        "Turn phases: Get armies, Attack, Fortify",
        "Reinforcements: Based on territories and continents controlled",
        "Attack: Choose adjacent territories, roll dice to battle",
        "Attacker rolls up to 3 dice, defender up to 2 dice",
        "Battle outcome: Compare highest dice, loser removes armies",
        "Conquering: Occupy territory after eliminating all defending armies",
        "Cards: Earn by conquering at least one territory per turn",
        "Card sets: Trade for bonus armies (3 of same or 1 of each)",
        "Fortify: Move armies between connected territories you control"
      ]
    },
    { 
      id: 6, 
      name: "Clue", 
      category: "Mystery",
      rules: [
        "Setup: Randomly select suspect, weapon, room cards for solution",
        "Objective: Correctly deduce the murder suspect, weapon, and location",
        "Turn: Roll dice, move to rooms, make suggestions",
        "Movement: Move along hallways or take secret passages",
        "Suggestion: Upon entering room, suggest suspect + weapon + room",
        "Disprove: Next player shows you one card if they have it",
        "Accusation: Once per game, guess the solution",
        "Correct accusation: You win immediately",
        "Wrong accusation: You're eliminated but still disprove others",
        "Notebook: Track clues to eliminate possibilities",
        "Win: First to correctly accuse wins"
      ]
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleGameRules = (gameId) => {
    setExpandedGames(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section text-white py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 mb-3">
                The Board Game Rulebook Arbitrator
              </h1>
              <p className="lead mb-4">
                Clarifying specific rules, turn phases, and win conditions for
                tabletop and board games
              </p>
              <Form onSubmit={handleSearch}>
                <InputGroup size="lg">
                  <Form.Control
                    type="text"
                    placeholder="Search for a board game (e.g., Chess, Monopoly, Catan)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="light" type="submit">
                    Search
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h3 className="mb-3">Popular Board Games</h3>
            <p className="text-muted">
              Browse rules for the most popular tabletop games
            </p>
          </Col>
        </Row>

        <Row>
          {popularGames.map((game) => (
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
                    <Card.Text>
                      View detailed rules, turn phases, and win conditions for{" "}
                      {game.name}.
                    </Card.Text>
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

        {/* Features Section */}
        <Row className="mt-5">
          <Col lg={4} className="mb-4">
            <Card className="text-center h-100 border-0">
              <Card.Body>
                <div className="mb-3 feature-icon">
                  <h3>Comprehensive Rules</h3>
                </div>
                <Card.Title>Comprehensive Rules</Card.Title>
                <Card.Text>
                  Access detailed rulebooks for Chess, Monopoly, Catan, and
                  many more tabletop games.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="mb-4">
            <Card className="text-center h-100 border-0">
              <Card.Body>
                <div className="mb-3 feature-icon">
                  <h3>Win Conditions</h3>
                </div>
                <Card.Title>Win Conditions</Card.Title>
                <Card.Text>
                  Clear explanations of how to win each game and track your
                  progress.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="mb-4">
            <Card className="text-center h-100 border-0">
              <Card.Body>
                <div className="mb-3 feature-icon">
                  <h3>Rule Arbitration</h3>
                </div>
                <Card.Title>Rule Arbitration</Card.Title>
                <Card.Text>
                  Resolve disputes with official rules and clarifications for
                  turn phases.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeScreen;
