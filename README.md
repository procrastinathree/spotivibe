# SpotiVibe

![# Spotivibe logo for light mode](https://github.com/procrastinathree/spotivibe/blob/main/public/banner-light.png#gh-light-mode-only)
![# Spotivibe logo for dark mode](https://github.com/procrastinathree/spotivibe/blob/main/public/banner-dark.png#gh-dark-mode-only)



`Spotivibe` is a web application that enhances your Spotify experience by acquiring data from the Spotify API and providing various features like creating playlists, tracking your Spotify activity, and more.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

`Spotivibe` offers the following features:

- **Playlist Creation**: Create custom playlists based on your music preferences and favorite tracks.
- **Spotify Activity Tracker**: Keep track of your listening habits and get insights into your music choices.
- **Spotify API Integration**: Access Spotify's vast music library and user data.
- **User Authentication**: Securely log in with your Spotify account.
- **User Profile**: View and manage your `Spotivibe` user profile.
- **And More**: Explore and discover other exciting functionalities!

## Getting Started

Follow these steps to set up `Spotivibe` on your local machine.

### Prerequisites

- Node.js and npm installed on your computer.
- Spotify Developer Account to access the Spotify API.

### Installation

1 . Clone the repository:

   ```bash
   git clone https://github.com/procrastinathree/spotivibe.git
   cd spotivibe
   ```
2 . Install the required dependencies:

   ```bash
   npm install
   yarn install
   ```
3 . Create a `.env` file in the root directory and add the following variables with your Spotify API credentials:

   ```bash
    SPOTIFY_CLIENT_ID=your_client_id
    SPOTIFY_CLIENT_SECRET=your_client_secret
    SPOTIFY_REDIRECT_URI=your_redirect_url
   ```
4 . Start an application (dev)

   ```bash
   npm run dev
   ```

## Usage

1 . Open your web browser and navigate to `http://localhost:5173`

2 . Log in with your Spotify account to start using `Spotivibe`

3 . Explore the features, create playlists, and track your Spotify activity!

## API Integration
`Spotivibe` relies on the Spotify API for various functionalities. You can learn more about the Spotify API by visiting the Spotify for Developers website and obtaining your API credentials.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Author
`Spotivibe` is created by <a href="https://github.com/ramenaru">ramenaru</a>, <a href="https://github.com/KaisAbiyyi">Kais</a>


