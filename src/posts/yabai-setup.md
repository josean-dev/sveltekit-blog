---
title: "How To Setup And Use The Yabai Tiling Window Manager On Mac"
imgUrl: "/post-images/yabai-setup.jpg"
youtubeId: "k94qImbFKWE"
publishedAt: "2023-02-11"
summary: "Use this guide along with my youtube video to setup and use the yabai tiling window manager on your Mac. Yabai has been great for leveling up my window management workflow."
---

## Configure MacOs Specific Settings

1. Open Several Desktops (~7) on Your Machine
2. Go To Keyboard Settings > Shortcuts > Mission Control
3. Expand Mission Control and Turn On Shortcuts for Switching Spaces 1-7 with "Ctrl + # Of Space"
4. Go to System Settings > Accessibility > Display
5. Turn On Reduce Motion
6. Go To System Settings > Desktop & Dock > Mission Control
7. Turn off "Automatically Rearrange Spaces Based On Most Recent Use"
8. Personally, I only keep "Displays Have Separate Spaces" turned on here, and that's what I'd recommend

## Open a terminal window

Open a terminal window on your mac. Could be the default terminal or something else like iTerm2 which is what I'm currently using.

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

## Install Yabai

Run the following command:

```bash
brew install koekeishiya/formulae/yabai
```

## Install Skhd

Run the following command:

```bash
brew install koekeishiya/formulae/skhd
```

## Create Yabai Config File in Home Directory

Move to home folder:

```bash
cd ~
```

Create directory for yabai config file and move into it (config will live in ".config/yabai/yabairc"):

```bash
mkdir .config/yabai
cd .config/yabai
```

Create yabai config file:

```bash
touch yabairc
```

## Add Configuration Options to File

Open with preferred editor and add the following ("open -t yabairc", "code yabairc" (visual studio code), "vim yabairc", etc...).
There are some configuration options that will be available only
if you partially disable SIP (Sytem Integrity Protection).
All of the options I've configured below will work without disabling
SIP.

Configure default layout to use: Binary Space Partitioning.

```bash
# default layout (can be bsp, stack or float)
yabai -m config layout bsp
```

Configure how window splits should be made:

```bash
# New window spawns to the right if vertical split, or bottom if horizontal split
yabai -m config window_placement second_child
```

Configure window padding:

```bash
# padding set to 12px
yabai -m config top_padding 12
yabai -m config bottom_padding 12
yabai -m config left_padding 12
yabai -m config right_padding 12
yabai -m config window_gap 12
```

Configure mouse settings:

```bash
# center mouse on window with focus
yabai -m config mouse_follows_focus on

# modifier for clicking and dragging with mouse
yabai -m config mouse_modifier alt
# set modifier + left-click drag to move window
yabai -m config mouse_action1 move
# set modifier + right-click drag to resize window
yabai -m config mouse_action2 resize


# when window is dropped in center of another window, swap them (on edges it will split it)
yabai -m mouse_drop_action swap
```

Disable specific apps from being managed with yabai. Use this format for the apps you'd like to disable.

```bash
yabai -m rule --add app="^System Settings$" manage=off
yabai -m rule --add app="^Calculator$" manage=off
yabai -m rule --add app="^Karabiner-Elements$" manage=off
```

### Start Yabai

Start it like so:

```bash
brew services start yabai
```

Allow any prompts for accessibility permissions.

Restart yabai:

```bash
brew services restart yabai
```

### Start Skhd

Start it like so:

```bash
brew services start skhd
```

Allow any prompts for accessibility permissions.

Restart skhd:

```bash
brew services restart skhd
```

## Create Skhd Config File in Home Directory

Move to home folder:

```bash
cd ~
```

Create directory for skhd config file and move into it (config will live in ".config/skhd/skhdrc"):

```bash
mkdir .config/skhd
cd .config/skhd
```

Create skhd config file:

```bash
touch skhdrc
```

## Add Keyboard Shortcuts To Config File

These shortcuts are completely up to you, but you can use mine as reference.
The way I like to do it is to choose two primary modifiers and a third if necessary.
These could be something like "alt", "shift + alt", and "ctrl + alt".

One recommendation is to change "shift + alt" to "hyper" if you have a "hyper" key on your keyboard ("command" + "control" + "shift" + "alt").
You could configure a "hyper" key (replacing "Caps Lock" for example) with something like "Karabiner-Elements".

### Changing Focus Shortcuts

#### Change Focus Within Space

```bash
# change window focus within space
alt - j : yabai -m window --focus south
alt - k : yabai -m window --focus north
alt - h : yabai -m window --focus west
alt - l : yabai -m window --focus east
```

#### Change Focus Between Displays

```bash
#change focus between external displays (left and right)
alt - s: yabai -m display --focus west
alt - g: yabai -m display --focus east
```

### Shortcuts For Modifying The Layout

```bash
# rotate layout clockwise
shift + alt - r : yabai -m space --rotate 270

# flip along y-axis
shift + alt - y : yabai -m space --mirror y-axis

# flip along x-axis
shift + alt - x : yabai -m space --mirror x-axis

# toggle window float
shift + alt - t : yabai -m window --toggle float --grid 4:4:1:1:2:2
```

### Modifying Window Size Shortcuts

```bash
# maximize a window
shift + alt - m : yabai -m window --toggle zoom-fullscreen

# balance out tree of windows (resize to occupy same area)
shift + alt - e : yabai -m space --balance
```

### Shortcuts For Moving Windows Around

#### Swap Windows Within Space

```bash
# swap windows
shift + alt - j : yabai -m window --swap south
shift + alt - k : yabai -m window --swap north
shift + alt - h : yabai -m window --swap west
shift + alt - l : yabai -m window --swap east
```

#### Move Window Within Space And Split

```bash
# move window and split
ctrl + alt - j : yabai -m window --warp south
ctrl + alt - k : yabai -m window --warp north
ctrl + alt - h : yabai -m window --warp west
ctrl + alt - l : yabai -m window --warp east
```

#### Move Window Across Displays

```bash
# move window to display left and right
shift + alt - s : yabai -m window --display west; yabai -m display --focus west;
shift + alt - g : yabai -m window --display east; yabai -m display --focus east;
```

#### Move Window To A Space (Desktop/Workspace)

```bash
#move window to prev and next space
shift + alt - p : yabai -m window --space prev;
shift + alt - n : yabai -m window --space next;

# move window to space #
shift + alt - 1 : yabai -m window --space 1;
shift + alt - 2 : yabai -m window --space 2;
shift + alt - 3 : yabai -m window --space 3;
shift + alt - 4 : yabai -m window --space 4;
shift + alt - 5 : yabai -m window --space 5;
shift + alt - 6 : yabai -m window --space 6;
shift + alt - 7 : yabai -m window --space 7;
```

### Stop/Start/Restart Yabai

```bash
# stop/start/restart yabai
ctrl + alt - q : brew services stop yabai
ctrl + alt - s : brew services start yabai
ctrl + alt - r : brew services restart yabai
```

## That's It, You're Done!

## Learning More

If you'd like to explore everything you can do with yabai open the man page:

```bash
man yabai
```

--- or ---

[Yabai Github Repo](https://github.com/koekeishiya/yabai)

[Yabai Wiki](https://github.com/koekeishiya/yabai/wiki)

[Yabai Documentation](https://github.com/koekeishiya/yabai/blob/master/doc/yabai.asciidoc)

[Skhd Github Repo](https://github.com/koekeishiya/skhd)
