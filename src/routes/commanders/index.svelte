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
  const filterByClass = troopClass => {
    if (troopClass === "All") {
      displayPosts = posts;
    } else {
      displayPosts = posts.filter(post => post.class == troopClass);
    }
  };
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
	.filters {
		display:flex;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		border: 1px solid #ccc;
		padding: 1rem;
	}
</style>

<svelte:head>
  <title>Commanders</title>
</svelte:head>
<h1>Commanders</h1>
<h2>Filter</h2>
<div class="filters">
  <button on:click={filterByClass.bind(null, 'All')}>Reset Filters</button>
  <button on:click={filterByClass.bind(null, 'Infantry')}>Infantry</button>
  <button on:click={filterByClass.bind(null, 'Cavalry')}>Cavalry</button>
  <button on:click={filterByClass.bind(null, 'Spearmen')}>Spearmen</button>
  <button on:click={filterByClass.bind(null, 'Bowmen')}>Bowmen</button>
</div>
<ul>
  {#each displayPosts as post}
    <li>
      <a rel="prefetch" href="commanders/{post.slug}">{post.title}</a>
    </li>
  {/each}
</ul>
