package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

const (
	apiURL = "http://localhost:8090/api/collections/wordpairs/records" // Update this if your PocketBase is hosted elsewhere
)

// WordPair represents the structure of the word pair data
type WordPair struct {
	Base        string `json:"base"`
	Replacement string `json:"replacement"`
	IsApproved  bool   `json:"isApproved"`
}

func main() {
	// Define the word pairs to insert
	wordPairs := []WordPair{
		{"schön", "Wunderschön", true},
		{"hässlich", "Abscheulich", true},
		{"gut", "Hervorragend", true},
		{"schlecht", "Miserabel", true},
		{"gross", "Riesig", true},
		{"klein", "Winzig", true},
		{"schnell", "Blitzschnell", true},
		{"langsam", "Schneckentempo", true},
		{"glücklich", "Überglücklich", true},
		{"traurig", "Herzzerreissend", true},
		{"heiss", "Glühend", true},
		{"kalt", "Eiskalt", true},
		{"schlau", "Genial", true},
		{"dumm", "Idiotisch", true},
		{"stark", "Mächtig", true},
		{"schwach", "Kraftlos", true},
		{"reich", "Wohlhabend", true},
		{"arm", "Mittellos", true},
		{"sauber", "Blitzsauber", true},
		{"schmutzig", "Verdreckt", true},
		{"müde", "Erschöpft", true},
		{"einfach", "Kinderleicht", true},
		{"schwierig", "Knifflig", true},
		{"hungrig", "Ausgehungert", true},
		{"durstig", "Verdurstet", true},
		{"alt", "Uralte", true},
		{"jung", "Jungfrisch", true},
	}

	// Add each word pair to the database
	for _, pair := range wordPairs {
		if err := addWordPair(pair); err != nil {
			fmt.Printf("Failed to add word pair (%s => %s): %s\n", pair.Base, pair.Replacement, err)
		} else {
			fmt.Printf("Successfully added word pair: %s => %s\n", pair.Base, pair.Replacement)
		}
	}
}

// addWordPair sends a POST request to PocketBase to add a word pair
func addWordPair(pair WordPair) error {
	// Serialize the WordPair struct to JSON
	data, err := json.Marshal(pair)
	if err != nil {
		return fmt.Errorf("failed to serialize word pair: %w", err)
	}

	// Create the HTTP POST request
	req, err := http.NewRequest("POST", apiURL, bytes.NewBuffer(data))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	// Add headers for JSON content and authentication
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	// Check for successful response
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("received non-OK response: %s", resp.Status)
	}

	return nil
}
