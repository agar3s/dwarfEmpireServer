(function () {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  const millionUnits = [
    '',
    'million',
    'billion',
    'trillion',
    'quatrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
    'decillion'
  ]

  function parseGold (gold) {
    let value = gold
    let million = 0
    if (value > 1000000) {
      value /= 1000000
      million += 1
      while (value/1000 > 1) {
        value /= 1000
        million += 1
      }
    }
    return {
      value: formatter.format(value),
      units: millionUnits[million]
    }
  }

  const localStorageKey = 'dwarfEmpire'
  if (localStorage.getItem(localStorageKey)) {
    const storedData = JSON.parse(localStorage.getItem(localStorageKey))
    console.log(storedData)
    document.querySelector(`[data-id="${storedData.id}"]`).className = 'row me'
  }
  document.querySelectorAll(`[data-money]`).forEach(function(ele) {
    const value = parseInt(ele.getAttribute('data-money'))
    const parsed = parseGold(value)
    ele.innerHTML = `${parsed.value} ${parsed.units}`
  })
})();