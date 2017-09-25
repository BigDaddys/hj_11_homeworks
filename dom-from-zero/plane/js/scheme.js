'use strict'

function init() {
  const selectId = document.getElementById('acSelect'); // Выбор id самолёта
  const btnSeatMap = document.getElementById('btnSeatMap'); // Кнопка отображения схемы
  const btnSetFull = document.getElementById('btnSetFull'); // Кнопка обозначения всех мест в самолете занятыми
  const btnSetEmpty = document.getElementById('btnSetEmpty'); // Кнопка обозначения всех мест в самолете свободными
  const seatMapTitle = document.getElementById('seatMapTitle'); // Информация о выбранном самолете и количестве пассажиров
  const seatMapDiv = document.getElementById('seatMapDiv'); // Схема мест в самолете
  const totalPax = document.getElementById('totalPax'); // Общее количество занятых мест
  const totalAdult = document.getElementById('totalAdult'); // Общее количество мест с полной стоимостью
  const totalHalf = document.getElementById('totalHalf'); // Общее количество детских мест
}

document.addEventListener('DOMContentLoaded', init);