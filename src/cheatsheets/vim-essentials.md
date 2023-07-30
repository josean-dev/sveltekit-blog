---
title: 'Vim Essentials Cheatsheet'
publishedAt: 'July 30, 2023'
---

## Changing Vim Modes

| Command  | Description                                 |
| -------- | ------------------------------------------- |
| `i`      | Enter **INSERT** mode                       |
| `v`      | Enter **VISUAL** mode                       |
| `Ctrl-v` | Enter **VISUAL-BLOCK** mode                 |
| `:`      | Enter **COMMAND-LINE** mode                 |
| `R`      | Enter **REPLACE** mode                      |
| `ESC`    | Go back to **NORMAL** mode from other modes |

## Exiting

| Command       | Description                                     |
| ------------- | ----------------------------------------------- |
| `:w`          | **Write** (save) file without exiting           |
| `:wa`         | **Write** (save) all open files without exiting |
| `:q`          | **Quit** but fail if unsaved changes exist      |
| `:q!`         | **Quit** and discard unsaved changes            |
| `:wq` or `:x` | **Write** (save) and **quit**                   |
| `:wqa`        | **Write** and **quit** on all open files        |

## Moving Around

### Arrows

| Command | Description                              |
| ------- | ---------------------------------------- |
| `h`     | Move cursor left (left most)             |
| `j`     | Move cursor down (looks like down arrow) |
| `k`     | Move cursor up                           |
| `l`     | Move cursor right (right most)           |

### Movements Within A Line

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

### Movements Through A File

| Command | Description |
| ------- | ----------- |
