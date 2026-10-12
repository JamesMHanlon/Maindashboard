# James MH Games: main dashboard

The home page for james-mh.com. It lists every game and links to each one.

## Adding a game

Open `games.js` and copy one of the blocks. Set `url` to the game's address, or to `null` to show it as "Coming soon". To use a thumbnail, put an image in `images/` and set `image: "images/yourfile.png"`.

## Publishing (GitHub Pages)

1. Push this repo to GitHub.
2. Go to Settings → Pages and choose to deploy from the `main` branch, root folder.
3. The `CNAME` file points the site at `james-mh.com`. In your DNS, add GitHub Pages' A records (185.199.108.153, .109.153, .110.153, .111.153) for the root domain.
