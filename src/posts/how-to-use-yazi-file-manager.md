---
title: "How To Use The Awesome Yazi Terminal File Manager"
imgUrl: "/post-images/how-to-use-yazi-file-manager/thumbnail.jpg"
youtubeId: "iKb3cHDD9hw"
publishedAt: "2024-12-20"
summary: "Use this guide along with my youtube video to learn how to setup & use the yazi terminal file manager for an awesome boost to your workflow."
---

_When writing this blog post, I was using Yazi v0.4.1_

## Installation

I'm on macOS so I use homebrew to install yazi and all of the optional dependencies.

For the command you need for your system take a look at the [installation instructions](https://yazi-rs.github.io/docs/installation)

```bash
brew install yazi ffmpegthumbnailer ffmpeg sevenzip jq poppler fd ripgrep fzf zoxide imagemagick font-symbols-only-nerd-font
```

## Move to CWD When Exiting Yazi

This shell wrapper comes in handy so that you automatically move into the directory you're in when exiting yazi.

If you are using zsh like me open the `~/.zshrc` file with the editor of your choosing and add this to the bottom:

```bash
function y() {
	local tmp="$(mktemp -t "yazi-cwd.XXXXXX")" cwd
	yazi "$@" --cwd-file="$tmp"
	if cwd="$(command cat -- "$tmp")" && [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
		builtin cd -- "$cwd"
	fi
	rm -f -- "$tmp"
}
```

Then source the zshrc file by running:

```bash
source ~/.zshrc
```

Now you can use `y` to open yazi instead!

The code above works for bash or zsh, but you can set this up with other shells. Take a look at the documentation [here](https://yazi-rs.github.io/docs/quick-start#shell-wrapper)

## Setup Default Configuration

There are three configuration files for Yazi:

- [yazi.toml](https://yazi-rs.github.io/docs/configuration/yazi) - General configuration.
- [keymap.toml](https://yazi-rs.github.io/docs/configuration/keymap) - Keybindings configuration.
- [theme.toml](https://yazi-rs.github.io/docs/configuration/theme) - Color scheme configuration.

These will all go in `~/.config/yazi`

Let's create them.

First create the yazi config directory:

```bash
mkdir -p ~/.config/yazi
```

_On windows the config would go here instead: `C:\Users\USERNAME\AppData\Roaming\yazi\config\`_

Now you can move into it:

```bash
cd ~/.config/yazi
```

Then finally create the three configuration files:

```bash
touch yazi.toml keymap.toml theme.toml
```

Then you can copy the default yazi configuration files for [yazi.toml](https://github.com/sxyazi/yazi/blob/shipped/yazi-config/preset/yazi-default.toml) & [keymap.toml](https://github.com/sxyazi/yazi/blob/shipped/yazi-config/preset/keymap-default.toml)
& paste them into the `yazi.toml` & `keymap.toml` files we just created.

Now you can modify these defaults however you like. You can read more about the
configuration options [here](https://yazi-rs.github.io/docs/configuration/yazi) & setting up
keymaps [here](https://yazi-rs.github.io/docs/configuration/keymap)

## Modifying Default Editor

To modify the default editor that is used when opening a code/text file or a directory you can modify the `EDITOR` environment variable.

For example, in zsh open the zshrc file with your editor of choice and add this to the bottom:

```bash
export EDITOR=nvim
```

_Replace **nvim** with the editor's command you would like to use_

## Installing A Flavor (For The Theme)

Make sure you are in the yazi config directory:

```bash
cd ~/.config/yazi
```

Now create a flavors directory

```bash
mkdir flavors
```

Then you can navigate [here](https://github.com/yazi-rs/flavors) to find a flavor you like.

After finding one, run the command in the README.md to install it with the `ya pack` yazi package manager for plugins and flavors.

For example, you can install the [catppuccin-mocha](https://github.com/yazi-rs/flavors/tree/main/catppuccin-mocha.yazi) flavor like so:

```bash
ya pack -a yazi-rs/flavors:catppuccin-mocha
```

Once installed you can open the `theme.toml` file we created earlier with your editor of choice.

I'm using Neovim so:

```bash
nvim ~/.config/yazi/theme.toml
```

And then you can add the following to this file to use the flavor:

```bash
[flavor]
dark = "catppuccin-mocha"
light = "catppuccin-mocha"
```

_Replace catppuccin-mocha with the name of the flavor you chose_

## Keymaps

One of the best ways to explore all of the keymaps available to you is to go through the default
keymap.toml file [here](https://github.com/sxyazi/yazi/blob/shipped/yazi-config/preset/keymap-default.toml).

You can also see the available keymaps by pressing `~` or `F1`.

Alongside this take a look at the youtube video to see visual explanations of how the different keymaps work!

If you want to modify any of these you can just make changes to the default we copied into the `keymap.toml` file we created earlier.

## That's It! 🚀
