---
title: 'Vim Essentials Cheatsheet'
publishedAt: 'July 30, 2023'
---

# Changing Vim Modes

| Command  | Description                                 |
| -------- | ------------------------------------------- |
| `i`      | Enter **INSERT** mode                       |
| `v`      | Enter **VISUAL** mode                       |
| `Ctrl-v` | Enter **VISUAL-BLOCK** mode                 |
| `:`      | Enter **COMMAND-LINE** mode                 |
| `R`      | Enter **REPLACE** mode                      |
| `ESC`    | Go back to **NORMAL** mode from other modes |

# Exiting

| Command       | Description                                     |
| ------------- | ----------------------------------------------- |
| `:w`          | **Write** (save) file without exiting           |
| `:wa`         | **Write** (save) all open files without exiting |
| `:q`          | **Quit** but fail if unsaved changes exist      |
| `:q!`         | **Quit** and discard unsaved changes            |
| `:wq` or `:x` | **Write** (save) and **quit**                   |
| `:wqa`        | **Write** and **quit** on all open files        |

# Moving Around

## Arrows

| Command | Description                              |
| ------- | ---------------------------------------- |
| `h`     | Move cursor left (left most)             |
| `j`     | Move cursor down (looks like down arrow) |
| `k`     | Move cursor up                           |
| `l`     | Move cursor right (right most)           |

## Movements Within A Line

| Command | Description                                                                |
| ------- | -------------------------------------------------------------------------- |
| `$`     | Move cursor to the end of the line                                         |
| `0`     | Move cursor to the beginning of the line                                   |
| `^`     | Move cursor to the beginning of the line, ignoring any initial whitespace  |
| `fx`    | **Find** next occurrence of character 'x'                                  |
| `Fx`    | **Find** previous occurrence of character 'x'                              |
| `tx`    | Go **towards** next occurrence of character 'x' (stops right before it)    |
| `Tx`    | Go **towards** previous occurence of character 'x' (stops right before it) |
| `;`     | Repeat previous `f`, `F`, `t`, or `T` movement forwards                    |
| `,`     | Repeat previous `f`, `F`, `t`, or `T` movement backwards                   |

## Word Movements

#### Definitions:

- **word**: Sequence of letters, digits and underscores OR sequence of other symbols, separated by whitespace. Use `:h word` to learn more.
- **WORD**: Any sequence of non-blank characters (any symbols, letters, digits, etc...), separated by whitespace. Use `:h WORD` to learn more.

| Command | Description                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------ |
| `w`     | Move cursor forwards to start of **word** (sequence of letters, digits, underscores OR sequence of other symbols)  |
| `W`     | Move cursor forwards to start of **WORD** (any sequence of non-blank characters)                                   |
| `b`     | Move cursor backwards to start of **word** (sequence of letters, digits, underscores OR sequence of other symbols) |
| `B`     | Move cursor backwards to start of **WORD** (any sequence of non-blank characters)                                  |
| `e`     | Move cursor forwards to end of **word** (sequence of letters, digits, underscores OR sequence of other symbols)    |
| `E`     | Move cursor forwards to end of **WORD** (any sequence of non-blank characters)                                     |
| `ge`    | Move cursor backwards to end of **word** (sequence of letters, digits, underscores OR sequence of other symbols)   |
| `gE`    | Move cursor backwards to end of **WORD** (any sequence of non-blank characters)                                    |

## Paragraph Movements

#### Definitions:

- **paragraph**: Blocks of consecutive non-empty lines. NOTE: Line with white space is not empty. Use `:h paragraph` to learn more.

| Command | Description                                                                  |
| ------- | ---------------------------------------------------------------------------- |
| `}`     | Move cursor to next **paragraph** (block of consecutive non-empty lines)     |
| `{`     | Move cursor to previous **paragraph** (block of consecutive non-empty lines) |

## Moving To Specific Lines

**Note**: Replace `[number]` with an actual number. You can also use numbers in front of other cursor movements like `[number]w`, `[number]b` or `[number]}` and many others.

| Command     | Description                           |
| ----------- | ------------------------------------- |
| `gg`        | Move cursor to first line of document |
| `G`         | Move cursor to last line of document  |
| `[number]G` | Move cursor to line [number]          |
| `[number]j` | Go [number] lines down                |
| `[number]k` | Go [number] lines up                  |

## Parenthesis, Bracket, Curly Brace and Method Navigation

| Command | Description                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------- |
| `%`     | Find next parenthesis, bracket or curly brace in front of or under the cursor and jump to its match |
| `[(`    | Go to previous unmatched `(`                                                                        |
| `[{`    | Go to previous unmatched `{`                                                                        |
| `])`    | Go to next unmatched `)`                                                                            |
| `]}`    | Go to next unmatched `}`                                                                            |
| `]m`    | Go to next start of method (Java like languages)                                                    |
| `]M`    | Go to next end of method                                                                            |
| `[m`    | Go to previous start of method                                                                      |
| `[M`    | Go to previous end of method                                                                        |

## Window/Screen Related Movements

| Command  | Description                                           |
| -------- | ----------------------------------------------------- |
| `H`      | Move cursor to line at the top of the window          |
| `M`      | Move cursor to the line at the middle of the window   |
| `L`      | Move cursor to the line at the bottom of the window   |
| `zz`     | Center current cursor line in window                  |
| `zt`     | Place current cursor line at the top of the window    |
| `zb`     | Place current cursor line at the bottom of the window |
| `Ctrl-F` | Move cursor **forwards** one full screen              |
| `Ctrl-B` | Move cursor **backwards** one full screen             |
| `Ctrl-D` | Move cursor **down** half a screen                    |
| `Ctrl-U` | Move cursor **up** half a screen                      |

## Scrolling

| Command  | Description                                        |
| -------- | -------------------------------------------------- |
| `Ctrl-E` | Scroll down a single line, leaving cursor in place |
| `Ctrl-Y` | Scroll up a single line, leaving cursor in place   |
