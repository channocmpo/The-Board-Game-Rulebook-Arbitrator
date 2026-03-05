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

  // All available games database
  const allGames = [
    { id: 1, name: "Chess", category: "Classic", description: "Strategic two-player game with pieces moving on a checkered board" },
    { id: 2, name: "Monopoly", category: "Family", description: "Property trading game where players buy, trade, and develop properties" },
    { id: 3, name: "Catan", category: "Strategy", description: "Resource management and trading game set on the island of Catan" },
    { id: 4, name: "Scrabble", category: "Word Game", description: "Word formation game using letter tiles on a game board" },
    { id: 5, name: "Risk", category: "Strategy", description: "Global conquest strategy game with dice-based combat" },
    { id: 6, name: "Clue", category: "Mystery", description: "Mystery solving game where players deduce who committed the murder" },
    { id: 7, name: "Checkers", category: "Classic", description: "Two-player game where pieces move diagonally and capture opponents" },
    { id: 8, name: "Backgammon", category: "Classic", description: "Ancient board game combining strategy and luck with dice rolls" },
    { id: 9, name: "Ticket to Ride", category: "Strategy", description: "Railway-themed board game about connecting cities" },
    { id: 10, name: "Pandemic", category: "Cooperative", description: "Team-based game where players work to stop global disease outbreaks" },
    { id: 11, name: "Dominion", category: "Card Game", description: "Deck-building game where players acquire cards to build their kingdom" },
    { id: 12, name: "Azul", category: "Puzzle", description: "Tile-placement game inspired by Portuguese tiles" },
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
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>{game.name}</Card.Title>
                      <Badge bg="secondary" className="mb-3">
                        {game.category}
                      </Badge>
                      <Card.Text>{game.description}</Card.Text>
                      <Button variant="primary" size="sm">
                        View Rules
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
