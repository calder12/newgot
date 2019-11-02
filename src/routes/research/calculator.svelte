<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`research.json`)
      .then(r => r.json())
      .then(researches => {
        return { researches };
      });
  }
</script>

<script>
  export let researches;
  let researchBonus;
  let researchHelps;
  let selectedResearch;
  let displayResearches = [];
  let currentResearches = [];
  let researchTime;

  const getResearches = () => {
    displayResearches = researches
      .filter(research => selectedResearch.includes(research.tree))
      .map(researches => ({ ...researches, slug: makeSlug(researches) }));
  };

  const makeSlug = research => {
    return (
      research.research.toLowerCase().replace(" ", "-") + "-" + research.level
    );
  };

  const addResearch = () => {
    const tempResearches = researches.filter(research =>
      currentResearches.includes(research.id)
    );
  };
</script>

<style>
  label {
    display: block;
  }
</style>

<div class="container">
  <h1>Research Calculator</h1>
  <div class="controls">
    <div class="form-group">
      <label for="research-bonus">Research Bonus</label>
      <input
        type="number"
        bind:value={researchBonus}
        placeholder="Enter research bonus"
        id="research-bonus" />
    </div>
    <div class="form-group">
      <label for="research-helps">Helps</label>
      <input
        type="number"
        bind:value={researchHelps}
        placeholder="Enter number of helps"
        id="research-helps" />
    </div>
    <div class="form-group">
      <select id="tree" bind:value={selectedResearch} on:change={getResearches}>
        <option>Select Research Tree</option>
        <option value="Production">Production</option>
        <option value="City Defense">City Defense</option>
        <option value="Military">Military</option>
        <option value="Expedition & Pacification">
          Expedition & Pacification
        </option>
        <option value="Advanced Defense">Advanced Defense</option>
        <option value="Advanced Military">Advanced Military</option>
        <option value="Formations">Formations</option>
        <option value="Commandership">Commandership</option>
      </select>
    </div>
  </div>
  <div class="contents">
    {#each displayResearches as research}
      <label for={research.slug}>
        <input
          name={research.slug}
          id={research.slug}
          type="checkbox"
          bind:group={currentResearches}
          on:change={addResearch}
          value={research.id} />
        {research.research} Level {research.level}
      </label>
    {/each}
  </div>
</div>
