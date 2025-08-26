---
title: "How To Use OpenCode AI"
imgUrl: "/post-images/how-to-use-opencode-ai/thumbnail.jpg"
youtubeId: "9FW43mb1vTM"
publishedAt: "2025-08-26"
summary: "Use this guide along with my youtube video to learn how to use OpenCode AI with Neovim & Tmux for a supercharged workflow!"
---

📋Official Docs: [opencode](https://opencode.ai/docs/)

💻Opencode Repo: [opencode github repo](https://github.com/sst/opencode)

## Installation

The easiest way to install opencode is through the install script.

```bash
curl -fsSL https://opencode.ai/install | bash
```

You can also install it with the following:

Using Node.js

```bash
npm install -g opencode-ai
```

Using Homebrew on macOS and Linux

```bash
brew install sst/tap/opencode
```

Using Paru on Arch Linux

```bash
paru -S opencode-bin
```

## Setup

You can use whichever AI Model you prefer.

It's recommended to sign up for Claude Pro or Claude Max for the most cost effective way of using
OpenCode.

To get started run:

```bash
opencode auth login
```

Then follow the steps for the chosen provider you'd like to use.

For details on different providers [click here](https://opencode.ai/docs/providers/#directory).

## Initial Setup

Now that you've configured your provider, navigate to your project:

```bash
cd  path/to/your/project
```

Then run:

```bash
opencode
```

And initialize opencode for the project:

```bash
/init
```

This will create a `AGENTS.md` file in the root of your project that will help opencode understand the project structure
and coding patterns being used.

## Theme

You can change the theme used by OpenCode by running:

```bash
/themes
```

Or pressing **Ctrl+x** + **t**.

## Ask Questions & Make Changes

You can know ask any question you want about your code or ask OpenCode to make changes to it
as if it were a Junior Developer you're working with.

There are two primary agents OpenCode uses.

You have the **Plan** agent, which will not make any changes to your code.

You also have the **Build** agent, which will actually apply changes to the code.

To switch between agents, press the **Tab** or **Ctrl+x** + **a**.

You should first use the **Plan** agent to evaluate changes you want to make & then use the **Build**
agent to actually apply those changes.

**You can also drag and drop images onto opencode to add further information to your query**.

To undo the last changes made from the previous prompt execute:

```bash
/undo
```

Or type **Ctrl+x** + **u**.

To redo the changes execute:

```bash
/redo
```

Or type **Ctrl+x** + **r**.

## Modifying Config

You can add a config file to modify how OpenCode works.

You can create a global config file in `~/.config/opencode/opencode.json` or
a project specific config in the project root with a `opencode.json` file.

To see all of the changes you can make to opencode, [learn more here](https://opencode.ai/docs/config/)

## Custom Commands

You can also create custom commands to easily ask OpenCode to do something you need to do often.

To create a new command, in your project root add the following directory structure: `.opencode/command`

Under the `/command` directory you can add files for different commands you want to create.

For example:

Create a new file called `.opencode/command/component.md` with the following:

```markdown
---
description: "Create a new svelte component"
---

Create a new component called $ARGUMENTS with typescript & have an empty Props interface.
```

Use `$ARGUMENTS` to be able to pass arguments to the command.

Now you can use the command in the OpenCode prompt with the name of the file & provide an argument to it:

```bash
/component NewComponent
```

You can modify the agent and model used by providing them in the frontmatter. For example:

```markdown
---
description: "Create a new svelte component"
agent: build
model: anthropic/claude-3-5-sonnet-20241022
---

Create a new component called $ARGUMENTS with typescript & have an empty Props interface.
```
