# Jim from Outer Space

Text-based game "Jim from Outer Space" (Spanish: "Jim del Espacio Exterior") by Daniel Rodriguez Rivero (Spanish: Daniel Rodríguez Rivero) and Nikita Tseykovets.

The game is in Spanish and developed for [UrqW](https://github.com/urqw/UrqW) text-based game engine.

This repository contains the source code and other resources of the game. The game is available for launch in the [UrqW engine online catalog](https://urqw.github.io/UrqW/?id=jim_from_outer_space).

The game was first published on February 16, 2026.

Interactive fiction identifier (IFID) of the game: B63135C1-606B-40A1-AB70-D8AA044C861D

## Description

Eres Jim, miembro de la Espacio Exterior 1, la comisaría de policía más estrafalaria de toda la galaxia. Tu turno está a punto de terminar cuando el jefe te llama su despacho. El universo te necesita. ¿Estás preparado para aceptar la llamada?

## Development

The game is developed using the [game template](https://github.com/urqw/game_template) for [UrqW engine](https://github.com/urqw/UrqW).

Workflow:

1. Clone the Game repository (`git clone`) and go to its directory (`cd`).
2. Install all dependencies:
	```shell
	npm install
	```
3. All game data is stored in the urqw directory. This is where the game development takes place.
4. Open the UrqW documentation if needed:
	```shell
	npm run docs
	```
5. Make your changes to the game files and build the project:
	```shell
	npm run build
	```
6. After the first build, run a local web server with an interpreter to debug the game you are developing:
	```shell
	npm start
	```
7. After significant changes to the project, rebuild it:
	```shell
	npm run build
	```
	The web server with the running interpreter will automatically track the build update and initiate a reload of the page with the new version of the game. \
	At any time, you can open the menu in the interpreter interface and expand the Debugging section to see additional information about the running game. The information is constantly updated.
8. Continue developing the game and debugging it in the running interpreter. In parallel, you can use the version control system to save the development history. Binary builds of the game will not be included in the Git history.
9. At any time, you can extract the text of descriptions, actions, string literals, and comments from the game's source code to proofread it separately from the programming language constructs:
	```shell
	npm run extract
	```
10. Once the game is ready to be a major update, you can create (or update) an iFiction record with the game's metadata:
	```shell
	npm run ifiction
	```
	Enter the data that will be requested. See the [Treaty of Babel](https://babel.ifarchive.org) for more details.
11. Once the game is ready, you can build the release as an archive:
	```shell
	npm run release
	```
	This archive is suitable for running in UrqW. \
	Or you can add or update the game repository to the UrqW instance repository as a Git submodule. The project structure meets the necessary UrqW requirements for adding games as submodules.

For details, please refer to the UrqW documentation.

## License

Copyright (C) 2007 Daniel Rodriguez Rivero <danielrodriguezrivero@gmail.com>

Copyright (C) 2026 Nikita Tseykovets <tseikovets@rambler.ru>

Jim from Outer Space is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

You should have received a copy of the license along with this work. If not, see <https://creativecommons.org/licenses/by-nc-sa/4.0/>.
