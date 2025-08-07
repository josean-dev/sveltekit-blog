---
title: "How To EASILY Manage Your Dotfiles With GNU Stow"
imgUrl: "/post-images/how-to-manage-dotfiles-with-gnu-stow/thumbnail.jpg"
youtubeId: "06x3ZhwrrwA"
publishedAt: "2025-08-07"
summary: "GNU Stow is a great way to manage your dotfiles with git & keep them organized. Learn how to get started with it quickly & easily."
---

_This post is from the perspective of a macOS user, but it will also work on Linux (though installing stow will be a bit different)._

## Installation

I'm on macOS so I use homebrew to install `stow` to my system.

```lua
brew install stow
```

## Dotfiles Directory

After you've installed it, navigate to your home (`~`) directory:

```bash
cd ~
```

Once in your home directory, create a new directory called `dotfiles` (call it whatever you like).

```bash
mkdir dotfiles
```

Move into this directory.

```bash
cd dotfiles
```

## Move your dotfiles

Now you need to move any dotfiles you have in your home (`~`) directory to the `~/dotfiles` directory.

The files in the `~/dotfiles` directory must be structured in the same way you would structure them in your home directory.

Make sure you're in the new dotfiles directory:

```bash
cd ~/dotfiles
```

For example, for my Neovim config I would do the following:

```bash
mkdir .config
mv ~/.config/nvim ./.config/
```

Or for my shell config (`.zshrc`):

```bash
mv ~/.zshrc ./.zshrc
```

## Stow Your Dotfiles

Now you can stow your dotfiles. What stow will do is take a **package** you specify & mirror its contents
onto the target directory (the parent as a default) through the use of symlinks. Symlinks are a
special type of file that points to another file.

After making sure you're in your `dotfiles` directory. Stow your dotfiles by running:

```bash
stow .
```

In this case, the package to mirror is the current directory (`.`) and the target directory is the parent (`~`).
Therefore, stow will add symlinks to our home directory for all of our dotfiles, structuring them in the same way they
are structured in the `dotfiles` directory.

If your `dotfiles` directory isn't located in your home (`~`) directory, you'll need to specify it as a target:

```bash
stow -t ~ .
```

If you want to unstow your dotfiles you can do:

```bash
stow -D .
```

## Initialize Git Repository

You can initialize the `dotfiles` directory as a git repository by running:

```bash
git init
```

## Ignoring Files

Stow has a built in ignore list of files it'll ignore. This includes the `.git` directory that
was just added when setting up the git repository:

```bash{14}
# Comments and blank lines are allowed.

RCS
.+,v

CVS
\.\#.+       # CVS conflict files / emacs lock files
\.cvsignore

\.svn
_darcs
\.hg

\.git
\.gitignore
\.gitmodules

.+~          # emacs backup files
\#.*\#       # emacs autosave files

^/README.*
^/LICENSE.*
^/COPYING
```

If you want to modify the default ignore list add a `.stow-local-ignore` file to `dotfiles`:

```bash
cd ~/dotfiles
touch .stow-local-ignore
```

And then optionally paste the default list onto this file:

```bash
# Comments and blank lines are allowed.

RCS
.+,v

CVS
\.\#.+       # CVS conflict files / emacs lock files
\.cvsignore

\.svn
_darcs
\.hg

\.git
\.gitignore
\.gitmodules

.+~          # emacs backup files
\#.*\#       # emacs autosave files

^/README.*
^/LICENSE.*
^/COPYING
```

You can modify this list to your liking.

## Stowing A Specific Config (Optional)

If instead of stowing everything under dotfiles you want to separate every config to be able to
stow them individually, you'll need to structure them differently.

For example, for Neovim, you can create a directory called `nvim` under `dotfiles`.

```bash
cd ~/dotfiles
mkdir nvim
```

Then, assuming you have your config under `dotfiles`, move it to this new directory.

```bash
mkdir .config
mv ./.config/nvim ./nvim/.config/
```

Now you can stow the neovim config by specifying the `nvim` directory as the package to mirror:

```bash
stow nvim
```

To unstow:

```bash
stow -D nvim
```

You would do this for everything else. With `.zshrc` as another example:

```bash
mkdir zshrc
mv .zshrc zshrc/
```

Then you can run:

```bash
stow zshrc
```

To unstow:

```bash
stow -D zshrc
```

## Adding A Remote Repo

You can go to [github.com](https://github.com) and create new repository to add it as a remote. Assuming
the remote repo is called `dotfiles`:

```bash
git remote add origin git@github.com:josean-dev/dotfiles.git
```

You can then add all of your changes, commit them & push them to the remote:

```bash
git add .
git commit -m 'Initial commit'
git push -u origin main
```

Then you can easily clone this repo to another computer & stow your dotfiles to your home directory with GNU Stow 🎉
