<script>
  import DarkmodeButton from "./DarkmodeButton.svelte";
  import MainMargins from "./MainMargins.svelte";
  import IconLink from "./IconLink.svelte";
  import GithubIcon from "./svg/GithubIcon.svelte";

  import Logo from "./svg/Logo.svelte";
  import YoutubeIcon from "./svg/YoutubeIcon.svelte";
</script>

<header
  class="fixed inset-x-0 top-0 z-10 border-b
    bg-white dark:border-gray-700 dark:bg-dark-blue-900"
>
  <MainMargins>
    <nav
      class="flex h-20
    items-center justify-between px-4"
    >
      <a href="/"> <Logo class="h-2: w-20" /> </a>

      <div class="flex items-center space-x-1">
        <DarkmodeButton />

        <IconLink
          href="https://www.youtube.com/@joseanmartinez/featured"
          target="_blank"
        >
          <YoutubeIcon class="h-8 w-8 fill-current" />
        </IconLink>
        <IconLink
          href="https://github.com/josean-dev"
          target="_blank"
        >
          <GithubIcon class="h-8 w-8 fill-current" />
        </IconLink>
      </div>
    </nav>
  </MainMargins>
</header>
