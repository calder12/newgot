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
  export let posts;
  let displayPosts = posts;
  let troopClasses = [
    "Infantry",
    "Cavalry",
    "Bowmen",
    "Spearmen"
  ];
  let acquisition = ["free", "pay"]

  function filterCommanders() {
    displayPosts = posts.filter(post => troopClasses.includes(post.class))
    displayPosts = displayPosts.filter(post => acquisition.includes(post.acquisition))
  }
</script>

<style>
  .filters {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1.5rem;
  }

  .commanders {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
  }
</style>

<svelte:head>
  <title>Commanders</title>
</svelte:head>

<h1>Commanders</h1>
<h2>Filters</h2>
<div class="filters">
  <div class="filter-group">
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
  <div class="filter-group">
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
</div>
<div class="commanders">
  {#each displayPosts as post}
    <a rel="prefetch" href="commanders/{post.slug}" class="commander-link">
      <div class="commander">
        <h3>{post.title}</h3>
      </div>
    </a>
  {/each}
</div>
