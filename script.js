// width x height
// 24 x 21 & 99 mines
// 18 x 14 & 40 mines
// 10 x 8 & 10 mines

difficultyEl = document.getElementById('difficulty')
flagsCountEl = document.getElementById('flags')

function createMap() {
  rootEl = document.getElementById('root')
  mines = createMines()
  rowsLength = 10

  for (var i = 0; i < 10; i++) {
    minesInRow = []
    mines.forEach(mine => {
      if (Math.floor(mine / 10) == i) {
        minesInRow.push(mine)
      }
    })

    rootEl.appendChild(createRow(minesInRow, i))
  }

  addNumbers(mines, rowsLength)
}

function addNumbers(mines, rowsLength) {
  addNumber = (el) => {
    if (el == null) return
    if (el.classList.contains('mine')) return
    el.children[0].innerText++
  }

  mines.forEach(mine => {
    if (mine % rowsLength + 1 < rowsLength) addNumber(document.getElementById(mine + 1))
    if (mine % rowsLength - 1 >= 0) addNumber(document.getElementById(mine - 1))
    addNumber(document.getElementById(mine + 10))
    addNumber(document.getElementById(mine - 10))

    if (mine % rowsLength + 1 < rowsLength) addNumber(document.getElementById(mine + 10 + 1))
    if (mine % rowsLength - 1 >= 0) addNumber(document.getElementById(mine + 10 - 1))
    if (mine % rowsLength + 1 < rowsLength) addNumber(document.getElementById(mine - 10 + 1))
    if (mine % rowsLength - 1 >= 0) addNumber(document.getElementById(mine - 10 - 1))
  })
}

function createRow(mines, index) {
  row = document.createElement('div')
  row.classList.add('row')

  for (var i = 0; i < 10; i++) {
    cell = createCell(index * 10 + i)

    mines.forEach(mine => {
      if (mine % 10 == i) {
        cell.children[0].innerText = 'mine'
        cell.classList.add('mine')
      }
    })

    row.appendChild(cell)
  }

  return row
}

function createCell(index) {
  cell = document.createElement('div')
  cell.classList.add('cell')
  cell.id = index
  text = document.createElement('p')
  text.classList.add('hide')
  cell.appendChild(text)
  
  const rightClick = (e) => {
    e.preventDefault()
    
    if (e.target.classList.contains('flag')) {
      e.target.classList.remove('flag')
      increaseFlags()
    }
    else {
      e.target.classList.add('flag')
      decreaseFlags()
    }
  }

  const leftClick = (e) => {
    e.target.children[0].classList.remove('hide')

    e.target.removeEventListener('contextmenu', rightClick)
    e.target.addEventListener('contextmenu', e => {
      e.preventDefault()
    })

    if (e.target.children[0].innerText === '') {
      // TODO: show near cells
      show(e.target.id)
    }

    if (e.target.classList.contains('mine')) {
      gameOver()
    }

    e.target.removeEventListener('click', leftClick)
  }
  
  cell.addEventListener('contextmenu', rightClick)
  
  cell.addEventListener('click', leftClick)
  
  return cell
}

function createMines(mineCount = 10) {
  mines = []

  while (mines.length < mineCount) {
    for (var i = mines.length; i < mineCount; i++) {
      mines.push(rand(100))
    }

    mines = [...new Set(mines)]
  }

  flagsCountEl.innerText = mines.length

  return mines
}

function increaseFlags() {
  flags.innerText++
}

function decreaseFlags() {
  flags.innerText--
}

function gameOver() {
  alert('game over')
}

function rand(num) {
  return Math.floor(Math.random() * num)
}

function show(stringId) {
  console.log('works')
  const id = parseInt(stringId)
  const el = document.getElementById(id)

  if (el.children[0].classList.contains('show')) return

  el.children[0].classList.remove('hide')
  el.children[0].classList.add('show')

  if (el.children[0].innerText === '') {
    show(id + 1)
    show(id - 1)
    show(id + 10)
    show(id - 10)
    show(id + 11)
    show(id - 11)
    show(id + 9)
    show(id - 9)
  }
}

createMap()