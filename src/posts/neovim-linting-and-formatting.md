---
title: "How To Setup Linting & Formatting In Neovim To Replace null-ls"
imgUrl: ""
publishedAt: "2023-09-28"
summary: ""
---

## Basic Folder Structure

I'm using the [lazy.nvim](https://github.com/folke/lazy.nvim) plugin manager in my Neovim config
and my folder structure looks something like the following:

```
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
```

If you're on mac or linux the config should be in `~/.config/nvim`
and on Windows it should be in `~/AppData/Local/nvim/ `.

If you'd like to learn more about using lazy.nvim, checkout my
youtube video on that: [How To Use lazy.nvim](https://youtu.be/6mxWayq-s9I?si=m33fAAhqQ4dt64Zn)

## init.lua

The `~/.config/nvim/init.lua` file is the most important and it looks something like this:

```lua
require("josean.core")
require("josean.lazy")
```

The second line requires the `josean.lazy` module to bootstrap lazy.nvim
and setup my plugins. This module is located in `~/.config/nvim/lua/josean/lazy.lua`.

## Setting up lazy.nvim

The `lazy.lua` file should first bootstrap lazy.nvim to
install it if not already installed whenever neovim starts up:

```lua:{1,3-5}
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

After that we should call the setup function:

```lua
require("lazy").setup({})
```

And pass a lua module to it that will contain all of our plugin specs/configs:

```lua
require("lazy").setup({{import = "[name].plugins"}})
```

**_Replace [name] with your actual name_**

You should end up with something like this:

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

require("lazy").setup({ { import = "[name].plugins" } })
```

## Plugins folder

Now you should add a folder for your plugins located in
`~/.config/nvim/lua/[name]/plugins`

## Formatting With conform.nvim

In this folder add a new file called `formatting.lua`

Return a table from this file with the short plugin url for conform.nvim:

```lua
return {
  "stevearc/conform.nvim",
}
```

Then add an `events` field and add the `BufReadPre` and `BufNewFile` events.
This is so that we lazy load conform.nvim when we open a buffer for an
already existing file or for a new file as we only need formatting when
working in a buffer.

```lua
return {
  "stevearc/conform.nvim",
  event = { "BufReadPre", "BufNewFile" },
}
```

Now add a config function to setup the plugin once it loads.

```lua
return {
  "stevearc/conform.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
  end,
}
```

Then require the `conform.nvim` plugin.

```lua
return {
  "stevearc/conform.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local conform = require("conform")
  end,
}
```

After requiring the plugin we can call its setup function
and configure the filetypes we want to setup formatting for like so:

```lua
return {
  "stevearc/conform.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local conform = require("conform")

    conform.setup({
      formatters_by_ft = {
        javascript = { "prettier" },
        typescript = { "prettier" },
        javascriptreact = { "prettier" },
        typescriptreact = { "prettier" },
        svelte = { "prettier" },
        css = { "prettier" },
        html = { "prettier" },
        json = { "prettier" },
        yaml = { "prettier" },
        markdown = { "prettier" },
        graphql = { "prettier" },
        lua = { "stylua" },
        python = { "isort", "black" },
      },
    })
  end,
}
```

As you can see we're using `prettier` to format several different
file types including `javascript`, `typescript`, `css`, `html`, `json`, etc...
as well as `stylua` for `lua` files and `isort` and `black` for `python files`.

For a list of all available formatters see this: [Available Formatters](https://github.com/stevearc/conform.nvim#formatters)

If you specify more than one formatter, they will be executed in the order you
list them.

If you use a subtable like so: `python = {{ "isort", "black" }}` then
the first available formatter is the only one that will execute.

```lua
return {
  "stevearc/conform.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local conform = require("conform")

    conform.setup({
      formatters_by_ft = {
        javascript = { "prettier" },
        typescript = { "prettier" },
        javascriptreact = { "prettier" },
        typescriptreact = { "prettier" },
        svelte = { "prettier" },
        css = { "prettier" },
        html = { "prettier" },
        json = { "prettier" },
        yaml = { "prettier" },
        markdown = { "prettier" },
        graphql = { "prettier" },
        lua = { "stylua" },
        python = { "isort", "black" },
      },
      format_on_save = {
        lsp_fallback = true,
        async = false,
        timeout_ms = 500,
      },
    })

    vim.keymap.set({ "n", "v" }, "<leader>mp", function()
      conform.format({
        lsp_fallback = true,
        async = false,
        timeout_ms = 500,
      })
    end, { desc = "Format file or range (in visual mode)" })
  end,
}
```
