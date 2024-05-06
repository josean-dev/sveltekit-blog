---
title: "How To Use Code To Create Custom Keymaps With QMK"
imgUrl: "/post-images/how-to-use-code-with-qmk/thumbnail.jpg"
youtubeId: "AA8fw2MbpYg"
publishedAt: "2024-03-20"
summary: "Use this guide along with my youtube video to learn how to create and compile keymaps with QMK"
---

Take a look at my youtube video for in-depth explanations of all of the code in this blog post.

## Prepare your environment

### Windows

Install [QMK MSYS](https://msys.qmk.fm/)

### macOS

Open a terminal window and install homebrew with the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

If necessary, when prompted, enter your password here and press enter.
If you haven't installed the XCode Command Line Tools, when prompted, press enter and homebrew will install this as well.

### Add to path (only apple silicon macbooks)

After installing homebrew, add it to the path. This step shouldn't be necessary on Intel macs.

Run the following two commands to do so:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### Install the QMK CLI with Homebrew (macOS)

Run the following command to install the QMK CLI on your Mac:

```bash
brew install qmk/qmk/qmk
```

## Install QMK Toolbox

We will be using QMK Toolbox to flash our keyboard with firmware.

Navigate to the QMK Toolbox releases page [here](https://github.com/qmk/qmk_toolbox/releases) and look for the latest release.

For **macOS** use: `QMK.Toolbox.pkg`

For **Windows** use: `qmk_toolbox.exe`

Use the installer to install QMK Toolbox.

## Run QMK Setup

On **Windows** open **QMK MSYS**.

On **macOS** open a terminal window.

Then run the following command:

```bash
qmk setup
```

In most situations you will want to answer `y` to all of the prompts.

## Find your keyboard name

Run the following command to show a list of supported QMK keyboards:

```bash
qmk list-keyboards
```

Find your keyboard in this list.

If you have a general idea on what it's called you can try something like the following:

```bash
 qmk list-keyboards | grep "crkbd"
```

Replace "crkbd" with your keyboard name. Crkbd or Corne is how my keyboard is referred to so I try "crkbd" and "corne" here.

After running this I find that my keyboard is referred to as `crkbd/rev1` in QMK.

## Create a copy of the default keymap for your keyboard

After finding your keyboard name create a copy of its default keymap to modify
and make your own.

Run the following (replace `crkbd/rev1` with your keyboard name and `your-name` with your actual name):

```bash
qmk new-keymap -kb crkbd/rev1 -km your-name
```

Take a look at the output to know where your keymap was created.

On my Macbook it gets created here: `~/qmk_firmware/keyboards/crkbd/keymaps/your-name/`

## Open the new keymap in your favorite text editor

Now you can open this keymap folder (called `your-name`) that was created in your preferred
text editor.

If you're unsure, I would use [Visual Studio Code](https://code.visualstudio.com/).

I typically use Neovim for working with code.

## Open the keymap.c file

Once you've opened the folder in your editor of choice. Open the `keymap.c` file.

It'll look something like this:

```c
#include QMK_KEYBOARD_H

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    [0] = LAYOUT_split_3x6_3(
  //,-----------------------------------------------------.                    ,-----------------------------------------------------.
       KC_TAB,    KC_Q,    KC_W,    KC_E,    KC_R,    KC_T,                         KC_Y,    KC_U,    KC_I,    KC_O,   KC_P,  KC_BSPC,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LCTL,    KC_A,    KC_S,    KC_D,    KC_F,    KC_G,                         KC_H,    KC_J,    KC_K,    KC_L, KC_SCLN, KC_QUOT,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LSFT,    KC_Z,    KC_X,    KC_C,    KC_V,    KC_B,                         KC_N,    KC_M, KC_COMM,  KC_DOT, KC_SLSH,  KC_ESC,
  //|--------+--------+--------+--------+--------+--------+--------|  |--------+--------+--------+--------+--------+--------+--------|
                                          KC_LGUI,   MO(1),  KC_SPC,     KC_ENT,   MO(2), KC_RALT
                                      //`--------------------------'  `--------------------------'

  ),

    [1] = LAYOUT_split_3x6_3(
  //,-----------------------------------------------------.                    ,-----------------------------------------------------.
       KC_TAB,    KC_1,    KC_2,    KC_3,    KC_4,    KC_5,                         KC_6,    KC_7,    KC_8,    KC_9,    KC_0, KC_BSPC,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LCTL, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                      KC_LEFT, KC_DOWN,   KC_UP,KC_RIGHT, XXXXXXX, XXXXXXX,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LSFT, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                      XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,
  //|--------+--------+--------+--------+--------+--------+--------|  |--------+--------+--------+--------+--------+--------+--------|
                                          KC_LGUI, _______,  KC_SPC,     KC_ENT,   MO(3), KC_RALT
                                      //`--------------------------'  `--------------------------'
  ),

    [2] = LAYOUT_split_3x6_3(
  //,-----------------------------------------------------.                    ,-----------------------------------------------------.
       KC_TAB, KC_EXLM,   KC_AT, KC_HASH,  KC_DLR, KC_PERC,                      KC_CIRC, KC_AMPR, KC_ASTR, KC_LPRN, KC_RPRN, KC_BSPC,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LCTL, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                      KC_MINS,  KC_EQL, KC_LBRC, KC_RBRC, KC_BSLS,  KC_GRV,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LSFT, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                      KC_UNDS, KC_PLUS, KC_LCBR, KC_RCBR, KC_PIPE, KC_TILD,
  //|--------+--------+--------+--------+--------+--------+--------|  |--------+--------+--------+--------+--------+--------+--------|
                                          KC_LGUI,   MO(3),  KC_SPC,     KC_ENT, _______, KC_RALT
                                      //`--------------------------'  `--------------------------'
  ),

    [3] = LAYOUT_split_3x6_3(
  //,-----------------------------------------------------.                    ,-----------------------------------------------------.
        QK_BOOT, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                      XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      RGB_TOG, RGB_HUI, RGB_SAI, RGB_VAI, XXXXXXX, XXXXXXX,                      XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      RGB_MOD, RGB_HUD, RGB_SAD, RGB_VAD, XXXXXXX, XXXXXXX,                      XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,
  //|--------+--------+--------+--------+--------+--------+--------|  |--------+--------+--------+--------+--------+--------+--------|
                                          KC_LGUI, _______,  KC_SPC,     KC_ENT, _______, KC_RALT
                                      //`--------------------------'  `--------------------------'
  )
};
```

Now you can edit this file, replacing keycodes with the [QMK
keycodes](https://docs.qmk.fm/#/keycodes) you'd like to use for your keymap and modifying the layers on your keymap
to your liking.

You can take a look at the [full list of keycodes](https://docs.qmk.fm/#/keycodes)
as well as the [basic keycodes](https://docs.qmk.fm/#/keycodes_basic).

## Use names for your layers instead of numbers

I would recommend you use names for your layers.

Add an enum near the top of the `keymap.c` file with the names for your layers like so:

```c{3-8}
#include QMK_KEYBOARD_H

