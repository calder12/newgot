<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`research/calculator.json`)
      .then(r => r.json())
      .then(researches => {
        return { researches };
      });
  }
</script>

<script>
  export let researches;
  let researchBonus = 0;
  let researchTime = 0;
  let totalReturn = '0d 0h 0m 0s'
  let totalBonusReturn = '0d 0h 0m 0s'
  let researchHelps;
  let selectedResearch;
  let displayResearches = [];
  let currentResearches = [];
  let tempResearches = [];

  const getResearches = () => {
    displayResearches = researches
      .filter(research => selectedResearch.includes(research.tree))
      .map(researches => ({
        ...researches,
        slug: makeSlug(researches),
        checked: checkChecked(researches)
      }));
  };

  const checkChecked = research => {
    return currentResearches.includes(research.id);
  };

  const makeSlug = research => {
    return (
      research.research.toLowerCase().replace(" ", "-") + "-" + research.level
    );
  };

  const addResearch = (id, checked) => {
    if (checked) {
      currentResearches = [...currentResearches, id];
    } else {
      currentResearches = currentResearches.filter(research => {
        return research !== id
      })
    }

    tempResearches = researches.filter(research =>
      currentResearches.includes(research.id)
    );
    researchTime = tempResearches.reduce((accumulator, research, index) => {
      return accumulator + parseInt(research.seconds)
    }, 0)
    calculateTotalTime(researchTime)
  };

    const calculateTime = (seconds) => {
    const numdays = Math.floor(seconds / 86400);
    const numhours = Math.floor((seconds % 86400) / 3600);
    const numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    const numseconds = ((seconds % 86400) % 3600) % 60;
    const total =
      numdays +
      "d : " +
      numhours +
      "h : " +
      numminutes +
      "m : " +
      numseconds +
      "s";
    return total;
  }

  const calculateTotalTime = (researchTime => {
    totalReturn = calculateTime(researchTime);
    totalBonusReturn = calculateTime(Math.round((researchTime * 100) / (100 + parseFloat(researchBonus))))
  })
</script>

<style>
  label {
    display: block;
  }
  .contents {
    line-height: 1.8;
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
        on:change={calculateTotalTime(researchTime)}
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
    <div class="times">
    <p>Base Time: <span>{totalReturn}</span></p>
    <p>Your Time: <span>{totalBonusReturn}</span></p>
    </div>
  </div>
  <div class="contents">
    {#each displayResearches as research, index}
      {#if (research.level - 1) % 10 === 0}
        <hr />
      {/if}
      <label for={research.slug}>
        <input
          name={research.slug}
          id={research.slug}
          type="checkbox"
          bind:checked={research.checked}
          on:change={() => addResearch(research.id, research.checked)}
          value={research.id} />
        {research.research} Level {research.level}
      </label>
    {/each}
  </div>
</div>
