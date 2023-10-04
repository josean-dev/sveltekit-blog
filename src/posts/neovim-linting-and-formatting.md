---
title: "How To Setup Linting & Formatting In Neovim And Replace null-ls"
imgUrl: "https://res.cloudinary.com/martinez-cloud/image/upload/v1696137241/josean-youtube-blog/linting-and-formatting-v7_g1ex5u.jpg"
youtubeId: "ybUE4D80XSk"
publishedAt: "2023-09-30"
summary: "How to setup linting & formatting in Neovim with conform.nvim and nvim-lint to replace the archived null-ls plugin."
---

You can find my current Neovim config and the rest of my dotfiles here: [dotfiles](https://github.com/josean-dev/dev-environment-files)

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

If you'd like to learn more about using lazy.nvim, checkout my
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

These two modules `[name].plugins` and `[name].plugins.lsp` correspond to these two folders
that contain files with plugin configurations within them.

```bash{8,9}
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
            ├── lsp/
            │   ├── lspconfig.lua
            ├── alpha-nvim.lua
            ├── auto-session.lua
            ├── bufferline.lua
            ├── colorizer.lua
            ├── ....
```

## Setup Mason

Let's now setup the [Mason](https://github.com/williamboman/mason.nvim) plugin to be able
to install the linters and formatters we need. You can also use this plugin to install language servers.

Add a `mason.lua` file under `~/.config/nvim/lua/[name]/plugins/lsp/`

```bash{11}
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
            ├── lsp/
            │   ├── lspconfig.lua
            │   └── mason.lua
            ├── alpha-nvim.lua
            ├── auto-session.lua
            ├── bufferline.lua
            ├── colorizer.lua
            ├── ....
```

Add the following to `mason.lua` to setup the mason plugin with lazy.nvim:

```lua
return {
  "williamboman/mason.nvim",
  config = function()
    -- import mason
    local mason = require("mason")

    -- enable mason and configure icons
    mason.setup({
      ui = {
        icons = {
          package_installed = "✓",
          package_pending = "➜",
          package_uninstalled = "✗",
        },
      },
    })
  end,
}
```

Open the Lazy ui with `:Lazy` and pressing enter. Then press `i` to install the missing mason plugin.

## Formatting With conform.nvim

Let's setup formatting with [conform.nvim](https://github.com/stevearc/conform.nvim)

Add a `formatting.lua` file under `~/.config/nvim/lua/[name]/plugins/`

```bash{16}
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
            ├── lsp/
            │   ├── lspconfig.lua
            │   └── mason.lua
            ├── alpha-nvim.lua
            ├── auto-session.lua
            ├── bufferline.lua
            ├── colorizer.lua
            ├── formatting.lua
            ├── ....
```

Return a table from this file with the short plugin url for conform.nvim:

```lua
return {
  "stevearc/conform.nvim",
}
```

Then add an `event` field with the `BufReadPre` and `BufNewFile` events.

```lua{3}
return {
  "stevearc/conform.nvim",
  event = { "BufReadPre", "BufNewFile" },
}
```

This is so that we lazy load conform.nvim when we open a buffer either for an
_already existing file_ or for _a new file_ as we only need formatting when
working in a buffer.

_Do `:help events` to see a list of all available Neovim events_

Now add a config function to setup the plugin once it loads and require the plugin.

```lua{4-6}
return {
  "stevearc/conform.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local conform = require("conform")
  end,
}
```

After requiring the plugin we can call `conform.setup`
and configure the filetypes we want to setup formatting for like so:

```lua{7-23}
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

As you can see we're configuring several different formatters and filetypes here:

- **prettier**: javascript, typescript, css, html, json, etc...
- **stylua**: lua
- **isort** & **black**: python

For a list of all available formatters see: [Available Formatters](https://github.com/stevearc/conform.nvim#formatters)

If you specify more than one formatter, they will be executed in the order you
list them like we're doing for python.

```lua{21}
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

If you use a subtable like so: `python = {{ "isort", "black" }}` then
the first available formatter is the only one that will execute.

Next, add a `format_on_save` field to apply formatting when saving a file.

```lua{23-27}
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
  end,
}
```

- `lsp_fallback = true` tells conform.nvim to use the lsp if no formatter is available.
- `async = false` means to not do asynchronous formatting.
- `timeout_ms = 500` means to timeout after 500ms if formatting isn't finished

**_Some formatters may take longer than 500ms, you could change this to 1000ms which is the default_**

Now add a keymap to execute formatting with the same options as formatting on save.

```lua{29-36}
return { "stevearc/conform.nvim",
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

Now you can execute formatting by doing `<leader>mp`.

_In normal mode it will apply to the whole file,
in visual mode it will apply to the current selection._

If formatting on save doesn't seem to be working, try `<leader>mp` and make sure that the timeout isn't being reached.
There are other possible reasons like the formatter not being installed.

### Install the formatters

Open the Mason UI with `:Mason` and press `5` on your keyboard to go to the formatters section.

![Mason Formatters](/post-images/neovim-linting-and-formatting/mason-formatters.png)

Hover a formatter with the cursor and press `i` to install it.

Once installed, to uninstall, hover over it and press `X`

In my case I need:

- prettier
- stylua
- isort
- black

**One really nice feature of conform.nvim is that with formatters like `prettier`,
it will check if you have it in your `node_modules` and use that instead. This
comes in handy when you need to use a specific version of prettier in your project.**

_Using conform.nvim will also respect any formatter config files_

### Install & Load conform.nvim

_This is optional, you can also exit and reenter Neovim._

Open the Lazy ui with `:Lazy` and press `I` to install the missing conform.nvim plugin.

Close the ui with `q`

After closing run `:Lazy load conform.nvim` to load the plugin.

Now you can see the formatting at work whenever you save your lua files or do `<leader>mp`.

## Setup linting with nvim-lint

Let's setup linting with [ nvim-lint ](https://github.com/mfussenegger/nvim-lint)

Add a `linting.lua` file under `~/.config/nvim/lua/[name]/plugins/`

```bash{17}
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
            ├── lsp/
            │   ├── lspconfig.lua
            │   └── mason.lua
            ├── alpha-nvim.lua
            ├── auto-session.lua
            ├── bufferline.lua
            ├── colorizer.lua
            ├── formatting.lua
            ├── linting.lua
            ├── ....
```

Return a table from this file with the short plugin url for conform.nvim:

```lua
return {
  "mfussenegger/nvim-lint",
}
```

Then add an `event` field with the `BufReadPre` and `BufNewFile` events.

```lua{3}
return {
  "mfussenegger/nvim-lint",
  event = { "BufReadPre", "BufNewFile" },
}
```

Now add a config function and require the `nvim-lint` plugin.

```lua{7-9}
return {
  "mfussenegger/nvim-lint",
  event = {
    "BufReadPre",
    "BufNewFile",
  },
  config = function()
    local lint = require("lint")
  end,
}
```

Next set `lint.linters_by_ft` to a list of file types with the linters you want to use for them.

```lua{10-17}
return {
  "mfussenegger/nvim-lint",
  event = {
    "BufReadPre",
    "BufNewFile",
  },
  config = function()
    local lint = require("lint")

    lint.linters_by_ft = {
      javascript = { "eslint_d" },
      typescript = { "eslint_d" },
      javascriptreact = { "eslint_d" },
      typescriptreact = { "eslint_d" },
      svelte = { "eslint_d" },
      python = { "pylint" },
    }
  end,
}
```

In this case I'm using `eslint_d` for web dev related file types in my projects and `pylint` for python files.

To look at a list of available linters see: [Available Linters](https://github.com/mfussenegger/nvim-lint)

Now add a Neovim autocommand group and autocommand to execute linting on a set of Neovim events.

```lua{19-26}
return {
  "mfussenegger/nvim-lint",
  event = {
    "BufReadPre",
    "BufNewFile",
  },
  config = function()
    local lint = require("lint")

    lint.linters_by_ft = {
      javascript = { "eslint_d" },
      typescript = { "eslint_d" },
      javascriptreact = { "eslint_d" },
      typescriptreact = { "eslint_d" },
      svelte = { "eslint_d" },
      python = { "pylint" },
    }

    local lint_augroup = vim.api.nvim_create_augroup("lint", { clear = true })

    vim.api.nvim_create_autocmd({ "BufEnter", "BufWritePost", "InsertLeave" }, {
      group = lint_augroup,
      callback = function()
        lint.try_lint()
      end,
    })
  end,
}
```

This means that whenever the `BufEnter`, `BufWritePost`, and `InsertLeave` events happen,
linting will execute with `lint.try_lint()`.

To see a list of available Neovim events do: `:help events`

_Only some linters support linting from `stdin` and don't require you to save to the file. Only for these linters
will events like `InsertLeave` or `TextChanged` work properly. For example, these events work for `eslint_d`, but not for `pylint`.
To check for this take a look at the linter config
here: [Linter Configs](https://github.com/mfussenegger/nvim-lint/tree/master/lua/lint/linters) and check
that `stdin=true` for your particular linter_

Now let's add a keymap to execute linting.

```lua{28-30}
return {
  "mfussenegger/nvim-lint",
  event = {
    "BufReadPre",
    "BufNewFile",
  },
  config = function()
    local lint = require("lint")

    lint.linters_by_ft = {
      javascript = { "eslint_d" },
      typescript = { "eslint_d" },
      javascriptreact = { "eslint_d" },
      typescriptreact = { "eslint_d" },
      svelte = { "eslint_d" },
      python = { "pylint" },
    }

    local lint_augroup = vim.api.nvim_create_augroup("lint", { clear = true })

    vim.api.nvim_create_autocmd({ "BufEnter", "BufWritePost", "InsertLeave" }, {
      group = lint_augroup,
      callback = function()
        lint.try_lint()
      end,
    })

    vim.keymap.set("n", "<leader>l", function()
      lint.try_lint()
    end, { desc = "Trigger linting for current file" })
  end,
}
```

This will run `lint.try_lint()` whenever we use `<leader>l` in _Normal_ mode.

### Install the Linters

Now open Mason with `:Mason` and press `4` on your keyboard to go the Linting section.

![Mason Linters](/post-images/neovim-linting-and-formatting/mason-linters.png)

Now you can hover the linter you need with the cursor and press `i` to install it.

If you need to uninstall one, hover over it and use `X`

In my case I need:

- eslint_d
- pylint

**Now you're read to open a new project where linting is properly configured and see any
linting errors you might have through nvim-lint**

## Automatically Installing Linters Through Mason

I used to use [mason-null-ls](https://github.com/jay-babu/mason-null-ls.nvim) to auto install linters
and formatters when starting up Neovim, but you need to use the archived [null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim)
plugin for this to work properly.

So to replace this plugin you can use [mason-tools-installer](https://github.com/WhoIsSethDaniel/mason-tool-installer.nvim)

To add this to the config open up your `mason.lua` file

```bash{11}
~/.config/nvim
├── init.lua
├── lazy-lock.json
└── lua/
    └── [name]/
        ├── core/
        ├── lazy.lua
        └── plugins/
            ├── lsp/
            │   ├── lspconfig.lua
            │   └── mason.lua
            ├── alpha-nvim.lua
            ├── auto-session.lua
            ├── bufferline.lua
            ├── colorizer.lua
            ├── formatting.lua
            ├── linting.lua
            ├── ....
```

And now add the following:

```lua{3-5,9,22-31}
return {
  "williamboman/mason.nvim",
  dependencies = {
    "WhoIsSethDaniel/mason-tool-installer.nvim",
  },
  config = function()
    local mason = require("mason")

    local mason_tool_installer = require("mason-tool-installer")

    -- enable mason and configure icons
    mason.setup({
      ui = {
        icons = {
          package_installed = "✓",
          package_pending = "➜",
          package_uninstalled = "✗",
        },
      },
    })

    mason_tool_installer.setup({
      ensure_installed = {
        "prettier", -- prettier formatter
        "stylua", -- lua formatter
        "isort", -- python formatter
        "black", -- python formatter
        "pylint", -- python linter
        "eslint_d", -- js linter
      },
    })
  end,
}
```

This adds mason-tool-installer as a dependency and uses a `ensure_installed` list
so that Neovim automatically installs the listed linters and formatters whenever
it starts up.

## You're done! 🎉
