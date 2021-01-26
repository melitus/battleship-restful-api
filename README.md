# battleship-restful-api

## Design of the Battleship restful api

## Problem statement

Our aim is to write a program in Nodejs that will play the popular game of Battleship either against the computer, or against another player on a different computer, running a different program.

## Problem description
There are two players in this game, Defender and Attacker.
The game is played with a fleet of the following ships: 1x Battleship, 2x Cruisers, 3x Destroyers
and 4x Submarines.
Ships are placed on a game board. A game board is a 10x10 grid where each grid cell is identified by unique coordinates. Each ship occupies a number of consecutive squares on the
grid, arranged either horizontally or vertically.
The number of squares for each ship is determined by the type of the ship. Ship placements cannot overlap or be next to each other. Only one ship can occupy any given square in the grid.
Ships should have at least one square between them in all directions.
A defender must setup a game board and place all available ships on it. An attacker must then find and destroy all ships on the board. After all ships have been placed by the Defender, the Attacker will start to attack by announcing a target square in the grid to which it is going to shoot. After the attacker has sunk all the ships placed by the defender, the game is over.


 ## Set Up

The easiest way to get started is to clone the repository:

# clone the repository

```
git clone https://github.com/melitus/battleship-restful-api.git
```

# Change directory

```
cd battleship-restful-api
```

# Install NPM dependencies

```
yarn install
```
```
create .env file at the root directory
```
Samples:

PORT=3000<br/>
NODE_ENV=development<br/>
MONGO_URI=xxxxxxxxxxxxxxx<br/>
MONGO_URI_TESTS=xxxxxxxxxxxxx


# start the server

```
yarn run dev
```
# run tests

```
yarn run test
```

Note: It is recommended to install nodemon for livereloading - It watches for any changes in your node.js app and automatically restarts the server


## Links
- https://en.wikipedia.org/wiki/Battleship_(game)