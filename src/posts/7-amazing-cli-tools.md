---
title: "7 Amazing CLI Tools You Won't Be Able To Live Without"
imgUrl: "/post-images/7-amazing-cli-tools/thumbnail.jpg"
youtubeId: "mmqDYw9C30I"
publishedAt: "2024-04-17"
summary: "These are 7 amazing cli tools that are incredibly helpful when working on the terminal. There's no going back once you try them!"
---

You can find my dotfiles [here](https://github.com/josean-dev/dev-environment-files).

## Open a terminal window

Open a terminal window on your macOs or linux machine.

I'm using **Alacritty** on **macOs** and I'm using the **zsh** shell.

## Install Homebrew

Run the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If necessary, when prompted, enter your password here and press enter.
If you haven't installed the XCode Command Line Tools, when prompted, press enter and homebrew will install this as well.

## Add To Path (Only Apple Silicon Macbooks)

After installing, add it to the path. This step shouldn't be necessary on Intel macs.

Run the following two commands to do so:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

## #1: fzf (command line fuzzy finder)

[fzf](https://github.com/junegunn/fzf.git) is an amazing fuzzy finder for the command line.

Install fzf with homebrew:

```bash
brew install fzf
```

_This will vary slightly depending on the shell that you're using, I'm using **zsh**_.

Open `~/.zshrc` file with your favorite editor. I personally use Neovim.

With TextEdit:

```bash
open ~/.zshrc
```

With VSCode (you have to have it installed):

```bash
code ~/.zshrc
```

With Neovim (what I use):

```bash
nvim ~/.zshrc
```

To the bottom of the file add:

```bash
# ---- FZF -----

# Set up fzf key bindings and fuzzy completion
eval "$(fzf --zsh)"
```

After saving, in your terminal reload the zsh configuration:

```bash
source ~/.zshrc
```

Now you can use fzf!

Examples of what you can do with it:

| Example                                       | Description                                      |
| --------------------------------------------- | ------------------------------------------------ |
| `CTRL-t`                                      | Look for files and directories                   |
| `CTRL-r`                                      | Look through command history                     |
| `Enter`                                       | Select the item                                  |
| `Ctrl-j` or `Ctrl-n` or `Down arrow`          | Go down one result                               |
| `Ctrl-k` or `Ctrl-p` or `Up arrow`            | Go up one result                                 |
| `Tab`                                         | Mark a result                                    |
| `Shift-Tab`                                   | Unmark a result                                  |
| `cd **Tab`                                    | Open up fzf to find directory                    |
| `export **Tab`                                | Look for env variable to export                  |
| `unset **Tab`                                 | Look for env variable to unset                   |
| `unalias **Tab`                               | Look for alias to unalias                        |
| `ssh **Tab`                                   | Look for recently visited host names             |
| `kill -9 **Tab`                               | Look for process name to kill to get pid         |
| any command (like `nvim` or `code`) + `**Tab` | Look for files & directories to complete command |

### Use fd with fzf

**fzf** by default uses the find command to look for files and directories.

Let's replace that with [fd](https://github.com/sharkdp/fd) for better functionality, like ignoring files ignored by git (with .gitignore).

Install fd:

```bash
brew install fd
```

Open `~/.zshrc` with preferred text editor.

Add to the bottom of this file:

```bash
# -- Use fd instead of fzf --

export FZF_DEFAULT_COMMAND="fd --hidden --strip-cwd-prefix --exclude .git"
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
export FZF_ALT_C_COMMAND="fd --type=d --hidden --strip-cwd-prefix --exclude .git"

# Use fd (https://github.com/sharkdp/fd) for listing path candidates.
# - The first argument to the function ($1) is the base path to start traversal
# - See the source code (completion.{bash,zsh}) for the details.
_fzf_compgen_path() {
  fd --hidden --exclude .git . "$1"
}

# Use fd to generate the list for directory completion
_fzf_compgen_dir() {
  fd --type=d --hidden --exclude .git . "$1"
}
```

After saving, in your terminal do:

```bash
source ~/.zshrc
```

### Setup fzf-git

[fzf-git](https://github.com/junegunn/fzf-git.sh) is a really nice script to look for git related things (commits, hashes, files and more) with fzf.

Navigate to your home directory:

```bash
cd
```

Clone the repository:

```bash
git clone https://github.com/junegunn/fzf-git.sh.git
```

Open `~/.zshrc` with preferred text editor and add to the bottom:

```bash
source ~/fzf-git.sh/fzf-git.sh
```

Save and in terminal run:

```bash
source ~/.zshrc
```

Now you can use the following:

| Keybind   | Description                         |
| --------- | ----------------------------------- |
| `CTRL-GF` | Look for git files with fzf         |
| `CTRL-GB` | Look for git branches with fzf      |
| `CTRL-GT` | Look for git tags with fzf          |
| `CTRL-GR` | Look for git remotes with fzf       |
| `CTRL-GH` | Look for git commit hashes with fzf |
| `CTRL-GS` | Look for git stashes with fzf       |
| `CTRL-GL` | Look for git reflogs with fzf       |
| `CTRL-GW` | Look for git worktrees with fzf     |
| `CTRL-GE` | Look for git for-each-ref with fzf  |

_Hold down `CTRL` and then press `GF` or one of the others consecutively and quickly._

### Setup a custom theme for fzf

You can also setup a custom theme for fzf.

To use mine you can add this to `~/.zshrc`:

```bash
# --- setup fzf theme ---
fg="#CBE0F0"
bg="#011628"
bg_highlight="#143652"
purple="#B388FF"
blue="#06BCE4"
cyan="#2CF9ED"

export FZF_DEFAULT_OPTS="--color=fg:${fg},bg:${bg},hl:${purple},fg+:${fg},bg+:${bg_highlight},hl+:${purple},info:${blue},prompt:${cyan},pointer:${cyan},marker:${cyan},spinner:${cyan},header:${cyan}"
```

If you want to make your own check out the [theme generator](https://vitormv.github.io/fzf-themes/)

## #2: bat (better cat)

[bat](https://github.com/sharkdp/bat) is a really nice alternative to cat to display file contents in the terminal with syntax highlighting.

Install with homebrew:

```bash
brew install bat
```

Now you can start using it!

Example:

```bash
bat filename.txt
```

The example above would print out the contents of a file called `filename.txt`.

To see examples of all of the themes you can use:

```bash
bat --list-themes | fzf --preview="bat --theme={} --color=always /path/to/file"
```

Make sure to replace `/path/to/file` with the path to an actual file.

### Install a custom theme

If you find a theme on github for example, you can follow these steps.

The first time you do this create the following directory:

```bash
mkdir -p "$(bat --config-dir)/themes"
```

Then move into it:

```bash
cd "$(bat --config-dir)/themes"
```

Then you can download the file for the theme you want to use into this directory.

The file should use the `.tmTheme` extension.

For example:

```bash
curl -O https://raw.githubusercontent.com/folke/tokyonight.nvim/main/extras/sublime/tokyonight_night.tmTheme
```

This will install the night version of the tokyonight theme.

Then to use it run:

```bash
bat cache --build
```

And then add the following to your `~/.zshrc`:

```bash
# ----- Bat (better cat) -----

export BAT_THEME=tokyonight_night
```

Replace `tokyonight_night` with the name of the theme you would like to use.

Then save this file and run:

```bash
source ~/.zshrc
```

## #3: delta (better git diff)

[delta](https://github.com/dandavison/delta) is a great way to produce better git diffs using the syntax highlighting functionality of bat.

Install it:

```bash
brew install git-delta
```

Then open your `~/.gitconfig` file.

With TextEdit:

```bash
open ~/.gitconfig
```

With VSCode (you have to have it installed):

```bash
code ~/.gitconfig
```

With Neovim (what I use):

```bash
nvim ~/.gitconfig
```

Add the following to it:

```bash
[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true    # use n and N to move between diff sections
    side-by-side = true


    # delta detects terminal colors automatically; set one of these to disable auto-detection
    # dark = true
    # light = true

[merge]
    conflictstyle = diff3

[diff]
    colorMoved = default
```

You can remove `side-by-side=true` if you don't want side by side diffs.

After saving this file your git diffs should look a lot nicer.

### Setup fzf previews

Now that you have `eza` and `bat` setup you can setup some really nice previews for fzf.

In your `~/.zshrc`, where you're configuring fzf, add the following:

```bash
export FZF_CTRL_T_OPTS="--preview 'bat -n --color=always --line-range :500 {}'"
export FZF_ALT_C_OPTS="--preview 'eza --tree --color=always {} | head -200'"

# Advanced customization of fzf options via _fzf_comprun function
# - The first argument to the function is the name of the command.
# - You should make sure to pass the rest of the arguments to fzf.
_fzf_comprun() {
  local command=$1
  shift

  case "$command" in
    cd)           fzf --preview 'eza --tree --color=always {} | head -200' "$@" ;;
    export|unset) fzf --preview "eval 'echo \$'{}"         "$@" ;;
    ssh)          fzf --preview 'dig {}'                   "$@" ;;
    *)            fzf --preview "bat -n --color=always --line-range :500 {}" "$@" ;;
  esac
}
```

This will setup file previews with bat as well as directory previews with eza and some other previews as well.

There is one slight issue with this code though. When we are looking for files and directories with `Ctrl-T`
or doing something like `nvim **Tab`, we are using `bat` to generate the preview but this won't work for directories
and we'll get an error.

We can fix this by using an **if statement** that checks whether the path to what we should preview is a directory or not and use `eza`
instead for the preview in this case.

To do this you can replace the previous code with something like the following:

```bash
show_file_or_dir_preview="if [ -d {} ]; then eza --tree --color=always {} | head -200; else bat -n --color=always --line-range :500 {}; fi"

export FZF_CTRL_T_OPTS="--preview '$show_file_or_dir_preview'"
export FZF_ALT_C_OPTS="--preview 'eza --tree --color=always {} | head -200'"

# Advanced customization of fzf options via _fzf_comprun function
# - The first argument to the function is the name of the command.
# - You should make sure to pass the rest of the arguments to fzf.
_fzf_comprun() {
  local command=$1
  shift

  case "$command" in
    cd)           fzf --preview 'eza --tree --color=always {} | head -200' "$@" ;;
    export|unset) fzf --preview "eval 'echo \${}'"         "$@" ;;
    ssh)          fzf --preview 'dig {}'                   "$@" ;;
    *)            fzf --preview "$show_file_or_dir_preview" "$@" ;;
  esac
}
```

## #4: eza (better ls)

[eza](https://github.com/eza-community/eza.git) is a better version of ls with lots of different options.

Install it:

```bash
brew install eza
```

Now you can start using it!

You can create an alias for it in `~/.zshrc` like so:

```bash
# ---- Eza (better ls) -----

alias ls="eza --color=always --long --git --no-filesize --icons=always --no-time --no-user --no-permissions"
```

## #5: tldr (user-friendly man pages)

[tldr](https://github.com/tldr-pages/tldr) is a huge collection of community maintained help pages with helpful summaries for cli tools. You can use this as an alternative to man pages.

Install the rust client with homebrew:

```bash
brew install tlrc
```

Now you can use it just like man to learn more about a tool.

For example to learn more about `eza`:

```bash
tldr eza
```

## #6: thefuck

[thefuck](https://github.com/nvbn/thefuck) is a really nice tool to auto correct mistyped commands.

Install it like so:

```bash
brew install thefuck
```

Then open your `~/.zshrc` file and add:

```bash
# thefuck alias
eval $(thefuck --alias)
```

This will setup the alias which is `fuck`.

You can also add your own custom alias:

```bash{3}
# thefuck alias
eval $(thefuck --alias)
eval $(thefuck --alias fk)
```

Save your zshrc file and run:

```bash
source ~/.zshrc
```

Now if mistype a command you can run `fuck` afterwards.

If there are is more than one result you can use your `up` and `down` arrow keys and then `enter` to select the one you want.

## #7: zoxide (better cd)

[zoxide](https://github.com/ajeetdsouza/zoxide.git) is an amazing alternative to cd.

It will remember the directories you've visited in the past and make it really easy to navigate back to them
by just typing out a portion of the name of the directory you want to visit.

Install it like so:

```bash
brew install zoxide
```

Then add the following to `~/.zshrc`:

```bash
# ---- Zoxide (better cd) ----
eval "$(zoxide init zsh)"
```

If you want to keep using `cd` then create an alias in `~/.zshrc`:

```bash{4}
# ---- Zoxide (better cd) ----
eval "$(zoxide init zsh)"

alias cd="z"
```

Save and then run:

```bash
source ~/.zshrc
```

Now you can use `z` as a much smarter replacement to `cd`.

If you want to trigger fzf when you're moving to a directory with `z` you can do `space` + `tab`.

## That's it! 🚀
