import React, { useState } from "react";
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

  const popularGames = [
    { id: 1, name: "Chess", category: "Classic" },
    { id: 2, name: "Monopoly", category: "Family" },
    { id: 3, name: "Catan", category: "Strategy" },
    { id: 4, name: "Scrabble", category: "Word Game" },
    { id: 5, name: "Risk", category: "Strategy" },
    { id: 6, name: "Clue", category: "Mystery" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
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
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Badge bg="secondary" className="mb-3">
                    {game.category}
                  </Badge>
                  <Card.Text>
                    View detailed rules, turn phases, and win conditions for{" "}
                    {game.name}.
                  </Card.Text>
                  <Button variant="primary" size="sm">
                    View Rules
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
                <div className="mb-3">
                  <h2>📚</h2>
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
                <div className="mb-3">
                  <h2>🎯</h2>
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
                <div className="mb-3">
                  <h2>⚖️</h2>
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
