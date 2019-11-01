<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`commanders.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import { slide } from 'svelte/transition';

  export let posts;
  let displayPosts = posts;
  let showFilters = false
  let troopClasses = ["Infantry", "Cavalry", "Bowmen", "Spearmen"];
  let troopType = [
    "Area Attack",
    "Area Attack (Line)",
    "Attack & Defense",
    "Attack & CC",
    "Defense & Disable",
    "Defense & CC",
    "Defensive",
    "Single Target Attack",
    "Support",
    "Support & Healing"
  ];
  let acquisition = ["free", "pay"];

  const toggleFilters = () => {
    showFilters = !showFilters
  }

  const showAllClasses = () => {
    troopClasses = ["Infantry", "Cavalry", "Bowmen", "Spearmen"];
    filterCommanders();
  };

  const clearAllClasses = () => {
    troopClasses = [];
    filterCommanders();
  };
  const showAllTypes = () => {
    troopType = [
    "Area Attack",
    "Area Attack (Line)",
    "Attack & Defense",
    "Attack & CC",
    "Defense & Disable",
    "Defense & CC",
    "Defensive",
    "Single Target Attack",
    "Support",
    "Support & Healing"
    ];
    filterCommanders();
  };

  const clearAllTypes = () => {
    troopType = [];
    filterCommanders();
  };
  const showAllAcquisitions = () => {
    acquisition = ["free", "pay"];
    filterCommanders();
  };

  const clearAllAcquisitions = () => {
    acquisition = [];
    filterCommanders();
  };

  function filterCommanders() {
    displayPosts = posts.filter(post => troopClasses.includes(post.class));
    displayPosts = displayPosts.filter(post =>
      acquisition.includes(post.acquisition)
    );
    displayPosts = displayPosts.filter(post => troopType.includes(post.type));
  }
</script>

<style>
  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
    grid-gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .commanders {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 320px));
    grid-gap: 1rem;
  }
  .commander {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 1rem;
    text-align: center;
    transition: 0.3s;
  }
  .commander:hover {
    background: #ddd;
  }
  .commander-link {
    text-decoration: none;
  }
  .filter-group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
  }
  .filter-group label {
    display: block;
  }
  .button-group {
    margin-top: 1rem;
  }
  .toggle {
    cursor: pointer;
    font-size: 1rem;
    color: rgb(255,62,0);
  }
</style>

<svelte:head>
  <title>Commanders</title>
</svelte:head>

<h1>Commanders</h1>
<h2>Filters <span class="toggle" on:click={toggleFilters}>{#if showFilters}Hide{:else}Show{/if}</span></h2>
{#if showFilters}
<div class="filters" transition:slide>
  <div class="filter-group">
    <div>
      <h3>Troop Type</h3>
      <label for="infantry">
        <input
          name="infantry"
          id="infantry"
          type="checkbox"
          bind:group={troopClasses}
          on:change={filterCommanders}
          value="Infantry" />
        Infantry
      </label>
      <label for="cavalry">
        <input
          name="cavalry"
          id="cavalry"
          type="checkbox"
          bind:group={troopClasses}
          on:change={filterCommanders}
          value="Cavalry" />
        Cavalry
      </label>
      <label for="spearmen">
        <input
          name="spearmen"
          id="spearmen"
          type="checkbox"
          bind:group={troopClasses}
          on:change={filterCommanders}
          value="Spearmen" />
        Spearmen
      </label>
      <label for="bowmen">
        <input
          name="bowmen"
          id="bowmen"
          type="checkbox"
          bind:group={troopClasses}
          on:change={filterCommanders}
          value="Bowmen" />
        Bowmen
      </label>
    </div>
    <div class="button-group">
      <button on:click={showAllClasses}>Show all</button>
      <button on:click={clearAllClasses}>Clear all</button>
    </div>
  </div>
  <div class="filter-group">
    <div>
      <h3>Type</h3>
      <label for="areaattack">
        <input
          name="areaattack"
          id="areaattack"
          type="checkbox"
          bind:group={troopType}
          on:change={filterCommanders}
          value="Area Attack" />
        Area Attack
      </label>
      <label for="areaattackline">
        <input
          name="areaattackline"
          id="areaattackline"
          type="checkbox"
          bind:group={troopType}
          on:change={filterCommanders}
          value="Area Attack (Line)" />
        Area Attack (Line)
      </label>
      <label for="attackdefense">
        <input
          name="attackdefense"
          id="attackdefense"
          type="checkbox"
          bind:group={troopType}
          on:change={filterCommanders}
          value="Attack & Defense" />
        Attack &amp; Defense
      </label>
      <label for="defensedisable">
        <input
          name="defensedisable"
          id="defensedisable"
          type="checkbox"
          bind:group={troopType}
          on:change={filterCommanders}
          value="Defense & Disable" />
        Defense &amp; Disable
      </label>
      <label for="defensecc">
        <input
          name="defensecc"
          id="defensecc"
          type="checkbox"
          bind:group={troopType}
          on:change={filterCommanders}
          value="Defense & CC" />
        Defense &amp; CC
      </label>
      <label for="singletarget">
        <input
          name="singletarget"
          id="singletarget"
          type="checkbox"
          bind:group={troopType}
          on:change={filterCommanders}
          value="Single Target Attack" />
        Single Target Attack
      </label>
      <label for="support">
        <input
          name="support"
          id="support"
          type="checkbox"
          bind:group={troopType}
          on:change={filterCommanders}
          value="Support" />
        Support
      </label>
      <label for="supporthealing">
        <input
          name="supporthealing"
          id="supporthealing"
          type="checkbox"
          bind:group={troopType}
          on:change={filterCommanders}
          value="Support & Healing" />
        Support &amp; Healing
      </label>
    </div>
    <div class="button-group">
      <button on:click={showAllTypes}>Show all</button>
      <button on:click={clearAllTypes}>Clear all</button>
    </div>
  </div>
  <div class="filter-group">
    <div>
      <h3>Acquisition</h3>
      <label for="free">
        <input
          name="free"
          id="free"
          type="checkbox"
          bind:group={acquisition}
          on:change={filterCommanders}
          value="free" />
        Free to Play
      </label>
      <label for="pay">
        <input
          name="pay"
          id="pay"
          type="checkbox"
          bind:group={acquisition}
          on:change={filterCommanders}
          value="pay" />
        Pay to Win
      </label>
    </div>
    <div class="button-group">
      <button on:click={showAllAcquisitions}>Show all</button>
      <button on:click={clearAllAcquisitions}>Clear all</button>
    </div>
  </div>
</div>
{/if}
<div class="commanders">
  {#each displayPosts as post}
    <a rel="prefetch" href="commanders/{post.slug}" class="commander-link">
      <div class="commander">
        <h3>{post.title}</h3>
      </div>
    </a>
  {/each}
</div>
