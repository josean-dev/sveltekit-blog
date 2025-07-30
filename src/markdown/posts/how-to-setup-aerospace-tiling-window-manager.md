---
title: "How To Setup And Use The Aerospace Tiling Window Manager On macOS"
imgUrl: "/post-images/how-to-setup-aerospace-tiling-window-manager/thumbnail.jpg"
youtubeId: "-FoWClVHG5g"
publishedAt: "2024-08-10"
summary: "Use this guide along with my youtube video to setup and use the aerospace tiling window manager on your Mac. Aerospace has been the best tiling window manager I've tried on macOS after struggling with Yabai & Amethyst."
---

You can find my current aerospace config and the rest of my dotfiles here: [dotfiles](https://github.com/josean-dev/dev-environment-files)

## Open a terminal window

Open a terminal window on your mac. Could be the default terminal or something else like Wezterm which is what I'm currently using.

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

## Install Aerospace

Run the following command to install Aerospace:

```bash
brew install --cask nikitabobko/tap/aerospace
```

## Create & Open Aerospace Config File

The aerospace config can be located in `~/.aerospace.toml` or `${XDG_CONFIG_HOME}/aerospace/aerospace.toml` (The default value for XDG_CONFIG_HOME is `~/.config`).

I put my config in `~/.config/aerospace/aerospace.toml`.

Create this directory:

```bash
mkdir -p ~/.config/aerospace
```

Create the config file:

```bash
touch aerospace.toml
```

Then open it with your editor of choice. I use Neovim, but you can use whatever you prefer.

To open with Neovim do:

```bash
nvim aerospace.toml
```

You can also open with Vim:

```bash
vim aerospace.toml
```

Or TextEdit:

```bash
open -a TextEdit aerospace.toml
```

Or VSCode:

```bash
code aerospace.toml
```

## Add default configuration

As a great starting point, copy the default configuration below and paste it into the file:

You can also find this configuration and an i3 like config [here](https://nikitabobko.github.io/AeroSpace/config-examples).

```toml
# Place a copy of this config to ~/.aerospace.toml
# After that, you can edit ~/.aerospace.toml to your liking

# It's not necessary to copy all keys to your config.
# If the key is missing in your config, "default-config.toml" will serve as a fallback

# You can use it to add commands that run after login to macOS user session.
# 'start-at-login' needs to be 'true' for 'after-login-command' to work
# Available commands: https://nikitabobko.github.io/AeroSpace/commands
after-login-command = []

# You can use it to add commands that run after AeroSpace startup.
# 'after-startup-command' is run after 'after-login-command'
# Available commands : https://nikitabobko.github.io/AeroSpace/commands
after-startup-command = []

# Start AeroSpace at login
start-at-login = false

# Normalizations. See: https://nikitabobko.github.io/AeroSpace/guide#normalization
enable-normalization-flatten-containers = true
enable-normalization-opposite-orientation-for-nested-containers = true

# See: https://nikitabobko.github.io/AeroSpace/guide#layouts
# The 'accordion-padding' specifies the size of accordion padding
# You can set 0 to disable the padding feature
accordion-padding = 30

# Possible values: tiles|accordion
default-root-container-layout = 'tiles'

# Possible values: horizontal|vertical|auto
# 'auto' means: wide monitor (anything wider than high) gets horizontal orientation,
#               tall monitor (anything higher than wide) gets vertical orientation
default-root-container-orientation = 'auto'

# Possible values: (qwerty|dvorak)
# See https://nikitabobko.github.io/AeroSpace/guide#key-mapping
key-mapping.preset = 'qwerty'

# Mouse follows focus when focused monitor changes
# Drop it from your config, if you don't like this behavior
# See https://nikitabobko.github.io/AeroSpace/guide#on-focus-changed-callbacks
# See https://nikitabobko.github.io/AeroSpace/commands#move-mouse
on-focused-monitor-changed = ['move-mouse monitor-lazy-center']

# Gaps between windows (inner-*) and between monitor edges (outer-*).
# Possible values:
# - Constant:     gaps.outer.top = 8
# - Per monitor:  gaps.outer.top = [{ monitor.main = 16 }, { monitor."some-pattern" = 32 }, 24]
#                 In this example, 24 is a default value when there is no match.
#                 Monitor pattern is the same as for 'workspace-to-monitor-force-assignment'.
#                 See: https://nikitabobko.github.io/AeroSpace/guide#assign-workspaces-to-monitors
[gaps]
inner.horizontal = 0
inner.vertical =   0
outer.left =       0
outer.bottom =     0
outer.top =        0
outer.right =      0

# 'main' binding mode declaration
# See: https://nikitabobko.github.io/AeroSpace/guide#binding-modes
# 'main' binding mode must be always presented
[mode.main.binding]

# All possible keys:
# - Letters.        a, b, c, ..., z
# - Numbers.        0, 1, 2, ..., 9
# - Keypad numbers. keypad0, keypad1, keypad2, ..., keypad9
# - F-keys.         f1, f2, ..., f20
# - Special keys.   minus, equal, period, comma, slash, backslash, quote, semicolon, backtick,
#                   leftSquareBracket, rightSquareBracket, space, enter, esc, backspace, tab
# - Keypad special. keypadClear, keypadDecimalMark, keypadDivide, keypadEnter, keypadEqual,
#                   keypadMinus, keypadMultiply, keypadPlus
# - Arrows.         left, down, up, right

# All possible modifiers: cmd, alt, ctrl, shift

# All possible commands: https://nikitabobko.github.io/AeroSpace/commands

# You can uncomment this line to open up terminal with alt + enter shortcut
# See: https://nikitabobko.github.io/AeroSpace/commands#exec-and-forget
# alt-enter = 'exec-and-forget open -n /System/Applications/Utilities/Terminal.app'

# See: https://nikitabobko.github.io/AeroSpace/commands#layout
alt-slash = 'layout tiles horizontal vertical'
alt-comma = 'layout accordion horizontal vertical'

# See: https://nikitabobko.github.io/AeroSpace/commands#focus
alt-h = 'focus left'
alt-j = 'focus down'
alt-k = 'focus up'
alt-l = 'focus right'

# See: https://nikitabobko.github.io/AeroSpace/commands#move
alt-shift-h = 'move left'
alt-shift-j = 'move down'
alt-shift-k = 'move up'
alt-shift-l = 'move right'

# See: https://nikitabobko.github.io/AeroSpace/commands#resize
alt-shift-minus = 'resize smart -50'
alt-shift-equal = 'resize smart +50'

# See: https://nikitabobko.github.io/AeroSpace/commands#workspace
alt-1 = 'workspace 1'
alt-2 = 'workspace 2'
alt-3 = 'workspace 3'
alt-4 = 'workspace 4'
alt-5 = 'workspace 5'
alt-6 = 'workspace 6'
alt-7 = 'workspace 7'
alt-8 = 'workspace 8'
alt-9 = 'workspace 9'
alt-a = 'workspace A' # In your config, you can drop workspace bindings that you don't need
alt-b = 'workspace B'
alt-c = 'workspace C'
alt-d = 'workspace D'
alt-e = 'workspace E'
alt-f = 'workspace F'
alt-g = 'workspace G'
alt-i = 'workspace I'
alt-m = 'workspace M'
alt-n = 'workspace N'
alt-o = 'workspace O'
alt-p = 'workspace P'
alt-q = 'workspace Q'
alt-r = 'workspace R'
alt-s = 'workspace S'
alt-t = 'workspace T'
alt-u = 'workspace U'
alt-v = 'workspace V'
alt-w = 'workspace W'
alt-x = 'workspace X'
alt-y = 'workspace Y'
alt-z = 'workspace Z'

# See: https://nikitabobko.github.io/AeroSpace/commands#move-node-to-workspace
alt-shift-1 = 'move-node-to-workspace 1'
alt-shift-2 = 'move-node-to-workspace 2'
alt-shift-3 = 'move-node-to-workspace 3'
alt-shift-4 = 'move-node-to-workspace 4'
alt-shift-5 = 'move-node-to-workspace 5'
alt-shift-6 = 'move-node-to-workspace 6'
alt-shift-7 = 'move-node-to-workspace 7'
alt-shift-8 = 'move-node-to-workspace 8'
alt-shift-9 = 'move-node-to-workspace 9'
alt-shift-a = 'move-node-to-workspace A'
alt-shift-b = 'move-node-to-workspace B'
alt-shift-c = 'move-node-to-workspace C'
alt-shift-d = 'move-node-to-workspace D'
alt-shift-e = 'move-node-to-workspace E'
alt-shift-f = 'move-node-to-workspace F'
alt-shift-g = 'move-node-to-workspace G'
alt-shift-i = 'move-node-to-workspace I'
alt-shift-m = 'move-node-to-workspace M'
alt-shift-n = 'move-node-to-workspace N'
alt-shift-o = 'move-node-to-workspace O'
alt-shift-p = 'move-node-to-workspace P'
alt-shift-q = 'move-node-to-workspace Q'
alt-shift-r = 'move-node-to-workspace R'
alt-shift-s = 'move-node-to-workspace S'
alt-shift-t = 'move-node-to-workspace T'
alt-shift-u = 'move-node-to-workspace U'
alt-shift-v = 'move-node-to-workspace V'
alt-shift-w = 'move-node-to-workspace W'
alt-shift-x = 'move-node-to-workspace X'
alt-shift-y = 'move-node-to-workspace Y'
alt-shift-z = 'move-node-to-workspace Z'

# See: https://nikitabobko.github.io/AeroSpace/commands#workspace-back-and-forth
alt-tab = 'workspace-back-and-forth'
# See: https://nikitabobko.github.io/AeroSpace/commands#move-workspace-to-monitor
alt-shift-tab = 'move-workspace-to-monitor --wrap-around next'

# See: https://nikitabobko.github.io/AeroSpace/commands#mode
alt-shift-semicolon = 'mode service'

# 'service' binding mode declaration.
# See: https://nikitabobko.github.io/AeroSpace/guide#binding-modes
[mode.service.binding]
esc = ['reload-config', 'mode main']
r = ['flatten-workspace-tree', 'mode main'] # reset layout
#s = ['layout sticky tiling', 'mode main'] # sticky is not yet supported https://github.com/nikitabobko/AeroSpace/issues/2
f = ['layout floating tiling', 'mode main'] # Toggle between floating and tiling layout
backspace = ['close-all-windows-but-current', 'mode main']

alt-shift-h = ['join-with left', 'mode main']
alt-shift-j = ['join-with down', 'mode main']
alt-shift-k = ['join-with up', 'mode main']
alt-shift-l = ['join-with right', 'mode main']
```

## Enable start at login

Change start-at-login to true:

```toml
start-at-login = true
```

## Setup gaps

I also like to setup some gaps between windows and the monitor edges

Change the gaps like so (use whatever value you prefer):

```toml
[gaps]
inner.horizontal = 10
inner.vertical =   10
outer.left =       10
outer.bottom =     10
outer.top =        10
outer.right =      10
```

## Startup Aerospace

Now you can use CMD+Space to open up Spotlight or another similar application like Raycast and look for Aerospace.
Press enter to start it up.

You should now see the number of the workspace you are in, in the menu bar.

## Use Only Workspaces You Need

I don't use all of the lettered workspaces, only the ones with mnemonics I find useful for the things I work on.

Changing workspaces:

```toml
alt-1 = 'workspace 1'
alt-2 = 'workspace 2'
alt-3 = 'workspace 3'
alt-4 = 'workspace 4'
alt-5 = 'workspace 5'
alt-6 = 'workspace 6'
alt-7 = 'workspace 7'
alt-8 = 'workspace 8'
alt-9 = 'workspace 9'
alt-b = 'workspace B'
alt-b = 'workspace B' # for Browser
alt-e = 'workspace E' # for File Explorer (Finder)
alt-m = 'workspace M' # for Music
alt-n = 'workspace N' # for Notes
alt-p = 'workspace P' # for Photo Editing
alt-t = 'workspace T' # for Terminal
alt-v = 'workspace V' # for Video Editing
```

Moving windows to workspaces:

```toml
cmd-ctrl-alt-shift-1 = 'move-node-to-workspace 1'
cmd-ctrl-alt-shift-2 = 'move-node-to-workspace 2'
cmd-ctrl-alt-shift-3 = 'move-node-to-workspace 3'
cmd-ctrl-alt-shift-4 = 'move-node-to-workspace 4'
cmd-ctrl-alt-shift-5 = 'move-node-to-workspace 5'
cmd-ctrl-alt-shift-6 = 'move-node-to-workspace 6'
cmd-ctrl-alt-shift-7 = 'move-node-to-workspace 7'
cmd-ctrl-alt-shift-8 = 'move-node-to-workspace 8'
cmd-ctrl-alt-shift-9 = 'move-node-to-workspace 9'
cmd-ctrl-alt-shift-b = 'move-node-to-workspace B' # for Browser
cmd-ctrl-alt-shift-e = 'move-node-to-workspace E' # for File Explorer (Finder)
cmd-ctrl-alt-shift-m = 'move-node-to-workspace M' # for Music
cmd-ctrl-alt-shift-n = 'move-node-to-workspace N' # for Notes
cmd-ctrl-alt-shift-p = 'move-node-to-workspace P' # for Photo Editing
cmd-ctrl-alt-shift-t = 'move-node-to-workspace T' # for Terminal
cmd-ctrl-alt-shift-v = 'move-node-to-workspace V' # for Video Editing
```

Set this up however you like.

## Setup Window Detected Callbacks

You can automatically move windows to a specific workspace when a new window is detected.

For example with Wezterm you can do:

```toml
[[on-window-detected]]
if.app-id = 'com.github.wez.wezterm'
run = "move-node-to-workspace T"
```

This will automatically move new wezterm windows to workspace T.

To find an app's id, make sure its running and on a terminal window run:

```bash
aerospace list-apps
```

Then copy the app id of the application you want to configure.

## Setup Mouse Callbacks

I like moving the mouse to the center of the window when focus changes to it.

Look for where you have this line in the config:

```toml
on-focused-monitor-changed = ['move-mouse monitor-lazy-center']
```

Then add the following to move the mouse on window focus change:

```toml{2}
on-focus-changed = "move-mouse window-lazy-center"
```

## Add keybind to fullscreen a window

Under the main binding mode I like to add this keybind to fullscreen a window:

```toml
alt-shift-f = 'fullscreen'
```

If you're using the F workspace, this keybind will probably be a conflict so you can use something else.

## Fix Mission Control Window Sizes

Windows show up really small in Mission Control because of how Aerospace hides windows of non active workspaces.

A workaround for this is to go to System Settings -> Desktop & Dock -> Mission Control and then turn on "Group Windows By Application".

## That's It!! 🚀
