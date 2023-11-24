
import React, { Component } from 'react';
import { Button, TextArea, Grid, Segment } from 'semantic-ui-react';
import query from './api'; // Replace with your actual API component
import './text_input.css'; // Import the CSS file

class ComicStoryGenerator extends Component {
  state = {
    userInput: Array(10).fill(''), // Array to store values of 10 text areas
    comicStory: null,
    loading: false,
    error: null,
    imageUrls: [], // New state to store the array of image URLs
  };

  handleInputChange = (index, value) => {
    const { userInput } = this.state;
    const updatedUserInput = [...userInput];
    updatedUserInput[index] = value;
    this.setState({ userInput: updatedUserInput });
  };

  // Modified handleGenerateComicStory method
  handleGenerateComicStory = async () => {
    const { userInput } = this.state;

    // Check if any of the text areas are empty
    if (userInput.some((text) => !text.trim())) {
      this.setState({ error: 'Please fill in all text areas.' });
      return;
    }

    this.setState({ loading: true, comicStory: null, error: null, imageUrls: [] });

    try {
      // Generate images for each text area one by one
      const imageUrls = await Promise.all(
        userInput.map(async (text) => {
          const trimmedText = text.trim();
          if (trimmedText) {
            const imageBlob = await query({ inputs: trimmedText });
            return URL.createObjectURL(imageBlob);
          }
          return null;
        })
      );

      // Filter out any null values (errors)
      const filteredImageUrls = imageUrls.filter((url) => url !== null);

      // Set the state with the generated image URLs
      this.setState({
        loading: false,
        comicStory: 'Comic stories generated!',
        imageUrls: filteredImageUrls,
      });
    } catch (error) {
      console.error('Error generating comic stories:', error);
      this.setState({ error: 'Error generating comic stories', loading: false });
    }
  };

  // New method to render merged images in a 5x5 grid
  renderMergedImages = () => {
    const { imageUrls } = this.state;

    // Ensure 'imageUrls' is defined
    if (typeof imageUrls === 'undefined') return null;

    // Organize the images into rows of 5
    const rows = [];
    for (let i = 0; i < imageUrls.length; i += 5) {
      rows.push(imageUrls.slice(i, i + 5));
    }

    // Render the merged images in a 5x2 grid
    return rows.map((row, rowIndex) => (
      <Grid.Row key={rowIndex}>
        {row.map((imageUrl, colIndex) => (
          <Grid.Column key={colIndex} width={3}>
            <img
              src={imageUrl}
              alt={`Generated Comic ${rowIndex * 5 + colIndex + 1}`}
              className="comic-image"
            />
          </Grid.Column>
        ))}
      </Grid.Row>
    ));
  };

  render() {
    const { userInput, comicStory, loading, error } = this.state;

    return (
      <Grid columns={4} stackable centered>
        {[...Array(2)].map((_, rowIndex) => (
          <Grid.Row key={rowIndex}>
            {userInput.slice(rowIndex * 4, (rowIndex + 1) * 4).map((text, colIndex) => (
              <Grid.Column key={colIndex} width={4}>
                <TextArea
                  placeholder={`Enter Storyline ${rowIndex * 4 + colIndex + 1}...`}
                  value={text}
                  onChange={(e) =>
                    this.handleInputChange(rowIndex * 4 + colIndex, e.target.value)
                  }
                  className="text-area"
                  rows={4}
                  cols={30} // Adjust the number of columns as needed
                />
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}

        <Grid.Row>
          {userInput.slice(8, 10).map((text, colIndex) => (
            <Grid.Column key={colIndex} width={8}>
              <TextArea
                placeholder={`Enter story line ${8 + colIndex + 1}...`}
                value={text}
                onChange={(e) => this.handleInputChange(8 + colIndex, e.target.value)}
                className="text-area"
                rows={4}
                cols={30} // Adjust the number of columns as needed
              />
            </Grid.Column>
          ))}
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Button
              large
              onClick={this.handleGenerateComicStory}
              loading={loading}
              className="huge ui purple button generate-button"
            >
              Generate Comic Story
            </Button>
            {error && <p className="error-message">{error}</p>}
          </Grid.Column>
        </Grid.Row>

        {comicStory && (
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
                <h3>Generated Comic Story</h3>
                <p>{comicStory}</p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        )}

        {this.renderMergedImages()}
      </Grid>
    );
  }
}

export default ComicStoryGenerator;
 