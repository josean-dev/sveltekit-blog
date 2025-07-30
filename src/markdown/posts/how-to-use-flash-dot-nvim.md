---
title: "How To Jump Anywhere Instantly in Neovim with flash.nvim"
imgUrl: "/post-images/how-to-use-flash-dot-nvim/thumbnail.jpg"
youtubeId: "p_sVgHS2zcA"
publishedAt: "2025-07-29"
summary: "Use this guide along with my youtube video to learn how to setup & use flash to move instantly anywhere visible in your Neovim windows."
---

Below you can find basic instructions on how to install flash.nvim & the code used in the video. Refer to
the [youtube video](https://youtu.be/p_sVgHS2zcA) for in depth explanations on how flash.nvim works.

## Installing ⚡️flash.nvim

I use the [lazy.nvim](https://lazy.folke.io/) package manager to install of my Neovim plugins.

Refer to this [youtube video](https://youtu.be/6mxWayq-s9I) to learn how to setup & use lazy.nvim.

Once you have lazy.nvim installed and setup, you can add [⚡️flash.nvim](https://github.com/folke/flash.nvim) to your plugins.

To do this, add a `flash.lua` file under your `plugins` directory.

Add the following code to this file:

```lua
return {
  "folke/flash.nvim",
  event = "VeryLazy",
  ---@type Flash.Config
  opts = {},
  -- stylua: ignore
  keys = {
    { "s", mode = { "n", "x", "o" }, function() require("flash").jump() end, desc = "Flash" },
    { "S", mode = { "n", "x", "o" }, function() require("flash").treesitter() end, desc = "Flash Treesitter" },
    { "r", mode = "o", function() require("flash").remote() end, desc = "Remote Flash" },
    { "R", mode = { "o", "x" }, function() require("flash").treesitter_search() end, desc = "Treesitter Search" },
    { "<c-s>", mode = { "c" }, function() require("flash").toggle() end, desc = "Toggle Flash Search" },
  },
}
```

You should check if you have any conflicting keymaps and modify them accordingly. To check your
already defined keymaps, try running `:Telescope keymaps` or `:map`.

## Enabling Flash For Search

You can add the following to have flash enabled by default when executing a search with `/` or `?`.

```lua{6-10}
return {
  "folke/flash.nvim",
  event = "VeryLazy",
  ---@type Flash.Config
  opts = {
    modes = {
      search = {
        enabled = true,
      },
    },
  },
  -- stylua: ignore
  keys = {
    { "s", mode = { "n", "x", "o" }, function() require("flash").jump() end, desc = "Flash" },
    { "S", mode = { "n", "x", "o" }, function() require("flash").treesitter() end, desc = "Flash Treesitter" },
    { "r", mode = "o", function() require("flash").remote() end, desc = "Remote Flash" },
    { "R", mode = { "o", "x" }, function() require("flash").treesitter_search() end, desc = "Treesitter Search" },
    { "<c-s>", mode = { "c" }, function() require("flash").toggle() end, desc = "Toggle Flash Search" },
  },
}
```

## Enabling Jump Labels for f,F,t,T

You can also add the following to have jump labels available when moving with `f`, `F`, `t` or `T`.

```lua{10-12}
return {
  "folke/flash.nvim",
  event = "VeryLazy",
  ---@type Flash.Config
  opts = {
    modes = {
      search = {
        enabled = true,
      },
      char = {
        jump_labels = true,
      },
    },
  },
  -- stylua: ignore
  keys = {
    { "s", mode = { "n", "x", "o" }, function() require("flash").jump() end, desc = "Flash" },
    { "S", mode = { "n", "x", "o" }, function() require("flash").treesitter() end, desc = "Flash Treesitter" },
    { "r", mode = "o", function() require("flash").remote() end, desc = "Remote Flash" },
    { "R", mode = { "o", "x" }, function() require("flash").treesitter_search() end, desc = "Treesitter Search" },
    { "<c-s>", mode = { "c" }, function() require("flash").toggle() end, desc = "Toggle Flash Search" },
  },
}
```