enum layers {
    _BASE,
    _FIRST,
    _SECOND,
    _THIRD
};
```

You can call these however you like, but make sure that they are listed in the
correct order, with your base layer first and your top most layer last.

Then replace integer references to these layers with the names instead like so:

```c{9,17,22,30,34,42,46}
enum layers {
    _BASE,
    _FIRST,
    _SECOND,
    _THIRD
};

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    [_BASE] = LAYOUT_split_3x6_3(
  //,-----------------------------------------------------.                    ,-----------------------------------------------------.
       KC_TAB,    KC_Q,    KC_W,    KC_E,    KC_R,    KC_T,                         KC_Y,    KC_U,    KC_I,    KC_O,   KC_P,  KC_BSPC,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LCTL,    KC_A,    KC_S,    KC_D,    KC_F,    KC_G,                         KC_H,    KC_J,    KC_K,    KC_L, KC_SCLN, KC_QUOT,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LSFT,    KC_Z,    KC_X,    KC_C,    KC_V,    KC_B,                         KC_N,    KC_M, KC_COMM,  KC_DOT, KC_SLSH,  KC_ESC,
  //|--------+--------+--------+--------+--------+--------+--------|  |--------+--------+--------+--------+--------+--------+--------|
                                          KC_LGUI,   MO(_FIRST),  KC_SPC,     KC_ENT,   MO(_SECOND), KC_RALT
                                      //`--------------------------'  `--------------------------'

  ),

    [_FIRST] = LAYOUT_split_3x6_3(
  //,-----------------------------------------------------.                    ,-----------------------------------------------------.
       KC_TAB,    KC_1,    KC_2,    KC_3,    KC_4,    KC_5,                         KC_6,    KC_7,    KC_8,    KC_9,    KC_0, KC_BSPC,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_TRNS, KC_NO, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                      KC_LEFT, KC_DOWN,   KC_UP,KC_RIGHT, XXXXXXX, XXXXXXX,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LSFT, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                      XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,
  //|--------+--------+--------+--------+--------+--------+--------|  |--------+--------+--------+--------+--------+--------+--------|
                                          KC_LGUI, _______,  KC_SPC,     KC_ENT,   MO(_THIRD), KC_RALT
                                      //`--------------------------'  `--------------------------'
  ),

    [_SECOND] = LAYOUT_split_3x6_3(
  //,-----------------------------------------------------.                    ,-----------------------------------------------------.
       KC_TAB, KC_EXLM,   KC_AT, KC_HASH,  KC_DLR, KC_PERC,                      KC_CIRC, KC_AMPR, KC_ASTR, KC_LPRN, KC_RPRN, KC_BSPC,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LCTL, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                      KC_MINS,  KC_EQL, KC_LBRC, KC_RBRC, KC_BSLS,  KC_GRV,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      KC_LSFT, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                      KC_UNDS, KC_PLUS, KC_LCBR, KC_RCBR, KC_PIPE, KC_TILD,
  //|--------+--------+--------+--------+--------+--------+--------|  |--------+--------+--------+--------+--------+--------+--------|
                                          KC_LGUI,   MO(_THIRD),  KC_SPC,     KC_ENT, _______, KC_RALT
                                      //`--------------------------'  `--------------------------'
  )

    [_THIRD] = LAYOUT_split_3x6_3(
  //,-----------------------------------------------------.                    ,-----------------------------------------------------.
        QK_BOOT, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                      XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      RGB_TOG, RGB_HUI, RGB_SAI, RGB_VAI, XXXXXXX, XXXXXXX,                      XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,
  //|--------+--------+--------+--------+--------+--------|                    |--------+--------+--------+--------+--------+--------|
      RGB_MOD, RGB_HUD, RGB_SAD, RGB_VAD, XXXXXXX, XXXXXXX,                      XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,
  //|--------+--------+--------+--------+--------+--------+--------|  |--------+--------+--------+--------+--------+--------+--------|
                                          KC_LGUI, _______,  KC_SPC,     KC_ENT, _______, KC_RALT
                                      //`--------------------------'  `--------------------------'
  )
};
```

## Compile your firmware

Once you're happy with your firmware, compile it with the following command:

```bash
qmk compile -kb crkbd -km your-name
```

Again, replacing "crkbd" with your keyboard name and "your-name" with your name or the name
that you gave to your keymap.

This will save the firmware file to your qmk_firmware directory.

## Put your keyboard in bootloader mode

First open **QMK Toolbox**.

Now you need to put your keyboard in bootloader mode to make it ready to be flashed.

QMK has a specific set of instructions that you can try for this [here](https://docs.qmk.fm/#/newbs_flashing?id=put-your-keyboard-into-dfu-bootloader-mode).

My corne keyboard has a reset button on the PCB. Most keyboard PCBs have this on the underside. You can press on it to put your keyboard in bootloader mode.

Once you've put it in bootloader mode and connected your keyboard to the computer,
you should see a message in yellow like this one:

```
*** DFU device connected: Atmel Corp. ATmega32U4 (03EB:2FF4:0000)
```

## Open the compiled firmware in QMK Toolbox

Now you can click on "open" and look for the compiled firmware file in your file explorer (should be in the `qmk_firmware` folder).

It will have a format similar to this:

```
<keyboard_name>_<keymap_name>.{bin,hex}
```

## Flash your keyboard

Make sure you have the correct bootloader selected in the top right corner of QMK Toolbox.

Then click on flash.

**Don't disconnect your keyboard before this finishes**

Once your keyboard is flashed, you'll see something like this:

```
Flash complete
*** DFU device disconnected: Atmel Corp: ATmega32U4 (03EB:2FF4:0000)
```

## You're Done 🚀
