<script>
  import jsonData from "./lib/data.json";
  import brutForce from "./lib/brutForce";

  let length = "3.2";
  let minDiam = 14;
  let maxDiam = 24;
  let kubage;
  let isMainView = true;
  let isFormValid = false;
  let result;
  let sticksCount = 0;

  let set = [];
  let diam = [];

  let buttonName = "Расчитать";

  function calculate(length, minDiam, maxDiam) {
    let diametrs = Object.keys(jsonData[length]);

    for (const d of diametrs) {
      const diameterValue = parseFloat(d.replace(",", "."));

      if (
        !isNaN(diameterValue) &&
        diameterValue >= minDiam &&
        diameterValue <= maxDiam
      ) {
        diam.push(diameterValue);
        set.push(jsonData[length][diameterValue]);
      }
    }

    result = brutForce(set, kubage, diam);

    result[0].forEach((value) => {
      sticksCount += value[1];
    });
  }

  function checkFormValidity() {
    isFormValid = !!length && !!minDiam && !!maxDiam && !!kubage;
  }

  function handleSubmit() {
    if (isFormValid && isMainView) {
      isMainView = false;
      buttonName = "Новый расчет";
      calculate(length, minDiam, maxDiam);
    } else {
      isMainView = true;
      isFormValid = false;
      kubage = undefined;
      buttonName = "Расчитать";
      set = [];
      diam = [];
      sticksCount = 0;
    }
  }
</script>

<main class="container">
  {#if isMainView}
    <label for="length">Длинна</label>
    <select id="length" bind:value={length} required>
      {#each Object.keys(jsonData) as length}
        <option>{length}</option>
      {/each}
    </select>

    <label for="minDiam">Диаметры</label>
    <div class="grid">
      <input
        type="number"
        id="minDiam"
        bind:value={minDiam}
        placeholder="От..."
        min="6"
        max="120"
        step="2"
        on:input={checkFormValidity}
      />
      <input
        type="number"
        id="maxDiam"
        bind:value={maxDiam}
        placeholder="До..."
        min="6"
        max="120"
        step="2"
        on:input={checkFormValidity}
      />
    </div>

    <label for="kubage">Кубатура</label>
    <input
      type="number"
      id="kubage"
      bind:value={kubage}
      placeholder="Введите кубатуру..."
      required
      on:input={checkFormValidity}
    />
  {:else}
    <table role="grid">
      <thead>
        <tr>
          <th>Диаметр</th>
          <th>Количество</th>
          <th>Кубатура</th>
        </tr>
      </thead>
      <tbody>
        {#each result[0] as value}
          <tr>
            <td>{value[0]}</td>
            <td>{value[1]}</td>
            <td>{value[2].toFixed(3)}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td>Итого:</td>
          <td>
            {sticksCount}
          </td>
          <td>{result[1]}</td>
        </tr>
      </tfoot>
    </table>
  {/if}

  <button on:click={handleSubmit} disabled={!isFormValid}>{buttonName}</button>
</main>

<style>
  .grid {
    grid-template-columns: 1fr 1fr;
  }

  th,
  td {
    border: 1px solid #ddd; /* Границы для всех ячеек (можете настроить цвет по своему вкусу) */
    padding: 8px; /* Внутренний отступ в ячейках */
    text-align: center; /* Выравнивание по центру */
  }

  :root:not([data-theme="dark"]) {
    --background-color: var(--tg-theme-bg-color);
    --color: var(--tg-theme-text-color);
    --primary: var(--tg-theme-button-color);
    --primary-hover: var(--tg-theme-button-text-color);
    --primary-focus: var(--tg-theme-hint-color);
    --primary-inverse: var(--tg-theme-button-text-color);
  }
</style>
