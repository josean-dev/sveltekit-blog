---
title: "A Powerful Way To Make Editing Code In Neovim Even Better (Treesitter & Text Objects)"
imgUrl: "https://res.cloudinary.com/martinez-cloud/image/upload/v1696453701/josean-youtube-blog/nvim-treesitter-textobjects_p0t2qx.jpg"
youtubeId: "CEMPq_r8UYQ"
publishedAt: "2023-10-04"
summary: "How to setup treesitter & treesitter text objects to take code editing in Neovim to the next level."
---

Treesitter is an experimental feature of Neovim that, through the help of language parsers, constructs a syntax
tree for the files you work with allowing improved features like **better syntax highlighting**,
**better indentation**, **incremental selection** and advanced **syntax aware text objects**.

In this post, I'm gonna show you guys everything you need to know to set this up and take your setup to the next level.

You can also watch my [detailed video](https://youtu.be/CEMPq_r8UYQ) on this.

## Basic Folder Structure

I'm using the [lazy.nvim](https://github.com/folke/lazy.nvim) plugin manager in my Neovim config
and my folder structure looks something like the following:

```bash
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
```

_Whenever I mention [name], replace it with your actual name (so "[name]" => "josean" in my case)_

If you're on mac or linux the config should be in `~/.config/nvim`
and on Windows it should be in `~/AppData/Local/nvim/ `

📹 If you'd like to learn more about using lazy.nvim, checkout my
youtube video on that: [How To Use lazy.nvim](https://youtu.be/6mxWayq-s9I?si=m33fAAhqQ4dt64Zn)

## init.lua

The `~/.config/nvim/init.lua` file is the most important as this runs whenever Neovim starts:

```bash{2}
~/.config/nvim
├── init.lua
```

In this file I load the "[name].lazy" module like so:

_Remember to replace [name] with your actual name_

```lua{2}
require("[name].core")
require("[name].lazy")
```

This module is located in `~/.config/nvim/lua/[name]/lazy.lua`

```bash{7}
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
```

In this file I bootstrap lazy.nvim and setup the lazy.nvim plugin.

## Setting up lazy.nvim

The `lazy.lua` file should first bootstrap lazy.nvim to
install it if not already installed whenever neovim starts up:

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)
```

After that we should call the setup function passing lua modules that
will contain all of our plugin specs/configurations.

```lua{14}
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({ { import = "[name].plugins" }, { import = "[name].plugins.lsp" } })
```

_Replace [name] with your actual name (example: "[name]" => "josean")_

The first module `[name].plugins` corresponds to this folder
that contains files with plugin configurations within them and it's where we'll configure
`nvim-treesitter` and `nvim-treesitter-textobjects`.

```bash{8}
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
            ├── alpha-nvim.lua
            ├── auto-session.lua
            ├── bufferline.lua
            ├── colorizer.lua
            ├── ....
```

## Setup Treesitter

We can use the [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) plugin for a simple and convenient way to configure Neovim's builtin treesitter
and enable features for it.

Add a `nvim-treesitter.lua` file under `~/.config/nvim/lua/[name]/plugins/`

```bash{13}
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
            ├── alpha-nvim.lua
            ├── auto-session.lua
            ├── bufferline.lua
            ├── colorizer.lua
            ├── nvim-treesitter.lua
            ├── ....
```

Return a table from this file with the short plugin url for nvim-treesitter:

```lua
return {
  "nvim-treesitter/nvim-treesitter",
}
```

Then add a config function to setup the plugin once it loads and require the plugin.

```lua{3-5}
return {
  "nvim-treesitter/nvim-treesitter",
  config = function()
    local treesitter = require("nvim-treesitter.configs")
  end,
}
```

### Enable Better Syntax Highlighting and Indentation

Now call it's setup function and enable the `highlight` and `indentation` features of treesitter.

Enabling `highlight` will improve syntax highlighting and enabling `indent` will improve indentation
with the `=` operator.

```lua{7-13}
return {
  "nvim-treesitter/nvim-treesitter",
  config = function()
    local treesitter = require("nvim-treesitter.configs")

    -- configure treesitter
    treesitter.setup({ -- enable syntax highlighting
      highlight = {
        enable = true,
      },
      -- enable indentation
      indent = { enable = true },
    })
  end,
}
```

### Add List of Language Parsers To Auto Install

Now add an `ensure_installed` list to auto install the parsers you need for the languages you work with.

List of available language parsers see: [Treesitter Parsers](https://github.com/nvim-treesitter/nvim-treesitter#supported-languages)

```lua{14-33}
return {
  "nvim-treesitter/nvim-treesitter",
  config = function()
    local treesitter = require("nvim-treesitter.configs")

    -- configure treesitter
    treesitter.setup({ -- enable syntax highlighting
      highlight = {
        enable = true,
      },
      -- enable indentation
      indent = { enable = true },
      -- ensure these language parsers are installed
      ensure_installed = {
        "json",
        "javascript",
        "typescript",
        "tsx",
        "yaml",
        "html",
        "css",
        "prisma",
        "markdown",
        "markdown_inline",
        "svelte",
        "graphql",
        "bash",
        "lua",
        "vim",
        "dockerfile",
        "gitignore",
        "query",
      },
    })
  end,
}
```

Now add the following to make sure that whenever nvim-treesitter is installed or updated,
the language parsers in the `ensure_installed` list update as well.

```lua{3}
return {
  "nvim-treesitter/nvim-treesitter",
  build = ":TSUpdate",
  config = function()
    local treesitter = require("nvim-treesitter.configs")

    -- configure treesitter
    treesitter.setup({ -- enable syntax highlighting
      highlight = {
        enable = true,
      },
      -- enable indentation
      indent = { enable = true },
      -- ensure these language parsers are installed
      ensure_installed = {
        "json",
        "javascript",
        "typescript",
        "tsx",
        "yaml",
        "html",
        "css",
        "prisma",
        "markdown",
        "markdown_inline",
        "svelte",
        "graphql",
        "bash",
        "lua",
        "vim",
        "dockerfile",
        "gitignore",
        "query",
      },
    })
  end,
}
```

### Enable Incremental Selection Through Treesitter

Now enable the `incremental_selection` feature of treesitter.

```lua{34-43}
return {
  "nvim-treesitter/nvim-treesitter",
  config = function()
    local treesitter = require("nvim-treesitter.configs")

    -- configure treesitter
    treesitter.setup({ -- enable syntax highlighting
      highlight = {
        enable = true,
      },
      -- enable indentation
      indent = { enable = true },
      -- ensure these language parsers are installed
      ensure_installed = {
        "json",
        "javascript",
        "typescript",
        "tsx",
        "yaml",
        "html",
        "css",
        "prisma",
        "markdown",
        "markdown_inline",
        "svelte",
        "graphql",
        "bash",
        "lua",
        "vim",
        "dockerfile",
        "gitignore",
        "query",
      },
      incremental_selection = {
        enable = true,
        keymaps = {
          init_selection = "<C-space>",
          node_incremental = "<C-space>",
          scope_incremental = false,
          node_decremental = "<bs>",
        },
      },
    })
  end,
}
```

With this enabled you can now use `<C-space>` (Ctrl + space) to select the current node in the syntax
tree your cursor is in. If you keep executing this keymap, the selection will expand to the parent node
until you have selected the whole file. You can go backwards with `<bs>` (backspace).

### Add Event To Lazy Load The Plugin

Now add the following to load the plugin only when opening a buffer for an already existing file
or for a new one. We don't need treesitter outside of the context of a buffer.

```lua{4}
return {
  "nvim-treesitter/nvim-treesitter",
  build = ":TSUpdate",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local treesitter = require("nvim-treesitter.configs")

    -- configure treesitter
    treesitter.setup({ -- enable syntax highlighting
      highlight = {
        enable = true,
      },
      -- enable indentation
      indent = { enable = true },
      -- ensure these language parsers are installed
      ensure_installed = {
        "json",
        "javascript",
        "typescript",
        "tsx",
        "yaml",
        "html",
        "css",
        "prisma",
        "markdown",
        "markdown_inline",
        "svelte",
        "graphql",
        "bash",
        "lua",
        "vim",
        "dockerfile",
        "gitignore",
        "query",
      },
      incremental_selection = {
        enable = true,
        keymaps = {
          init_selection = "<C-space>",
          node_incremental = "<C-space>",
          scope_incremental = false,
          node_decremental = "<bs>",
        },
      },
    })
  end,
}
```

**With this setup you can use `:InspectTree` inside a file for a language you have installed a parser for
and see the syntax tree nodes generated by treesitter and the parser.**

Typescript Syntax Tree Example:

![Typescript Syntax tree](/post-images/nvim-treesitter-and-textobjects/syntax-tree-example.png)

## Setup Syntax Aware Text Objects

Now let's add [nvim-treesitter-textobjects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects) to setup syntax aware text objects.

The first thing you'll want to do here is add a dependency to `nvim-treesitter` for `nvim-treesitter-textobjects`
so that it loads whenever `nvim-treesitter` loads (when opening a buffer).

```lua{5-7}
return {
  "nvim-treesitter/nvim-treesitter",
  build = ":TSUpdate",
  event = { "BufReadPre", "BufNewFile" },
  dependencies = {
    "nvim-treesitter/nvim-treesitter-textobjects",
  },
  config = function()
    local treesitter = require("nvim-treesitter.configs")

    -- configure treesitter
    treesitter.setup({ -- enable syntax highlighting
      highlight = {
        enable = true,
      },
      -- enable indentation
      indent = { enable = true },
      -- ensure these language parsers are installed
      ensure_installed = {
        "json",
        "javascript",
        "typescript",
        "tsx",
        "yaml",
        "html",
        "css",
        "prisma",
        "markdown",
        "markdown_inline",
        "svelte",
        "graphql",
        "bash",
        "lua",
        "vim",
        "dockerfile",
        "gitignore",
        "query",
      },
      incremental_selection = {
        enable = true,
        keymaps = {
          init_selection = "<C-space>",
          node_incremental = "<C-space>",
          scope_incremental = false,
          node_decremental = "<bs>",
        },
      },
    })
  end,
}
```

Now add a `nvim-treesitter-textobjects.lua` file under `~/.config/nvim/lua/[name]/plugins/` to configure
this plugin.

```bash{14}
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
            ├── alpha-nvim.lua
            ├── auto-session.lua
            ├── bufferline.lua
            ├── colorizer.lua
            ├── nvim-treesitter.lua
            ├── nvim-treesitter-textobjects.lua
            ├── ....
```

Return a table from this file with the short plugin url for nvim-treesitter-textobjects:

```lua
return {
  "nvim-treesitter/nvim-treesitter-textobjects",
}
```

Now set `lazy=true` so that this plugin only loads when nvim-treesitter does as we specified it as a dependency
for it earlier.

```lua{3}
return {
  "nvim-treesitter/nvim-treesitter-textobjects",
  lazy = true,
}
```

Then add a config function to enable the plugin through nvim-treesitter once it loads.

```lua{4-6}
return {
  "nvim-treesitter/nvim-treesitter-textobjects",
  lazy = true,
  config = function()
    require("nvim-treesitter.configs").setup({
    })
  end
}
```

### Enable Syntax Aware Text Objects

Now enable the treesitter text objects module and set `lookahead = true`. With `lookahead` set to `true`
if you are before a text object and execute a keymap for it, it will find the next closest one.

```lua{6-13}
return {
  "nvim-treesitter/nvim-treesitter-textobjects",
  lazy = true,
  config = function()
    require("nvim-treesitter.configs").setup({
      textobjects = {
        select = {
          enable = true,

          -- Automatically jump forward to textobj, similar to targets.vim
          lookahead = true,
        },
      },
    })
  end,
}
```

### Setup Keymaps Syntax Aware Text Objects

If for example a keymap is something like `a=` then you can do `va=`, `da=`, `ca=` or `ya=` on this text object.

For a list of valid capture groups for built in text objects you can target: [Built-In Text Objects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects#built-in-textobjects)

**Support will vary depending on the language you are working with.**

```lua{13-37}
return {
  "nvim-treesitter/nvim-treesitter-textobjects",
  lazy = true,
  config = function()
    require("nvim-treesitter.configs").setup({
      textobjects = {
        select = {
          enable = true,

          -- Automatically jump forward to textobj, similar to targets.vim
          lookahead = true,

          keymaps = {
            -- You can use the capture groups defined in textobjects.scm
            ["a="] = { query = "@assignment.outer", desc = "Select outer part of an assignment" },
            ["i="] = { query = "@assignment.inner", desc = "Select inner part of an assignment" },
            ["l="] = { query = "@assignment.lhs", desc = "Select left hand side of an assignment" },
            ["r="] = { query = "@assignment.rhs", desc = "Select right hand side of an assignment" },

            ["aa"] = { query = "@parameter.outer", desc = "Select outer part of a parameter/argument" },
            ["ia"] = { query = "@parameter.inner", desc = "Select inner part of a parameter/argument" },

            ["ai"] = { query = "@conditional.outer", desc = "Select outer part of a conditional" },
            ["ii"] = { query = "@conditional.inner", desc = "Select inner part of a conditional" },

            ["al"] = { query = "@loop.outer", desc = "Select outer part of a loop" },
            ["il"] = { query = "@loop.inner", desc = "Select inner part of a loop" },

            ["af"] = { query = "@call.outer", desc = "Select outer part of a function call" },
            ["if"] = { query = "@call.inner", desc = "Select inner part of a function call" },

            ["am"] = { query = "@function.outer", desc = "Select outer part of a method/function definition" },
            ["im"] = { query = "@function.inner", desc = "Select inner part of a method/function definition" },

            ["ac"] = { query = "@class.outer", desc = "Select outer part of a class" },
            ["ic"] = { query = "@class.inner", desc = "Select inner part of a class" },
          },
        },
      },
    })
  end,
}
```

_Above I've setup keymaps for assignments, parameters/arguments, conditionals/if statements, loops,
function calls, method/function definitions and classes._

### Setup Keymaps For Swapping Text Objects

Add a `swap` field, enable this treesitter module and add keymaps for swapping a text object with the next/previous occurrence
of it.

```lua{8-18}
return {
  "nvim-treesitter/nvim-treesitter-textobjects",
  lazy = true,
  config = function()
    require("nvim-treesitter.configs").setup({
      textobjects = {
        select = {...},
        swap = {
          enable = true,
          swap_next = {
            ["<leader>na"] = "@parameter.inner", -- swap parameters/argument with next
            ["<leader>nm"] = "@function.outer", -- swap function with next
          },
          swap_previous = {
            ["<leader>pa"] = "@parameter.inner", -- swap parameters/argument with prev
            ["<leader>pm"] = "@function.outer", -- swap function with previous
          },
        },
      },
    })
  end,
}
```

_Above I've added keymaps for swapping the current parameter/argument with the next and previous one
as well as for method/function definitions_

### Setup Keymaps For Moving To Text Objects

Now add the `move` module, enable it, and add keymaps to move to the start and ends of text objects.

```lua{9-45}
return {
  "nvim-treesitter/nvim-treesitter-textobjects",
  lazy = true,
  config = function()
    require("nvim-treesitter.configs").setup({
      textobjects = {
        select = {...},
        swap = {...},
        move = {
          enable = true,
          set_jumps = true, -- whether to set jumps in the jumplist
          goto_next_start = {
            ["]f"] = { query = "@call.outer", desc = "Next function call start" },
            ["]m"] = { query = "@function.outer", desc = "Next method/function def start" },
            ["]c"] = { query = "@class.outer", desc = "Next class start" },
            ["]i"] = { query = "@conditional.outer", desc = "Next conditional start" },
            ["]l"] = { query = "@loop.outer", desc = "Next loop start" },

            -- You can pass a query group to use query from `queries/<lang>/<query_group>.scm file in your runtime path.
            -- Below example nvim-treesitter's `locals.scm` and `folds.scm`. They also provide highlights.scm and indent.scm.
            ["]s"] = { query = "@scope", query_group = "locals", desc = "Next scope" },
            ["]z"] = { query = "@fold", query_group = "folds", desc = "Next fold" },
          },
          goto_next_end = {
            ["]F"] = { query = "@call.outer", desc = "Next function call end" },
            ["]M"] = { query = "@function.outer", desc = "Next method/function def end" },
            ["]C"] = { query = "@class.outer", desc = "Next class end" },
            ["]I"] = { query = "@conditional.outer", desc = "Next conditional end" },
            ["]L"] = { query = "@loop.outer", desc = "Next loop end" },
          },
          goto_previous_start = {
            ["[f"] = { query = "@call.outer", desc = "Prev function call start" },
            ["[m"] = { query = "@function.outer", desc = "Prev method/function def start" },
            ["[c"] = { query = "@class.outer", desc = "Prev class start" },
            ["[i"] = { query = "@conditional.outer", desc = "Prev conditional start" },
            ["[l"] = { query = "@loop.outer", desc = "Prev loop start" },
          },
          goto_previous_end = {
            ["[F"] = { query = "@call.outer", desc = "Prev function call end" },
            ["[M"] = { query = "@function.outer", desc = "Prev method/function def end" },
            ["[C"] = { query = "@class.outer", desc = "Prev class end" },
            ["[I"] = { query = "@conditional.outer", desc = "Prev conditional end" },
            ["[L"] = { query = "@loop.outer", desc = "Prev loop end" },
          },
        },
      },
    })
  end,
}
```

Doing `set_jumps = true` will add these movements to the jump list when you execute them and allow you to
go forwards and backwards through them with `<C-o>` (back) and `<C-i`> (forwards).

In `goto_next_start` define keymaps to go to the next start of a given text object.
In `goto_next_end` define keymaps to go to the next end of a given text object.
In `goto_next_previous_start` define keymaps to go to the previous start of a given text object.
In `goto_next_previous_end` define keymaps to go to the previous end of a given text object.

If defined keymaps here for function calls, method/function definitions, classes, conditionals/if statements and loops.

Now you can also configure `;` and `,` to repeat these movements.

```lua{13-23}
return {
  "nvim-treesitter/nvim-treesitter-textobjects",
  lazy = true,
  config = function()
    require("nvim-treesitter.configs").setup({
      textobjects = {
        select = {...},
        swap = {...},
        move = {...},
      },
    })

    local ts_repeat_move = require("nvim-treesitter.textobjects.repeatable_move")

    -- vim way: ; goes to the direction you were moving.
    vim.keymap.set({ "n", "x", "o" }, ";", ts_repeat_move.repeat_last_move)
    vim.keymap.set({ "n", "x", "o" }, ",", ts_repeat_move.repeat_last_move_opposite)

    -- Optionally, make builtin f, F, t, T also repeatable with ; and ,
    vim.keymap.set({ "n", "x", "o" }, "f", ts_repeat_move.builtin_f)
    vim.keymap.set({ "n", "x", "o" }, "F", ts_repeat_move.builtin_F)
    vim.keymap.set({ "n", "x", "o" }, "t", ts_repeat_move.builtin_t)
    vim.keymap.set({ "n", "x", "o" }, "T", ts_repeat_move.builtin_T)
  end,
}
```

The above will configure repeating movements with `;` and `,` and also maintain the built in vim
functionality to use these keys to repeat `f`, `F`, `t` and `T` movements. `;` will go the direction
you were moving previously and `,` will go the opposite direction you were moving in.

## 🚀 BONUS: Adding Your Own Capture Groups

Now let's say that you want to target specific nodes in the syntax tree not already supported
by **nvim-treesitter-textobjects** for the language that you're working with.

_Treesitter Text Objects Documentation: [Adding Queries](https://github.com/nvim-treesitter/nvim-treesitter#adding-queries)_

To do this you'll have to add a treesitter query file either in
`~/.config/nvim/queries` (to create a new one) or `~/.config/nvim/after/queries` (to extend an existing one).

A query file is used to target specific nodes in a syntax tree, define capture groups
for them like `@function.outer`, and then be able to define keymaps for these capture groups
as we did before.

_Official Documentation On Writing Queries & Capture Groups: [How To Write Queries & Define Capture Groups](https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax)_

### Adding Keymaps For TS/JS Object Properties

Let's say you want to add support for targeting typescript object properties to add some keymaps for them with `nvim-treesitter-textobjects`.

The first thing you should do is take a look at the default typescript text objects query file.

The file is located here: [Typescript Text Objects Query](https://github.com/nvim-treesitter/nvim-treesitter-textobjects/blob/master/queries/typescript/textobjects.scm)

You'll see that the file is called `textobjects.scm` and it looks something like this:

```scheme{1}
; inherits: ecma

(interface_declaration) @class.outer

(interface_declaration
  body: (object_type . "{" . (_) @_start @_end _? @_end . "}"
 (#make-range! "class.inner" @_start @_end)))

(type_alias_declaration) @class.outer

(type_alias_declaration
  value: (object_type . "{" . (_) @_start @_end _? @_end . "}"
 (#make-range! "class.inner" @_start @_end)))

(enum_declaration) @class.outer

(enum_declaration
  body: (enum_body . "{" . (_) @_start @_end _? @_end . "}"
 (#make-range! "class.inner" @_start @_end)))
```

Don't worry too much about the particular details, this is so you get an idea on how treesitter queries are written.

**Note that this typescript text objects query inherits from the `ecma` text objects query file (this is also true for javascript)**

This means that we need to extend the `ecma` text objects query file so that our addition works with
both `typescript` and `javascript.`

Take a look at the `ecma` text objects [query file](https://github.com/nvim-treesitter/nvim-treesitter-textobjects/blob/master/queries/ecma/textobjects.scm):

You can take look at all of the text object query files for different languages here: [All Query Files](https://github.com/nvim-treesitter/nvim-treesitter-textobjects/tree/master/queries)

To extend the `ecma` queries, we'll need to create this file:

```bash{7}
~/.config/nvim
├── init.lua
├── lazy-lock.json
├── after/
    └── queries/
        └── ecma/
            └── textobjects.scm
```

### Write the query

What I would do is to first open a typescript file that has an object, run `:InspectTree` and
place the cursor over an object property to see what the nodes in the tree look like.

Or you can also use the [treesitter playground](https://tree-sitter.github.io/tree-sitter/playground)

For a javascript object like the following:

```javascript
const obj = {
  id,
  title,
  description: "This is the recipe description",
  creationDate: new Date(),
  ingredients: ["ingredient1", "ingredient2", "ingredient3"]
};
```

It'll look something like this:

![Javascript Object Nodes](/post-images/nvim-treesitter-and-textobjects/js-object-nodes.png)

Let's add our special query to our new query file to target object properties and define capture groups for them:

```scheme{1}
; extends
(object
  (pair
    key: (_) @property.lhs
    value: (_) @property.inner @property.rhs) @property.outer)
```

Make sure to include `; extends` because we are extending the `ecma` text objects query file.

The first line targets an object:

```scheme{2}
; extends
(object
  (pair
    key: (_) @property.lhs
    value: (_) @property.inner @property.rhs) @property.outer)
```

Then inside, we target a pair:

```scheme{3}
; extends
(object
  (pair
    key: (_) @property.lhs
    value: (_) @property.inner @property.rhs) @property.outer)
```

Then inside, we target a key and value and set capture groups for these:

```scheme{4-5}
; extends
(object
  (pair
    key: (_) @property.lhs
    value: (_) @property.inner @property.rhs) @property.outer)
```

`(_)` is a wildcard node and we use this here so that the key and value of an object property can
be any type of node.

### Add keymaps for object properties

Now we can set keymaps for `@property.lhs`, `@property.inner`, `@property.rhs` and `@property.outer`
to be able to select these, delete them, change them, copy them, swap them, etc...

In `nvim-treesitter-textobjects.lua`:

```lua{20-23,51,56}
return {
  "nvim-treesitter/nvim-treesitter-textobjects",
  lazy = true,
  config = function() require("nvim-treesitter.configs").setup({
      textobjects = {
        select = {
          enable = true,

          -- Automatically jump forward to textobj, similar to targets.vim
          lookahead = true,

          keymaps = {
            -- You can use the capture groups defined in textobjects.scm
            ["a="] = { query = "@assignment.outer", desc = "Select outer part of an assignment" },
            ["i="] = { query = "@assignment.inner", desc = "Select inner part of an assignment" },
            ["l="] = { query = "@assignment.lhs", desc = "Select left hand side of an assignment" },
            ["r="] = { query = "@assignment.rhs", desc = "Select right hand side of an assignment" },

            -- works for javascript/typescript files (custom captures I created in after/queries/ecma/textobjects.scm)
            ["a:"] = { query = "@property.outer", desc = "Select outer part of an object property" },
            ["i:"] = { query = "@property.inner", desc = "Select inner part of an object property" },
            ["l:"] = { query = "@property.lhs", desc = "Select left part of an object property" },
            ["r:"] = { query = "@property.rhs", desc = "Select right part of an object property" },

            ["aa"] = { query = "@parameter.outer", desc = "Select outer part of a parameter/argument" },
            ["ia"] = { query = "@parameter.inner", desc = "Select inner part of a parameter/argument" },

            ["ai"] = { query = "@conditional.outer", desc = "Select outer part of a conditional" },
            ["ii"] = { query = "@conditional.inner", desc = "Select inner part of a conditional" },

            ["al"] = { query = "@loop.outer", desc = "Select outer part of a loop" },
            ["il"] = { query = "@loop.inner", desc = "Select inner part of a loop" },

            ["af"] = { query = "@call.outer", desc = "Select outer part of a function call" },
            ["if"] = { query = "@call.inner", desc = "Select inner part of a function call" },

            ["am"] = { query = "@function.outer", desc = "Select outer part of a method/function definition" },
            ["im"] = { query = "@function.inner", desc = "Select inner part of a method/function definition" },

            ["ac"] = { query = "@class.outer", desc = "Select outer part of a class" },
            ["ic"] = { query = "@class.inner", desc = "Select inner part of a class" },

            ["a/"] = { query = "@comment.outer", desc = "Select outer part of a comment" },
            ["i/"] = { query = "@comment.inner", desc = "Select inner part of a comment" },
          },
        },
        swap = {
          enable = true,
          swap_next = {
            ["<leader>na"] = "@parameter.inner", -- swap parameters/argument with next
            ["<leader>n:"] = "@property.outer", -- swap object property with next
            ["<leader>nm"] = "@function.outer", -- swap function with next
          },
          swap_previous = {
            ["<leader>pa"] = "@parameter.inner", -- swap parameters/argument with prev
            ["<leader>p:"] = "@property.outer", -- swap object property with prev
            ["<leader>pm"] = "@function.outer", -- swap function with previous
          },
        },
      },
    })
  end,
}
```

## And That's It! 🎉
